import { useMemo, useState, KeyboardEvent } from "react";
import { generateMaze } from "./utils";
import { Grid } from "./types";
import "./styles/App.css";
import Maze from "./components/Maze";
import Controls from "./components/Controls";

const App = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mazeSize, setMazeSize] = useState<number>(10);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const maze: Grid = useMemo(
    () => generateMaze(mazeSize, mazeSize),
    [mazeSize]
  );

  const handleMove = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isPlaying) return;

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
    <div>
      <h1 className="title">Maze</h1>
      <div className="container" onKeyDown={handleMove} tabIndex={-1}>
        <div className="maze-container">
          <Maze maze={maze} playerPos={playerPos} />
        </div>
        <div className="controls-container">
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default App;
