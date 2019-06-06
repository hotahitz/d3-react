import React, { Component } from "react";
import "./App.css";
import data from "./data";

import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  drawBars = (p, c, m) => {
    this.setState({
      p: p,
      c: c,
      m: m
    });
  };

  render() {
    return (
      <div className="App">
        <LineGraph
          data={data}
          width={600}
          height={400}
          drawBars={this.drawBars}
        />
        <br />
        {this.state.p && this.state.c && this.state.m ? (
          <div>
            P topics :
            <BarGraph data={this.state.p} id="i1" />
            <br />
            C topics :
            <BarGraph data={this.state.c} id="i2" />
            <br />
            M topics :
            <BarGraph data={this.state.m} id="i3" />
            <br />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
