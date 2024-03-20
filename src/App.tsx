import { useMemo, useState, KeyboardEvent, useEffect } from "react";
import { generateMaze } from "./utils";
import { Grid } from "./types";
import "./styles/App.css";
import Maze from "./components/Maze";
import Controls from "./components/Controls";
import Button from "./components/Button";
import Complexity from "./components/Complexity";
import Confetti from "./components/Confetti";
import ColorPicker from "./components/ColorPicker";

import { Status } from "./types";

const App = () => {
  const [status, setStatus] = useState<Status>("playing");
  const [gameId, setGameId] = useState<number>(0);
  const [mazeSize, setMazeSize] = useState<number>(10);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const [playerColor, setPlayerColor] = useState<string>("#DC143C");
  const maze: Grid = useMemo(
    () => generateMaze(mazeSize, mazeSize),
    [mazeSize, gameId]
  );

  useEffect(() => {
    setPlayerPos([0, 0]);
  }, [mazeSize, gameId]);

  useEffect(() => {
    const [row, col] = playerPos;
    if (row === mazeSize - 1 && col === mazeSize - 1) {
      setStatus("won");
    }
  }, [playerPos]);

  const handleSizeChange = (value: number) => {
    setMazeSize(value);
  };

  const handleNewGame = () => {
    setStatus("playing");
    setGameId((prevId) => prevId + 1);
  };

  const handleColorChange = (color: string) => {
    if (color === "white") return;
    setPlayerColor(color);
  };

  const handleMove = (event: KeyboardEvent<HTMLDivElement>) => {
    if (status !== "playing") return;

    const [row, col] = playerPos;
    const key: string = event.key;

    if (key === "ArrowUp" && !maze[row][col].walls.top) {
      setPlayerPos([row - 1, col]);
    }
    if (key === "ArrowRight" && !maze[row][col].walls.right) {
      setPlayerPos([row, col + 1]);
    }
    if (key === "ArrowDown" && !maze[row][col].walls.bottom) {
      setPlayerPos([row + 1, col]);
    }
    if (key === "ArrowLeft" && !maze[row][col].walls.left) {
      setPlayerPos([row, col - 1]);
    }
  };

  return (
    <div className="app-container" onKeyDown={handleMove} tabIndex={-1}>
      <h1 className="title">
        Labyr<span style={{ color: playerColor }}>i</span>nthus
      </h1>

      <div className="second-row">
        <div className="second-row-inner-container">
          <Complexity
            value={mazeSize}
            onChange={handleSizeChange}
            disabled={status === "won"}
            min={5}
            max={30}
          />
          <div className="new-game-container">
            <Button text="New Game" onClick={handleNewGame} />
          </div>
        </div>
      </div>

      <div className="maze-container">
        <div className="left-to-maze">
          <ColorPicker
            playerColor={playerColor}
            onColorChange={handleColorChange}
          />
        </div>
        <Maze maze={maze} playerPos={playerPos} playerColor={playerColor} />
      </div>

      <div className="controls-container">
        <Controls handleMove={handleMove} />
      </div>

      {status === "won" && <Confetti />}
    </div>
  );
};

export default App;
