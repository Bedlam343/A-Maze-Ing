import { useMemo, useState, KeyboardEvent, useEffect } from "react";
import { generateMaze } from "./utils";
import { Grid } from "./types";
import "./styles/App.css";
import Maze from "./components/Maze";
import Controls from "./components/Controls";
import Button from "./components/Button";
import Complexity from "./components/Complexity";
import Confetti from "./components/Confetti";

import { Status } from "./types";

const App = () => {
  const [status, setStatus] = useState<Status>("playing");
  const [gameId, setGameId] = useState<number>(0);
  const [mazeSize, setMazeSize] = useState<number>(10);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
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
      <h1 className="title">Maze</h1>

      <div className="second-row">
        <div className="second-row-inner-container">
          <Complexity
            value={mazeSize}
            onChange={handleSizeChange}
            disabled={status === "won"}
          />
          <div className="new-game-container">
            <Button text="New Game" onClick={handleNewGame} />
          </div>
        </div>
      </div>

      <div className="maze-container">
        <Maze maze={maze} playerPos={playerPos} />
      </div>

      <div className="controls-container">
        <Controls handleMove={handleMove} />
      </div>

      {status === "won" && <Confetti />}
    </div>
  );
};

export default App;
