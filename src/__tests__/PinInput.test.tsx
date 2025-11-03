import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { PinInput, PinInputProps } from "../index";
import { TextInput } from "react-native";

describe("PinInput", () => {
  const renderPinInput = (props: Partial<PinInputProps> = {}) => {
    const defaultProps: PinInputProps = {
      pinLength: 4,
      ...props,
    };
    return render(<PinInput {...defaultProps} />);
  };

  it("renders the correct number of cells based on pinLength", () => {
    renderPinInput({ pinLength: 6 });
    const cells = screen.queryAllByTestId(/pin-cell-/);
    expect(cells.length).toBe(6);
  });

  it("displays entered digits in the cells", () => {
    renderPinInput();
    const hiddenInput = screen.getByTestId("hidden-pin-input");
    fireEvent.changeText(hiddenInput, "123");

    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("calls onPinChange with the current pin value when text changes", () => {
    const onPinChange = jest.fn();
    renderPinInput({ onPinChange });
    const hiddenInput = screen.getByTestId("hidden-pin-input");

    fireEvent.changeText(hiddenInput, "123");
    expect(onPinChange).toHaveBeenCalledWith("123");
  });

  it("calls onPinComplete when the pin reaches the specified length", () => {
    const onPinComplete = jest.fn();
    renderPinInput({ pinLength: 4, onPinComplete });
    const hiddenInput = screen.getByTestId("hidden-pin-input");

    fireEvent.changeText(hiddenInput, "123");
    expect(onPinComplete).not.toHaveBeenCalled();

    fireEvent.changeText(hiddenInput, "1234");
    expect(onPinComplete).toHaveBeenCalledWith("1234");
  });

  it("restricts input to pinLength", () => {
    const onPinChange = jest.fn();
    renderPinInput({ pinLength: 4, onPinChange });
    const hiddenInput = screen.getByTestId("hidden-pin-input");

    fireEvent.changeText(hiddenInput, "123456");
    expect(onPinChange).toHaveBeenCalledWith("1234");
  });

  it("focuses the hidden input when the cell container is pressed", () => {
    renderPinInput({ autoFocus: false });
    // const hiddenInput = screen.getByTestId("hidden-pin-input");
    // const container = screen.getByTestId("pin-input-container");

    // Figure out how to test this
  });

  it("forwards ref to the hidden TextInput", () => {
    const ref = React.createRef<TextInput>();
    render(<PinInput pinLength={4} ref={ref} />);

    expect(ref.current).toBeDefined();
    expect(typeof ref.current?.focus).toBe("function");
  });

  it("applies focused cell style to the active cell", () => {
    const focusedCellStyle = { backgroundColor: "lightblue" };
    renderPinInput({ focusedCellStyle });
    const hiddenInput = screen.getByTestId("hidden-pin-input");

    fireEvent(hiddenInput, "focus");
    const firstCell = screen.getByTestId("pin-cell-0");
    expect(firstCell).toHaveStyle(focusedCellStyle);

    fireEvent.changeText(hiddenInput, "1");
    const secondCell = screen.getByTestId("pin-cell-1");
    expect(secondCell).toHaveStyle(focusedCellStyle);
  });

  it("applies custom styles to container, cells, and text", () => {
    const containerStyle = { margin: 20 };
    const cellStyle = { borderWidth: 5 };
    const cellTextStyle = { color: "red" };

    renderPinInput({ containerStyle, cellStyle, cellTextStyle });

    const container = screen.getByTestId("pin-input-container");
    expect(container).toHaveStyle(containerStyle);

    const firstCell = screen.getByTestId("pin-cell-0");
    expect(firstCell).toHaveStyle(cellStyle);

    fireEvent.changeText(screen.getByTestId("hidden-pin-input"), "1");
    const firstCellText = screen.getByText("1");
    expect(firstCellText).toHaveStyle(cellTextStyle);
  });

  it("passes extra props to the hidden TextInput", () => {
    renderPinInput({ keyboardType: "default", returnKeyType: "done" });
    const hiddenInput = screen.getByTestId("hidden-pin-input");

    expect(hiddenInput.props.keyboardType).toBe("default");
    expect(hiddenInput.props.returnKeyType).toBe("done");
  });
});
