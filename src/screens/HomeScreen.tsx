import { useMemo, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { getArtworkDetails, getHomeArtwork } from "../api/chicagoArtAPI";
import { DEFAULT_PAGE } from "../constants";
import Artwork from "../components/cards/Artwork";
import { useAppDispatch } from "../hooks/hooks";
import { setArtwork } from "../features/artworkSlice";
import { getImageEndpoint } from "../utils/getImageEndpoint";
import { RootStackParamList } from "../types/types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [artworks, setArtworks] = useState([]);
  const [iiifUrl, setIIIFUrl] = useState("");
  const [maxPage, setMaxPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const dispatch = useAppDispatch();

  const getArtworks = async (page: number) => {
    try {
      setLoading(true);
      const result = await getHomeArtwork(page);

      if (result) {
        setArtworks(result.data);
        setIIIFUrl(result.config.iiif_url);
        setMaxPage(result.pagination.total_pages);

        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error retrieving artwork:", err);
      Alert.alert("Oh no!", "Something happened. Please try again.");
    }
  };

  const getArtwork = async (id: string, imageId: string) => {
    try {
      const details = await getArtworkDetails(id);
      if (details) {
        // Store info into store
        dispatch(
          setArtwork({
            ...details.data,
          })
        );
      }
    } catch (err) {
      console.error("Error retrieving artwork details:", err);
      Alert.alert("Oh no!", "Something happened. Please try again.");
    }
  };

  useMemo(() => {
    getArtworks(page);
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#a1a1a5",
          marginRight: "10%",
        }}
      >
        <Text style={styles.companyTitle}>Art Institute of Chicago</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={artworks}
            renderItem={({ item }: { item: any }) => {
              // Get image endpoint
              const imageEndpoint = getImageEndpoint(iiifUrl, item.image_id);

              return (
                <Artwork
                  artwork={item}
                  imageEndpoint={imageEndpoint}
                  onPress={async () => {
                    await getArtwork(item.id, item.image_id);

                    navigation.navigate("Details", {
                      artworkName: item.title,
                      imageEndpoint: imageEndpoint,
                    });
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.buttonContainer}>
            <Button
              disabled={page === DEFAULT_PAGE}
              title="Previous"
              onPress={prevPage}
            />
            <Button
              disabled={page === maxPage}
              title="Next"
              onPress={nextPage}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 8,
  },
  companyTitle: {
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
