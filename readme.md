# React Native PIN Input

A fully accessible and customizable PIN/OTP input component for React Native.

Built with a single hidden `TextInput` for a native-like experience, including keyboard management, copy-paste, and OTP autofill, without the complexity.

## Features

- ✅ **Drop-in Replacement**: Extends `TextInputProps` so you can use it just like a native `TextInput`.
- ♿️ **Fully Accessible**: Works seamlessly with password managers and screen readers.
- 📋 **Copy & Paste**: Full copy-paste support, including OTP suggestions from messages (`textContentType="oneTimeCode"`).
- 🎨 **Customizable**: Style all elements of the component using standard `StyleSheet` props.

## Installation

```bash
npm install react-native-pin-input
# or
yarn add react-native-pin-input
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { PinInput } from "react-native-pin-input";

const MyScreen = () => {
  const [pin, setPin] = useState("");

  return (
    <PinInput
      pinLength={6}
      onPinChange={setPin}
      onPinComplete={(completePin) => {
        console.log("PIN entry complete:", completePin);
      }}
      autoFocus
    />
  );
};
```

## Props

Since this component extends `TextInputProps`, you can pass any standard `TextInput` prop. Here are the component-specific props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pinLength` | `number` | **Required** | The number of digits in the PIN. |
| `onPinChange` | `(pin: string) => void` | `undefined` | Callback that fires when the PIN value changes. |
| `onPinComplete` | `(pin: string) => void` | `undefined` | Callback that fires when all digits are filled. |
| `containerStyle` | `ViewStyle` | `undefined` | Style for the container view holding the cells. |
| `cellStyle` | `ViewStyle` | `undefined` | Style for an individual digit cell. |
| `focusedCellStyle` | `ViewStyle` | `undefined` | Style for the currently focused digit cell. |
| `cellTextStyle` | `TextStyle` | `undefined` | Style for the text inside a digit cell. |

## Roadmap & Future Features

Here is the planned rollout for new features to make this package a more robust solution.

### Phase 1: Enhanced Styling & Security

- **Custom Error Styling**: Add props to style the input cells when they are in an error state.
- **Secure Text Entry**: Introduce a `secureTextEntry` prop to mask digits for password or OTP entry, with customizable placeholder characters.

### Phase 2: Rich User Feedback & Interaction

- **Shake Animation on Error**: Provide intuitive visual feedback by adding a shake animation when an incorrect PIN is entered.
- **Cursor/Caret Animation**: Implement an optional blinking cursor in the active cell to improve usability.

### Phase 3: Advanced Customization & API

- **Fully Custom Cell Rendering**: Allow developers to render completely custom components for each input cell via a `renderCell` prop.
- **Generalized Animations API**: Expose an API to allow developers to define their own animations for different states like `onFocus`, `onBlur`, and `onError`.

## License

MIT
