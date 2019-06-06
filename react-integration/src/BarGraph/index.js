import "./BarGraph.css";
import React, { Component } from "react";
import * as d3 from "d3";

class BarGraph extends Component {
  componentDidMount() {
    //const data = this.props.data;
    //console.log(data);
    let anchor = d3.select("#" + this.props.id);
    //Bind data to the bars
    let div = anchor
      .selectAll("#" + this.props.id + " div")
      .data(this.props.data);
    //Add the class bar to the divs
    div
      .enter()
      .append("div")
      .attr("class", "bar");
    //Add the pattern for the bars
    d3.select("body")
      .selectAll(".bar")
      .append("div")
      .attr("class", "pattern");
    //add the percentage to the progress bar and transition the number
    d3.select("body")
      .selectAll(".pattern")
      .append("div")
      .text(function(d) {
        return d.topic + " : " + d.value + "%";
      })
      .attr("class", "percentage")
      .transition()
      //A delay which lets every progress path to be animated shortly after the previous one
      //d represents the value from the array and i indicates its index
      .delay(function(d, i) {
        return i * 200;
      })
      .duration(1000)
      //Position the number in the middle of the progress path
      //by calculating the width in pixels and dividing it by 2
      .style("min-width", function(d, i) {
        return (d.value * 3) / 2 + "px";
      });
    //Transition the number by making use of tweens
    // .tween(".percentage", function(d) {
    //   let i = d3.interpolate(this.textContent, d),
    //     prec = (d + "").split("."),
    //     round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
    //   return function(t) {
    //     this.textContent = Math.round(i(t) * round) / round + "%";
    //   };
    // });
    //transition the width of the path
    d3.select("body")
      .selectAll(".bar")
      .transition()
      .delay(function(d, i) {
        return i * 200;
      })
      .duration(1000)
      .style("width", function(d, i) {
        return d.value * 6 + "px";
      });

    //transition between the different colors depending on the value
    d3.select("body")
      .selectAll(".pattern")
      //transition to first color
      .transition()
      .delay(function(d, i) {
        return i * 200;
      })
      .duration(250)
      .style("background-color", function(d) {
        if (d.value < 40) {
          //Red
          return "#FB7457";
        } else {
          //Orange
          return "#FBB272";
        }
      })
      //transition to second color
      .transition()
      .delay(function(d, i) {
        return i * 200 + 250;
      })
      .duration(250)
      .style("background-color", function(d) {
        if (d.value < 40) {
          //Red
          return "#FB7457";
        } else if (d.value < 60) {
          //Orange
          return "#FBB272";
        } else {
          //Yellow
          return "#FFE584";
        }
      })
      //transition to third color
      .transition()
      .delay(function(d, i) {
        return i * 200 + 500;
      })
      .duration(250)
      .style("background-color", function(d) {
        if (d.value < 40) {
          //Red
          return "#FB7457";
        } else if (d.value < 60) {
          //Orange
          return "#FBB272";
        } else if (d.value < 80) {
          //Yellow
          return "#FFE584";
        } else {
          //Light green
          return "#C9D790";
        }
      })
      //transition to fourth color
      .transition()
      .delay(function(d, i) {
        return i * 200 + 750;
      })
      .duration(250)
      .style("background-color", function(d) {
        if (d.value < 40) {
          //Red
          return "#FB7457";
        } else if (d.value < 60) {
          //Orange
          return "#FBB272";
        } else if (d.value < 80) {
          //Yellow
          return "#FFE584";
        } else if (d.value < 100) {
          //Light green
          return "#C9D790";
        } else {
          //Dark green
          return "#7AC191";
        }
      });
  }
  render() {
    if (!this.props.data) {
      return null;
    }

    return <div className="progress-bars" id={this.props.id} />;
  }
}

export default BarGraph;
