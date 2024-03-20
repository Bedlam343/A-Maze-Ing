import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number;
  height: number;
};

const getWindowDimensions = (): WindowDimensions => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getWindowDimensions()]);

  return dimensions;
};

export default useWindowDimensions;
