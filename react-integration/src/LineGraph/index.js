import "./LineGraph.css";
import React, { Component } from "react";
import * as d3 from "d3";
//import data from "./data";

class LineGraph extends Component {
  componentDidMount() {
    const data = this.props.data;
    let svgWidth = this.props.width;
    let svgHeight = this.props.height;
    //console.log(`height ${svgHeight} width ${svgWidth}`);
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleLinear().rangeRound([0, width]);

    let y = d3.scaleLinear().rangeRound([height, 0]);

    let line = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.total);
      });
    x.domain(
      d3.extent(data, function(d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.total;
      })
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "#000")
      .attr("y", 30)
      .attr("x", 250)
      .attr("text-anchor", "start")
      .text("date");

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("marks");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#214582")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    let focus = g
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus
      .append("line")
      .attr("class", "x-hover-line hover-line")
      .attr("y1", 0)
      .attr("y2", height);

    focus
      .append("line")
      .attr("class", "y-hover-line hover-line")
      .attr("x1", width)
      .attr("x2", width);

    focus.append("circle").attr("r", 7.5);

    focus
      .append("text")
      .attr("x", 15)
      .attr("dy", ".31em");

    svg
      .append("rect")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() {
        focus.style("display", null);
      })
      // .on("mouseout", function() {
      //   focus.style("display", "none");
      // })
      .on("mousemove", () => {
        // console.log("compile");
        // console.log(this.svg);
        let x0 = x.invert(d3.mouse(this.svg)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 2 >= 0 ? i - 2 : 0],
          d1 = data[i - 1],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr(
          "transform",
          "translate(" + x(d.date) + "," + y(d.total) + ")"
        );

        focus.select("text").text(function() {
          return (
            "Total:" + d.total + "\nP:" + d.p + "\nC:" + d.c + "\nM:" + d.m
          );
        });

        focus.select(".x-hover-line").attr("y2", height - y(d.total));
        focus.select(".y-hover-line").attr("x2", width + width);
      })
      .on("click", () => {
        let x0 = x.invert(d3.mouse(this.svg)[0]),
          y0 = y.invert(d3.mouse(this.svg)[1]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 2 >= 0 ? i - 2 : 0],
          d1 = data[i - 1],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0,
          xClick = x(d.date),
          yClick = y(d.total);
        // console.log(x(x0));
        // console.log(y(y0));
        // console.log(xClick);
        // console.log(yClick);

        if (
          x(x0) <= xClick + x(7.5) &&
          x(x0) >= xClick - x(7.5) &&
          (y(y0) <= yClick + y(7.5) && y(y0) >= yClick - y(7.5))
        ) {
          this.props.drawBars(d.pTopics, d.cTopics, d.mTopics);
        }
      });

    let bisectDate = d3.bisector(function(d) {
      return d.date;
    }).left;
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    return (
      <svg
        className="line-chart"
        ref={elem => {
          this.svg = elem;
        }}
      />
    );
  }
}

export default LineGraph;
