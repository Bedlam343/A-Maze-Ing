import ReactConfetti from "react-confetti";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Confetti = () => {
  const { width, height } = useWindowDimensions();
  return <ReactConfetti initialVelocityY={10} height={height} width={width} />;
};

export default Confetti;
