import { useState } from "react";
import { Text, View } from "react-native";
import { PinInput } from "@nerdydave2017/react-native-pin-input";

export default function Index() {
  const [pin, setPin] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 50, fontSize: 30, fontWeight: "bold" }}>
        React Native PIN Input
      </Text>
      <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: "regular" }}>
        Enter your PIN
      </Text>
      <PinInput
        pinLength={6}
        onPinChange={setPin}
        onPinComplete={(completePin) => {
          console.log("PIN entry complete:", completePin);
        }}
        cellStyle={{
          width: 60,
          height: 60,
        }}
        focusedCellStyle={{
          borderColor: "green",
          borderWidth: 2,
        }}
        autoFocus
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          fontWeight: "light",
          color: "gray",
        }}
      >
        PIN: {pin}
      </Text>
    </View>
  );
}
