import React, { useMemo, useRef, useState } from "react";
import "./SketchBoard.css";
import uniqid from "uniqid";

// Board dimensions are 632*632
const boardMaxDimension = 632; // in pixels

type ShadingMode = -1 | 1 | 2; // 1 is shading, -1 is erasing mode

type bgColorRefType = {
  color: string;
  currentMode: ShadingMode;
};

const getRandomColor = (): string => {
  //generate hex color code
  const randColor = Math.floor(Math.random() * 16777215).toString(16); //16777215 is the max color combinations. To base 16 string as default color codes.
  return "#" + randColor;
};

const SketchBoard = () => {
  const [dimension, setDimension] = useState(32);
  const [clear, setClear] = useState(0);

  const bgColor = useRef<bgColorRefType>({ color: "#ffffff", currentMode: 1 });

  // color mode btns
  const colorModeBtn = useRef<HTMLButtonElement>(null);
  const eraseModeBtn = useRef<HTMLButtonElement>(null);
  const randomModeBtn = useRef<HTMLButtonElement>(null);

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
    bgColor.current.color = event.currentTarget.value;
  };

  const handleModeChange = (newMode: ShadingMode) => {
    bgColor.current.currentMode = newMode;

    if (colorModeBtn !== null && newMode === 1) {
      colorModeBtn.current!.style.backgroundColor = "#A63D40";
      eraseModeBtn.current!.style.backgroundColor = "#A2999E";
      randomModeBtn.current!.style.backgroundColor = "#A2999E";
    } else if (colorModeBtn !== null && newMode === -1) {
      eraseModeBtn.current!.style.backgroundColor = "#A63D40";
      colorModeBtn.current!.style.backgroundColor = "#A2999E";
      randomModeBtn.current!.style.backgroundColor = "#A2999E";
    } else {
      randomModeBtn.current!.style.backgroundColor = "#A63D40";
      colorModeBtn.current!.style.backgroundColor = "#A2999E";
      eraseModeBtn.current!.style.backgroundColor = "#A2999E";
    }
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

        <button
          ref={colorModeBtn}
          style={{ backgroundColor: "#A63D40" }}
          onClick={() => handleModeChange(1)}
        >
          Color mode
        </button>
        <button ref={randomModeBtn} onClick={() => handleModeChange(2)}>
          Random mode
        </button>
        <button ref={eraseModeBtn} onClick={() => handleModeChange(-1)}>
          Erase
        </button>
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
  bgColorRef: React.RefObject<bgColorRefType>;
};

const SketchBox = ({ size, bgColorRef }: SketchBoxProps) => {
  const changeBgColor = (event: React.MouseEvent<HTMLDivElement>) => {
    if (bgColorRef.current?.currentMode === 1) {
      event.currentTarget.style.backgroundColor = bgColorRef.current?.color;
    } else if (bgColorRef.current?.currentMode === -1) {
      event.currentTarget.style.backgroundColor = "transparent";
    } else {
      event.currentTarget.style.backgroundColor = getRandomColor();
    }
  };

  const handleColorChange = (event: React.MouseEvent<HTMLDivElement>) => {
    // if left mouse btn is clicked
    if (event.buttons === 1) {
      changeBgColor(event);
    }
  };

  return (
    <div
      className="sketchBox"
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={changeBgColor}
      onMouseEnter={handleColorChange}
    ></div>
  );
};

type SketchRowProps = {
  rowNum: number;
  rowDimension: number;
  bgColorRef: React.RefObject<bgColorRefType>;
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
