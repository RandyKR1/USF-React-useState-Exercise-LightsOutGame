import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";



function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({length: nrows}).map( //outer array
        row => Array.from({length: ncols}).map( //inner array
            cell => Math.random() < chanceLightStartsOn //cells
        )
    );
  }

  function hasWon() {
    //checking that every cell in every row is unlit (!cell).
    return board.every(row => row.every(cell => !cell) )
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row])
      
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board: rows of Cell components

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }





  
  return (
    <table className="Board">
    <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
