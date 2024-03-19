import { KeyboardEvent, MouseEvent } from "react";
import "../styles/Controls.css";

type PropsType = {
  handleMove: (event: KeyboardEvent<HTMLDivElement>) => void;
};

const Controls = ({ handleMove }: PropsType) => {
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.id);
    handleMove({
      key: event.currentTarget.id,
    } as KeyboardEvent<HTMLDivElement>);
  };

  return (
    <div className="control-arrows">
      <div id="ArrowUp" onMouseDown={handleMouseDown} className="key">
        <p>UP</p>
      </div>

      <div className="bottom-row">
        <div id="ArrowLeft" onMouseDown={handleMouseDown} className="key">
          <p>LEFT</p>
        </div>
        <div id="ArrowDown" onMouseDown={handleMouseDown} className="key">
          <p>DOWN</p>
        </div>
        <div id="ArrowRight" onMouseDown={handleMouseDown} className="key">
          <p>RIGHT</p>
        </div>
      </div>
    </div>
  );
};

export default Controls;
