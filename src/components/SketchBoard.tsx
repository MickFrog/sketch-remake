import { useEffect, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632

const boardMaxDimension = 632; // in pixels

const SketchBoard = () => {
  const boardRows: Array<JSX.Element> = [];
  const [dimension, setDimension] = useState(32);

  useEffect(() => {
    for (let i = 0; i < dimension; i++) {
      boardRows.push(<SketchRow rowNum={dimension} />);
    }
  }, [boardRows, dimension]);

  return (
    <main className="boardContainer">
      <div className="controls">Controls will be here</div>

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
};

const SketchRow = ({ rowNum }: SketchRowProps) => {
  const rowBoxes: Array<JSX.Element> = [];

  for (let i = 0; i < rowNum; i++) {
    rowBoxes.push(<SketchBox key={uniqid()} size={boardMaxDimension / 32} />);
  }

  return <div className="sketchRow">{rowBoxes}</div>;
};

export default SketchBoard;
