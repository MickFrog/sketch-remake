import React, { useMemo, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632

const boardMaxDimension = 632; // in pixels

const SketchBoard = () => {
  const [dimension, setDimension] = useState(32);
  const [erase, setErase] = useState(0);

  const constructBoard = (dimension: number) => {
    const newBoardRows: Array<JSX.Element> = [];
    for (let i = 0; i < dimension; i++) {
      newBoardRows.push(
        <SketchRow key={uniqid()} rowNum={dimension} rowDimension={dimension} />
      );
    }

    return newBoardRows;
  };

  const boardRows: Array<JSX.Element> = useMemo(() => {
    return constructBoard(dimension);

    // chnaging erase will trigger reconstruction of the board
  }, [dimension, erase]);

  const handleDimensionChange = (num: number): void => {
    setDimension(num);
  };

  const eraseBoard = () => {
    setErase(erase === 0 ? 1 : 0);
  };

  return (
    <main className="boardContainer">
      <div className="controls">
        <button onClick={() => handleDimensionChange(24)}>24*24</button>
        <button onClick={() => handleDimensionChange(32)}>32*32</button>
        <button onClick={() => handleDimensionChange(64)}>64*64</button>
        <button onClick={eraseBoard}>Erase</button>
      </div>

      <div className="board">{boardRows}</div>
    </main>
  );
};

type SketchBoxProps = {
  size: number; //dimensions of board square (size*size)
};

const SketchBox = ({ size }: SketchBoxProps) => {
  const boxSize = { width: `${size}px`, height: `${size}px` };

  const handleColorChange = (event: React.MouseEvent<HTMLDivElement>) => {
    // if left mouse btn is clicked
    if (event.buttons === 1) {
      event.currentTarget.classList.add("clickedBox");
    }
  };

  return (
    <div
      className="sketchBox"
      style={boxSize}
      onMouseEnter={handleColorChange}
    ></div>
  );
};

type SketchRowProps = {
  rowNum: number;
  rowDimension: number;
};

const SketchRow = ({ rowNum, rowDimension }: SketchRowProps) => {
  const rowBoxes: Array<JSX.Element> = [];

  for (let i = 0; i < rowNum; i++) {
    rowBoxes.push(
      <SketchBox key={uniqid()} size={boardMaxDimension / rowDimension} />
    );
  }

  return <div className="sketchRow">{rowBoxes}</div>;
};

export default SketchBoard;
