import { useLayoutEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { selectArtwork } from "../features/artworkSlice";
import { useAppSelector } from "../hooks/hooks";
import { RootStackParamList } from "../types/types";
import Pill from "../components/Pill";
import { PillColourEnum } from "../types/types";
import DetailsSection from "../components/DetailsSection";

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { artworkName, imageEndpoint } = route.params;
  const artwork = useAppSelector(selectArtwork);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: artworkName,
    });
  }, []);

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          style={styles.artworkImage}
          source={{ uri: imageEndpoint }}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <DetailsSection title="Artist">
            <Text>{artwork.artist_title}</Text>
          </DetailsSection>
          <DetailsSection title="Artwork Type">
            <Text>{artwork.artwork_type_title}</Text>
          </DetailsSection>
          <DetailsSection title="Place of origin">
            <Text> {artwork.place_of_origin}</Text>
          </DetailsSection>
          <DetailsSection title="Classification">
            {artwork.classification_titles.map((title, i) => {
              const pillColour =
                title === artwork.classification_title
                  ? PillColourEnum["PRIMARY"]
                  : PillColourEnum["SECONDARY"];

              return <Pill key={i} colour={pillColour} title={title} />;
            })}
          </DetailsSection>
          <DetailsSection title="Category">
            {artwork.category_titles.map((title, i) => {
              return (
                <Pill
                  key={i}
                  colour={PillColourEnum["TERTIARY"]}
                  title={title}
                />
              );
            })}
          </DetailsSection>
          {artwork.inscriptions && (
            <DetailsSection title="Inscriptions">
              <Text>{artwork.inscriptions}</Text>
            </DetailsSection>
          )}
          <DetailsSection title="Dimensions">
            <Text>{artwork.dimensions}</Text>
          </DetailsSection>
          <DetailsSection title="Credit">
            <Text>{artwork.credit_line}</Text>
          </DetailsSection>
        </View>
        {artwork.copyright_notice && (
          <View style={styles.copyright}>
            <Text>{artwork.copyright_notice}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 10,
  },
  artworkImage: {
    width: "100%",
    height: 300,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  copyright: {
    marginTop: 16,
    paddingHorizontal: 6,
  },
});
