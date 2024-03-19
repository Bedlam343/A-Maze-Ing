import { ChangeEvent } from "react";
import "../styles/Complexity.css";

type PropsType = {
  value: number;
  onChange: (value: number) => void;
};

const Complexity = ({ value, onChange }: PropsType) => {
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
          max="40"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Complexity;
