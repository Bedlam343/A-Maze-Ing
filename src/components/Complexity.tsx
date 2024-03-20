import { ChangeEvent } from "react";
import "../styles/Complexity.css";

type PropsType = {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

const Complexity = ({ value, onChange, disabled }: PropsType) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(+event.target.value);
  };

  return (
    <div className="complexity-container">
      <p>Complexity:</p>
      <div className="slider-container">
        <input
          type="range"
          id="size"
          name="size"
          min="5"
          max="35"
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Complexity;
