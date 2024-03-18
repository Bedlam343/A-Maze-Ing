import { Cell, Grid } from "../types";

const generateMaze = (rows: number, cols: number): Grid => {
  const totalCells = rows * cols;
  console.log("generating maze with cells ", totalCells);
  const grid: Grid = [];

  // starting grid
  for (let row = 0; row < rows; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < cols; col++) {
      const cell: Cell = {
        row,
        col,
        visited: false,
        walls: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        },
      };
      currentRow.push(cell);
    }
    grid.push(currentRow);
  }

  // start at a random cell
  let currCell: [number, number] = [
    Math.floor(Math.random() * rows),
    Math.floor(Math.random() * cols),
  ];
  const path: [number, number][] = [currCell];
  grid[currCell[0]][currCell[1]].visited = true;
  let numCellsVisited = 1;

  while (numCellsVisited < totalCells) {
    // find neighbors
    const neighbors: [number, number][] = [];
    const [row, col] = currCell;
    if (row > 0 && !grid[row - 1][col].visited) {
      neighbors.push([row - 1, col]);
    }
    if (col < cols - 1 && !grid[row][col + 1].visited) {
      neighbors.push([row, col + 1]);
    }
    if (row < rows - 1 && !grid[row + 1][col].visited) {
      neighbors.push([row + 1, col]);
    }
    if (col > 0 && !grid[row][col - 1].visited) {
      neighbors.push([row, col - 1]);
    }

    if (neighbors.length > 0) {
      // choose a random neighbor
      const nextCell: [number, number] =
        neighbors[Math.floor(Math.random() * neighbors.length)];

      // remove fall between current cell and neighbor
      if (nextCell[0] === row - 1) {
        grid[row][col].walls.top = false;
        grid[nextCell[0]][nextCell[1]].walls.bottom = false;
      } else if (nextCell[1] === col + 1) {
        grid[row][col].walls.right = false;
        grid[nextCell[0]][nextCell[1]].walls.left = false;
      } else if (nextCell[0] === row + 1) {
        grid[row][col].walls.bottom = false;
        grid[nextCell[0]][nextCell[1]].walls.top = false;
      } else if (nextCell[1] === col - 1) {
        grid[row][col].walls.left = false;
        grid[nextCell[0]][nextCell[1]].walls.right = false;
      } else {
        console.error("error removing wall between cells");
      }

      grid[nextCell[0]][nextCell[1]].visited = true;
      numCellsVisited++;
      path.push(nextCell);
      currCell = nextCell;
    } else {
      currCell = path.pop() as [number, number];
    }
  }

  return grid;
};

export default generateMaze;
