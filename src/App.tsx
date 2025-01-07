import "./App.css";
import SketchFooter from "./components/Footer";
import SketchHeader from "./components/Header";
import SketchBoard from "./components/SketchBoard";

function App() {
  return (
    <div className="container">
      <SketchHeader />
      <SketchBoard />
      <SketchFooter />
    </div>
  );
}

export default App;
