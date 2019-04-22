//var data = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var data = [
  {
    date: 1,
    value: 80
  },
  {
    date: 2,
    value: 100
  },
  {
    date: 3,
    value: 56
  },
  {
    date: 4,
    value: 120
  },
  {
    date: 5,
    value: 180
  },
  {
    date: 6,
    value: 30
  },
  {
    date: 7,
    value: 40
  },
  {
    date: 8,
    value: 80
  },
  {
    date: 9,
    value: 60
  }
];

document.addEventListener("DOMContentLoaded", function(event) {
  drawChart(data);
});

function drawChart(data) {
  var svgWidth = 600,
    svgHeight = 400;
  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().rangeRound([0, width]);

  var y = d3.scaleLinear().rangeRound([height, 0]);

  var line = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.value);
    });
  x.domain(
    d3.extent(data, function(d) {
      return d.date;
    })
  );
  y.domain(
    d3.extent(data, function(d) {
      return d.value;
    })
  );

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

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
    .attr("stroke", "#345")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
