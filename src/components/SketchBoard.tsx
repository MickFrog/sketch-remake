import { useMemo, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632

const boardMaxDimension = 632; // in pixels

const SketchBoard = () => {
  const [dimension, setDimension] = useState(boardMaxDimension / 32);

  const boardRows: Array<JSX.Element> = useMemo(() => {
    const newBoardRows: Array<JSX.Element> = [];
    for (let i = 0; i < 32; i++) {
      newBoardRows.push(<SketchRow key={uniqid()} rowNum={32} />);
    }

    return newBoardRows;
  }, [dimension]);

  return (
    <main className="boardContainer">
      <div className="controls">
        <button>32*32</button>
        <button>64*64</button>
        <button>128*128</button>
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
};

const SketchRow = ({ rowNum }: SketchRowProps) => {
  const rowBoxes: Array<JSX.Element> = [];

  for (let i = 0; i < rowNum; i++) {
    rowBoxes.push(<SketchBox key={uniqid()} size={boardMaxDimension / 32} />);
  }

  return <div className="sketchRow">{rowBoxes}</div>;
};

export default SketchBoard;
