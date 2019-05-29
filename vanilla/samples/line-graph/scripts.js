//var data = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var data = [
  {
    date: 1,
    total: 80,
    p: 10,
    c: 20,
    m: 50
  },
  {
    date: 2,
    total: 100,
    p: 40,
    c: 20,
    m: 40
  },
  {
    date: 3,
    total: 56,
    p: 13,
    c: 23,
    m: 20
  },
  {
    date: 4,
    total: 120,
    p: 50,
    c: 40,
    m: 30
  },
  {
    date: 5,
    total: 180,
    p: 50,
    c: 80,
    m: 50
  },
  {
    date: 6,
    total: 30,
    p: 10,
    c: 10,
    m: 10
  },
  {
    date: 7,
    total: 40,
    p: 10,
    c: 10,
    m: 20
  },
  {
    date: 8,
    total: 80,
    p: 10,
    c: 25,
    m: 45
  },
  {
    date: 9,
    total: 60,
    p: 10,
    c: 20,
    m: 30
  }
];

console.log();

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
    .attr("stroke", "#44753f")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  var focus = g
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
    .on("mouseout", function() {
      focus.style("display", "none");
    })
    .on("mousemove", mousemove);

  var bisectDate = d3.bisector(function(d) {
    return d.date;
  }).left;

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.total) + ")");
    focus.select("text").text(function() {
      return "P:" + d.p + "\nC:" + d.c + "\nM:" + d.m;
    });
    focus.select(".x-hover-line").attr("y2", height - y(d.total));
    focus.select(".y-hover-line").attr("x2", width + width);
  }
}
