import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";

interface PinInputProps extends Omit<TextInputProps, "onChangeText"> {
  pinLength: number;
  onPinChange?: (pin: string) => void;
  onPinComplete?: (pin: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  cellStyle?: StyleProp<ViewStyle>;
  focusedCellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
}

const PinInput = forwardRef<TextInput, PinInputProps>(
  (
    {
      pinLength = 6,
      onPinChange,
      onPinComplete,
      containerStyle,
      cellStyle,
      focusedCellStyle,
      cellTextStyle,
      autoFocus = true,
      ...rest
    },
    ref
  ) => {
    const [pin, setPin] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const internalRef = useRef<TextInput>(null);

    // This allows the parent component to call focus() and blur() on our component
    useImperativeHandle(ref, () => internalRef.current as TextInput);

    const handlePress = () => {
      internalRef.current?.focus();
    };

    const handleFocus = () => {
      const newFocusedIndex =
        pin.length < pinLength ? pin.length : pinLength - 1;
      setFocusedIndex(newFocusedIndex);
    };

    const handleBlur = () => {
      setFocusedIndex(-1);
    };

    const handleChangeText = (text: string) => {
      const newPin = text.slice(0, pinLength);
      setPin(newPin);
      onPinChange?.(newPin);

      if (newPin.length === pinLength) {
        onPinComplete?.(newPin);
        // inputRef.current?.blur();
      }

      const newFocusedIndex =
        newPin.length < pinLength ? newPin.length : pinLength - 1;
      setFocusedIndex(newFocusedIndex);
    };

    return (
      <View style={styles.rootContainer}>
        <TextInput
          ref={internalRef}
          value={pin}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={pinLength}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          style={styles.hiddenInput}
          autoFocus={autoFocus}
          {...rest}
        />
        <Pressable
          onPress={handlePress}
          style={[styles.container, containerStyle]}
        >
          {Array.from({ length: pinLength }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.cell,
                cellStyle,
                focusedIndex === index &&
                  (styles.focusedCell, focusedCellStyle),
              ]}
            >
              <Text style={[styles.cellText, cellTextStyle]}>
                {pin[index] || ""}
              </Text>
            </View>
          ))}
        </Pressable>
      </View>
    );
  }
);

PinInput.displayName = "PinInput";

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: 40,
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  focusedCell: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  cellText: {
    fontSize: 18,
    color: "#000000",
  },
});

export { PinInput };
