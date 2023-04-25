import { StyleSheet, Text, View } from "react-native";
import { DetailsSectionType } from "../types/types";

const DetailsSection = ({ children, title }: DetailsSectionType) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default DetailsSection;

const styles = StyleSheet.create({
  section: {
    width: "80%",
    marginVertical: 8,
  },
  sectionTitle: {
    borderBottomWidth: 2,
    borderColor: "#c6c6c6",
    marginBottom: 6,
    paddingBottom: 4,
  },
  sectionText: {
    fontWeight: "bold",
  },
});
