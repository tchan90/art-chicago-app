import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ArtWorkCardType } from "../../types/types";

const Artwork = ({ artwork, imageEndpoint, onPress }: ArtWorkCardType) => {
  const { title, artist_title, thumbnail } = artwork;
  return (
    <View style={{ width: "100%" }}>
      <Pressable
        style={[styles.artwork_container, styles.shadow, styles.elevation]}
        onPress={onPress}
      >
        <Image
          style={styles.artworkImage}
          source={{
            uri: imageEndpoint,
          }}
          resizeMode="contain"
          alt={thumbnail.alt_text}
        />
        <View style={styles.textContainer}>
          <View style={{ borderBottomWidth: 1, borderColor: "#a1a1a5" }}>
            <Text style={styles.artTitle}>{title}</Text>
          </View>
          {artist_title && (
            <Text style={styles.artistName}>{artist_title}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default Artwork;

const styles = StyleSheet.create({
  artwork_container: {
    width: 300,
    height: 300,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ebebeb",
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  artworkImage: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    marginTop: 10,
  },
  artTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  artistName: {
    marginTop: 6,
    fontStyle: "italic",
  },
  shadow: {
    shadowColor: "#2a2a2a",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 10,
    shadowColor: "#909090",
  },
});
