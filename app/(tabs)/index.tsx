import { ThemedText } from "@/components/expo/ThemedText";
import NavigationButton from "@/components/navigationButton";
import Expedition33Preview from "@/components/previews/expedition33Preview";
import StarryLoadingPreview from "@/components/previews/StarryLoadingPreview";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <View style={styles.header}>
        <ThemedText type="titleXXL">
          AKHI
        </ThemedText>
      </View>
      <View style={styles.content}>
      <NavigationButton
          previewContent={<Expedition33Preview />}
          title="Expedition 33"
          subtitle="Pour ceux qui viendront après"
          route="/(screens)/expedition33"
          delay={100}
        />
        <NavigationButton
          previewContent={<StarryLoadingPreview />}
          title="Loading Screen"
          subtitle="Thousand Stars"
          route="/(screens)/loading"
          delay={100}
        />
        </View>
   
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    padding: 32,
   
  },
});