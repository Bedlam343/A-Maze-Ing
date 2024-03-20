import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Modal from "../modal/Modal";

import "../styles/ColorPicker.css";

type PropsType = {
  playerColor: string;
  onColorChange: (color: string) => void;
};

const ColorPicker = ({ playerColor, onColorChange }: PropsType) => {
  const [color, setColor] = useState<string>(playerColor);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleColorChange = (newColor: string) => {
    console.log(newColor);
    setColor(newColor);
    onColorChange(newColor);
  };

  const togglePicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  return (
    <>
      <button onClick={togglePicker} className="color-button">
        Color
      </button>
      <Modal isOpen={displayColorPicker} onClose={togglePicker}>
        <div className="x-container">
          <div className="x" onClick={togglePicker}>
            X
          </div>
        </div>
        <div className="color-picker-container">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      </Modal>
    </>
  );
};

export default ColorPicker;
