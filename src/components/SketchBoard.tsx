import React, { useMemo, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632

const boardMaxDimension = 632; // in pixels

const SketchBoard = () => {
  const [dimension, setDimension] = useState(32);
  const [erase, setErase] = useState(0);
  const [bgColor, setBgColor] = useState("#ffffff");

  const boardRows: Array<JSX.Element> = useMemo(() => {
    const newBoardRows: Array<JSX.Element> = [];
    for (let i = 0; i < dimension; i++) {
      newBoardRows.push(
        <SketchRow
          key={uniqid()}
          rowNum={dimension}
          rowDimension={dimension}
          bgColor={bgColor}
        />
      );
    }

    return newBoardRows;
    // changing erase will trigger reconstruction of the board
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimension, erase]);

  const handleDimensionChange = (num: number): void => {
    setDimension(num);
  };

  const eraseBoard = () => {
    setErase(erase === 0 ? 1 : 0);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(event.currentTarget.value);
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
        <button onClick={eraseBoard}>Erase</button>
      </div>

      <div className="board">{boardRows}</div>
    </main>
  );
};

type SketchBoxProps = {
  size: number; //dimensions of board square (size*size)
  bgColor: string;
};

const SketchBox = ({ size, bgColor }: SketchBoxProps) => {
  const boxSize = { width: `${size}px`, height: `${size}px` };
  console.log(bgColor);

  const handleColorChange = (event: React.MouseEvent<HTMLDivElement>) => {
    // if left mouse btn is clicked
    if (event.buttons === 1) {
      console.log(bgColor);
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
  bgColor: string;
};

const SketchRow = ({ rowNum, rowDimension, bgColor }: SketchRowProps) => {
  const rowBoxes: Array<JSX.Element> = [];

  for (let i = 0; i < rowNum; i++) {
    rowBoxes.push(
      <SketchBox
        key={uniqid()}
        size={boardMaxDimension / rowDimension}
        bgColor={bgColor}
      />
    );
  }

  return <div className="sketchRow">{rowBoxes}</div>;
};

export default SketchBoard;
