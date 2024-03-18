export type Cell = {
  row: number;
  col: number;
  visited: boolean;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  highlight?: boolean;
};
