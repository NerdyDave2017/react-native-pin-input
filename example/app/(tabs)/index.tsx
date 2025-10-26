import { Image } from "expo-image";
import { Platform, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PinInput } from "react-native-pin-input";

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  return (
    <ThemedView
      style={{
        marginTop: safeArea.top,
      }}
    >
      <PinInput
        pinLength={6}
        containerStyle={{
          width: "100%",
        }}
        cellStyle={{
          width: 60,
          height: 60,
          borderRadius: 20,
        }}
        focusedCellStyle={{
          borderColor: "green",
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
