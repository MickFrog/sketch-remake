import { useMemo, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632

const boardMaxDimension = 632; // in pixels

const SketchBoard = () => {
  const [dimension, setDimension] = useState(32);

  const boardRows: Array<JSX.Element> = useMemo(() => {
    const newBoardRows: Array<JSX.Element> = [];
    for (let i = 0; i < dimension; i++) {
      newBoardRows.push(
        <SketchRow key={uniqid()} rowNum={dimension} rowDimension={dimension} />
      );
    }

    return newBoardRows;
  }, [dimension]);

  const handleDimensionChange = (num: number): void => {
    setDimension(num);
  };

  return (
    <main className="boardContainer">
      <div className="controls">
        <button onClick={() => handleDimensionChange(24)}>24*24</button>
        <button onClick={() => handleDimensionChange(32)}>32*32</button>
        <button onClick={() => handleDimensionChange(64)}>64*64</button>
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

  return <div className="sketchBox" style={boxSize}></div>;
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
