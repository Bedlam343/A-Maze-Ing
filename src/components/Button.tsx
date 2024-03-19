import "../styles/Button.css";

type PropsType = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: PropsType) => {
  return (
    <button onClick={onClick} className="new-game-button" role="button">
      {text}
    </button>
  );
};

export default Button;
