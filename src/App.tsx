import { useMemo, useState, KeyboardEvent, useEffect } from "react";
import { generateMaze } from "./utils";
import { Grid } from "./types";
import "./styles/App.css";
import Maze from "./components/Maze";
import Controls from "./components/Controls";
import Button from "./components/Button";
import Complexity from "./components/Complexity";

const App = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
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

  const handleSizeChange = (value: number) => {
    setMazeSize(value);
  };

  const handleNewGame = () => {
    setGameId((prevId) => prevId + 1);
  };

  const handleMove = (event: KeyboardEvent<HTMLDivElement>) => {
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
    <div className="app-container" onKeyDown={handleMove} tabIndex={-1}>
      <h1 className="title">Maze</h1>

      <div className="second-row">
        <div className="second-row-inner-container">
          <Complexity value={mazeSize} onChange={handleSizeChange} />
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
    </div>
  );
};

export default App;
