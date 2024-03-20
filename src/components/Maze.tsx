import { Grid } from "../types";
import "../styles/Maze.css";

type PropsType = {
  maze: Grid;
  playerPos: [number, number];
  playerColor: string;
};

const Maze = ({ maze, playerPos, playerColor }: PropsType) => {
  const makeClassName = (row: number, col: number): string => {
    const classes: string[] = ["cell"];

    // add walls
    if (maze[row][col].walls.top) {
      classes.push("topWall");
    }
    if (maze[row][col].walls.right) {
      classes.push("rightWall");
    }
    if (maze[row][col].walls.bottom) {
      classes.push("bottomWall");
    }
    if (maze[row][col].walls.left) {
      classes.push("leftWall");
    }

    // draw destination
    if (row === maze.length - 1 && col === maze[0].length - 1) {
      classes.push("destination");
    }
    // draw player
    // if (row === playerPos[0] && col === playerPos[1]) {
    //   classes.push("player");
    // }

    // win condition
    if (
      row === maze.length - 1 &&
      col === maze[0].length - 1 &&
      row === playerPos[0] &&
      col === playerPos[1]
    ) {
      classes.push("win");
    }

    return classes.join(" ");
  };

  return (
    <div
      style={{
        display: "inline-grid",
        border: "1px solid black",
        gridTemplateColumns: `repeat(${maze[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${maze.length}, 1fr)`,
        width: "500px",
        height: "500px",
      }}
    >
      {maze.map((row, rIndex) =>
        row.map((_, cIndex) => (
          <div
            key={`cell-${cIndex}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={makeClassName(rIndex, cIndex)}
          >
            {rIndex === playerPos[0] && cIndex === playerPos[1] ? (
              <div
                style={{
                  height: "65%",
                  width: "65%",
                  background: playerColor,
                  borderRadius: "50%",
                }}
              />
            ) : (
              <div />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Maze;
