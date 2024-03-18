import "../styles/Controls.css";

const Controls = () => {
  return (
    <div className="control-arrows">
      <div className="key">
        <p>UP</p>
      </div>

      <div className="bottom-row">
        <div className="key">
          <p>LEFT</p>
        </div>
        <div className="key">
          <p>DOWN</p>
        </div>
        <div className="key">
          <p>RIGHT</p>
        </div>
      </div>
    </div>
  );
};

export default Controls;
