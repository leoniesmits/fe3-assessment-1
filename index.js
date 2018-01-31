// width, height and location of the svg in the screen
var svg = d3.select("svg"),
    margin = {top: 40, right: 40, bottom: 40, left: 60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([3, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// pick a color range for the scaling
var z = d3.scaleOrdinal()
    .range(["#224870", "#fab94b", "#71a4d9", "#2B9ABC"]);

// load the csv file and define the data
// start a function to determine the content of the columns
// d gives the value for each variable
// i gives the number of the variable in the array
// columns gives the length of the array
d3.csv("data.csv", function(d, i, columns) {
  // write a for loop to go through the data a number of times
  // the variable i starts at 1, adds one when columns.length is bigger
  // gives the string value back as number
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  //return the value
  return d;
}, function(error, data) {
  if (error) throw error;

  // in keys, store the column names to use as legend
  // slice the category name (onderwijssoort)
  var keys = data.columns.slice(1);

  // slice off the title and the source
  var data = data.slice(1, data.length-1);

  // this is the legend, make new array, return the name of the categories
  x0.domain(data.map(function(d) { return d.Onderwijssoort; }));
  // create the x axis, refer to the variable keys
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  // use 0 to 600000 as scaling on the y axis
  y.domain([0, 600000]); 

  //determine location of bars
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.Onderwijssoort) + ",0)"; })
    .selectAll("rect")
    // function to make a new array where you put the 
    .data(function(d) { 
      return keys.map(function(key) { 
        return {key: key, value: d[key]}; 
      }); 
    })
    // make the bars and match them to the data of x0.domain, x1.domain and y.domain
    // add the attributes x, y, width, height and fill
    // add functions to each attribute, make them return the values
    // for x and y, the values of d.key and d.value out of x1.domain and y.domain
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });

  // create the g.axis on the x axis
  // make the location of x axis match the width of the bars
  // use .call to load the dates into the bottom axis
  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  // create the g.axis on the y axis
  // call the y axis, make this count in 10 steps
  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("x", 20)
      .attr("y", 0)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Aantal studenten");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });


   
});