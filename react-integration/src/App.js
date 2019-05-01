import React from "react";
import "./App.css";

import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";

function App() {
  return (
    <div className="App">
      <LineGraph width={600} height={400} />
      <BarGraph />
    </div>
  );
}

export default App;
