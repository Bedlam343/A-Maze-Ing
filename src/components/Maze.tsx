import { Grid } from "../types";
import "../styles/Maze.css";

type PropsType = {
  maze: Grid;
  playerPos: [number, number];
};

const Maze = ({ maze, playerPos }: PropsType) => {
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
    if (row === playerPos[0] && col === playerPos[1]) {
      classes.push("player");
    }

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
    <table className="table" style={{ borderCollapse: "collapse" }}>
      <tbody>
        {maze.map((row, rIndex) => (
          <tr key={`row-${rIndex}`}>
            {row.map((_, cIndex) => (
              <td
                key={`cell-${cIndex}`}
                className={makeClassName(rIndex, cIndex)}
              >
                <div className="cell-inside">
                  <div className="ball" />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Maze;
