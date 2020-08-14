function bar_data1(){
	




// set the dimensions and margins of the graph
var margin = {top: 20, right: 10, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#my_dataviz_ext").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("./data/processed/Dataset_1/dataset1_sentiments.csv", function(error, data) {
  console.log(data);
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.leg = +d.leg;
    d.con = +d.con;

  });

legit();
console.log("abc");


var Algorithms = ["Legitimate_Users" , "Content_Polluters"]

d3.select("#selectButtonExt")
      .selectAll('myOptions')
      .data(Algorithms)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })


d3.select("#selectButtonExt").on("change", function(d) {
        
        var selectedOption = d3.select(this).property("value")
        
        if (selectedOption == "Legitimate_Users")
        {   clear();
            legit();
        }

        else
        {
            clear();
            content();
        }
    })



function  clear(){

d3.select('#my_dataviz_ext').selectAll('.bar').remove();
d3.select('#my_dataviz_ext').select('.y.axis').remove();
d3.select('#my_dataviz_ext').select('.x.axis').remove();
//d3.select('#my_dataviz_ext').select('.x.label').remove();
d3.select('#my_dataviz_ext').select('.y.label').remove();

d3.select('#my_dataviz_ext').select('.title').remove();
}





function legit(){
  // Scale the range of the data in the domains

  //console.log("abc");

  x.domain(data.map(function(d) { return d.bucket; }));
  y.domain([0, d3.max(data, function(d) { return d.leg; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.bucket); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.leg); })
      .attr("height", function(d) { return height - y(d.leg); })
      .attr("fill", "steelblue");

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class" , "x axis")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
  .attr("class" , "y axis")
      .call(d3.axisLeft(y));

  svg.append("text")
            .attr('class', 'title')

        .attr("x", (width / 2 - 40))
        //.attr("y", 0 - (margin.top / 2))
        //.attr("y", (height / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        //.style("text-decoration", "underline")
        .style("font-weight", "700")
        //.style("font-family", "sans-serif")
        .style('font-family', '"Open Sans", sans-serif')
        //.text("GDP vs Life Expectancy (1952, 2007)");
        .text("Legitimate Users");


         //Add Y label
    svg.append("text")
        .attr('class', 'y label')
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', '"Open Sans", sans-serif')
        //.style("font-family", "sans-serif")
        //.style("font-family", "Lato")
        .style("font-size", "14px")
        .style("font-weight", "700")
        //.text("Life Expectancy");
        .text("Frequency");

    }



function content(){
  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.bucket; }));
  y.domain([0, d3.max(data, function(d) { return d.con; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.bucket); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.con); })
      .attr("height", function(d) { return height - y(d.con); })
      .attr("fill", "steelblue");

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class" , "x axis")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
  .attr("class" , "y axis")
      .call(d3.axisLeft(y));


      svg.append("text")
            .attr('class', 'title')

        .attr("x", (width / 2 - 40))
        //.attr("y", 0 - (margin.top / 2))
        //.attr("y", (height / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        //.style("text-decoration", "underline")
        .style("font-weight", "700")
        //.style("font-family", "sans-serif")
        .style('font-family', '"Open Sans", sans-serif')
        //.text("GDP vs Life Expectancy (1952, 2007)");
        .text("Content Polluters");




 //Add Y label
    svg.append("text")
        .attr('class', 'y label')
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left )
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', '"Open Sans", sans-serif')
        //.style("font-family", "sans-serif")
        //.style("font-family", "Lato")
        .style("font-size", "14px")
        .style("font-weight", "700")
        //.text("Life Expectancy");
        .text("Frequency");
    }










});






}