import CircleProgressBar from "./components/CircleProgressBarBase/CircleProgressBar";
import "./App.css";
function App() {
  return (
    <div className="App">
      <CircleProgressBar
        trailStrokeColor="gray"
        strokeColor="teal"
        percentage={100}
        innerText="complete"
      />
    </div>
  );
}

export default App;
