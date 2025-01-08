import React, { useMemo, useRef, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632

const boardMaxDimension = 632; // in pixels

const SketchBoard = () => {
  const [dimension, setDimension] = useState(32);
  const [clear, setClear] = useState(0);
  const bgColor = useRef("#ffffff");

  const boardRows: Array<JSX.Element> = useMemo(() => {
    const newBoardRows: Array<JSX.Element> = [];
    for (let i = 0; i < dimension; i++) {
      newBoardRows.push(
        <SketchRow
          key={uniqid()}
          rowNum={dimension}
          rowDimension={dimension}
          bgColorRef={bgColor}
        />
      );
    }

    return newBoardRows;
    // changing clear will trigger reconstruction of the board
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimension, clear]);

  const handleDimensionChange = (num: number): void => {
    setDimension(num);
  };

  const clearBoard = () => {
    setClear(clear === 0 ? 1 : 0);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    bgColor.current = event.currentTarget.value;
  };

  return (
    <main className="boardContainer">
      <div className="controls">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="colorInput">Color:</label>
          <input
            id="colorInput"
            className="colorInput"
            onChange={handleColorChange}
            type="color"
          />
        </div>

        <button onClick={() => handleDimensionChange(24)}>24*24</button>
        <button onClick={() => handleDimensionChange(32)}>32*32</button>
        <button onClick={() => handleDimensionChange(64)}>64*64</button>
        <button onClick={clearBoard}>Clear</button>
      </div>

      <div className="board">{boardRows}</div>
    </main>
  );
};

type SketchBoxProps = {
  size: number; //dimensions of board square (size*size)
  bgColorRef: React.RefObject<string>;
};

const SketchBox = ({ size, bgColorRef }: SketchBoxProps) => {
  const handleColorChange = (event: React.MouseEvent<HTMLDivElement>) => {
    // if left mouse btn is clicked
    if (event.buttons === 1) {
      event.target.style.backgroundColor = bgColorRef.current;
    }
  };

  const handleClickColorChange = (event: React.MouseEvent<HTMLDivElement>) => {
    event.target.style.backgroundColor = bgColorRef.current;
  };

  return (
    <div
      className="sketchBox"
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={handleClickColorChange}
      onMouseEnter={handleColorChange}
    ></div>
  );
};

type SketchRowProps = {
  rowNum: number;
  rowDimension: number;
  bgColorRef: React.RefObject<string>;
};

const SketchRow = ({ rowNum, rowDimension, bgColorRef }: SketchRowProps) => {
  const rowBoxes: Array<JSX.Element> = [];

  for (let i = 0; i < rowNum; i++) {
    rowBoxes.push(
      <SketchBox
        key={uniqid()}
        size={boardMaxDimension / rowDimension}
        bgColorRef={bgColorRef}
      />
    );
  }

  return <div className="sketchRow">{rowBoxes}</div>;
};

export default SketchBoard;
