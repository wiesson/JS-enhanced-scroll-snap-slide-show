import "./App.css";

import Slider from "./Slider";

function App() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <h1 className="text-center">JS Enhanced slider</h1>
      <p className="text-center prose">
        The slide show uses CSS scroll snap and some Javascript for additional
        functionality
      </p>

      <Slider />
    </div>
  );
}

export default App;
