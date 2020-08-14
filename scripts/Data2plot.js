// set the dimensions and margins of the graph



function timeline_dataset2() {
var margin_TV22 = {top_TV22: 50, right_TV22: 40, bottom_TV22: 30, left_TV22: 50},
    width_TV = 900 - margin_TV22.left_TV22 - margin_TV22.right_TV22,
    height_TV = 400 - margin_TV22.top_TV22 - margin_TV22.bottom_TV22;

var tooltip22 = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("color" , "black")
          .style("border", "0px")
          .style("text-align", "center")
  
  var tooltit22 =   d3.select("body")
          .append("div")  
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("color" , "black")
          .style("width", "1px")
          .style("border-right", "10px solid black")
          .style("border-top", "10px solid transparent")  
          .style("border-bottom", "10px solid transparent")
          .style("font-size", "0")
          .style("line-height","0")



    // var BoxSpam;
    // var BoxGen;
    // var LineSpam;
    // var LineGen;
    // var minGen={};
    // var minSpam={};
    // var maxGen={};
    // var maxSpam={};
    // var medianSpam={};
    // var medianGen={};
      




      var pp22="Tweet";
      var qq22="2007"
    var tvg22 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width_TV + margin_TV22.left_TV22 + margin_TV22.right_TV22)
    .attr("height", height_TV + margin_TV22.top_TV22 + margin_TV22.bottom_TV22)
  .append("g")
    .attr("transform",
          "translate(" + margin_TV22.left_TV22 + "," + margin_TV22.top_TV22 + ")");

    tvg22.append("rect")
          .attr("x", (-50) )
        .attr("y", -45)
        .attr("height", height_TV+74)
        .attr("width", width_TV+55)
        .attr("stroke", "black")
        .style("fill", "white")
    var allGroup22 = ["2007", "2008", "2009", "2010"]

   d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup22)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })



      var allGroup22o = ["Tweet", "Retweet", "Reply"]

   d3.select("#selectoButtono")
      .selectAll('myOptions')
      .data(allGroup22o)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })

// createBoxPlot=function Boxxo(texto){
// append the svg object to the body of the page






//UserID  Year  Month Tweet
// Read the data and compute summary statistics for each specie

   // d3.csv("drive-download-20191125T202243Z-001/content_polluters_tweet_semi_final.csv", function(data) {


// texti="Total_"+texto+".csv"

 d3.csv("./data/processed/Dataset_2/Dataset2_Freq_tweets.csv", function(data) {

  // console.log(data.map(function(d) { return d.Species }))



  






  var filteredDataSpam = data.filter(function(d)
  { 
        if(d.Year=="2007" && d.Label=="Spambot" && d.Typo=="Tweet")
        {
          return d;
        }
        // return d.Year === "2009"  d.Label === "Spambot"

    })
  var filteredDataGen = data.filter(function(d)
  { 
        if(d.Year=="2007" && d.Label=="Genuine"&& d.Typo=="Tweet")
        {
          return d;
        }
        // return d.Year === "2009"  d.Label === "Spambot"

    })
  

  // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  var sumstatSpam = d3.nest() // nest function allows to group the calculation per level of a factor
    // .filter(function(d) { return g.Sepa < 400 })
    .key(function(d) { return d.Month;})
    .rollup(function(d) {
      q1 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.25)
      median = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.5)
      q3 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.75)
      interQuantileRange = q3 - q1
      // min = q1 - 1.5 * interQuantileRange
      // max = q3 + 1.5 * interQuantileRange
      min=d3.min(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      max=d3.max(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(filteredDataSpam)

    var maxx;
  var sumstatGen = d3.nest() // nest function allows to group the calculation per level of a factor
    // .filter(function(d) { return g.Sepa < 400 })
    .key(function(d) { return d.Month;})
    .rollup(function(d) {
      q1 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.25)
      median = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.5)
      q3 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.75)
      interQuantileRange = q3 - q1
      // min = q1 - 1.5 * interQuantileRange
      // max = q3 + 1.5 * interQuantileRange
      min=d3.min(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      max=d3.max(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(filteredDataGen)

  // console.log(filteredDataGen)
  // console.log(maxx)
    // console.log(sumstatGen)
  // Show the X scale
  var xx = d3.scaleBand()
    .range([ 0, width_TV ])
    .domain(["January", "February", "March","April","May","June","July","August","September","October","November","December"])
    // .domain(["1","2","3","4","5","6","7","8","9","10","11","12"])
    .paddingInner(1)
    .paddingOuter(.5)


    var x = d3.scaleBand()
    .range([ 0, width_TV ])
    // .domain(["January", "February", "March","April","May","June","July","August","September","October","November","December"])
    .domain(["1","2","3","4","5","6","7","8","9","10","11","12"])
    .paddingInner(1)
    .paddingOuter(.5)
  // var x = d3.scaleBand()
  //   .range([ 0, width ])
  //   // .domain(["January", "February", "March","April","May","June","July","August","September","October","November","December"])
  //   .domain(["1","2","3","4","5","6","7","8","9","10","11","12"])
  //   .paddingInner(1)
  //   .paddingOuter(.5)

  tvg22.append("g")
    .attr("transform", "translate(0," + height_TV + ")")
    .call(d3.axisBottom(xx))

  // Show the Y scale
  var y = d3.scaleLinear()
    .domain([0,200])
    .range([height_TV, 0])


  var l=tvg22.append("g").call(d3.axisLeft(y))
var boxWidth = 20
  

// Show the labels for the axes
 tvg22.append("text")
    .attr("class", "axisLabel")
        .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width_TV / 2.5 + 60) + " ," +
      (height_TV + 28) + ")")
    .style("text-anchor", "middle")
    .text("Months");



    tvg22.append("text")
    .attr("class", "axisLabel")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width_TV / 2.5 + 60) + " ," +
      (-30) + ")")
    .style("text-anchor", "middle")
    .text("Timeline View");




    // .attr("class", "axisLabel")




    var Y_label=tvg22.append("text")
    .attr("class", "axisLabel")
    .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -175)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Frequency of "+pp22+"s");

      //Legend

     tvg22.append("rect")
    .attr("x", (width_TV / 2.5 + 300) )
        .attr("y", -40)
        .attr("height", 40)
        .attr("width", 150)
        .attr("stroke", "black")
        .style("fill", "white")
        
      tvg22.append("rect")  
        .attr("x", (width_TV / 2.5 + 310) )
        .attr("y", -34)
        .attr("height", 10)
        .attr("width", 10)
        .attr("stroke", "black")
        .style("fill", "#69b3a2")

      tvg22.append("rect")
        .attr("x", (width_TV / 2.5 + 310) )
        .attr("y", -16)
        .attr("height", 10)
        .attr("width", 10)
        .attr("stroke", "black")
        .style("fill", "steelblue")

    tvg22.append("text")
    .attr("class", "axisLabel")
    .style("font-family","Sans-serif")
    .style("font-size","12px")
    .attr("transform",
      "translate(" + (width_TV/2.5+372)+ " ," +
      (-25) + ")")
    .style("text-anchor", "middle")
    .text("Genuine Users");


    tvg22.append("text")
      .attr("class", "axisLabel")
      .style("font-family","Sans-serif")
      .style("font-size","12px")
      .attr("transform",
        "translate(" + (width_TV/2.5+372)+ " ," +
        (-8) + ")")
      .style("text-anchor", "middle")
      .text("Spambots");

// Show the main vertical line
  LineSpam=tvg22
    .selectAll("vertLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-0})
      .attr("x2", function(d){return(x(d.key)-boxWidth/2)-0})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)






    LineGen=tvg22
    .selectAll("vertLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+20})
      .attr("x2", function(d){return(x(d.key)-boxWidth/2)+20})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)



  // rectangle for the main box
  
  BoxGen=tvg22
    .selectAll("boxesGen")
    .data(sumstatGen)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)+10})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#69b3a2")
        .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Median: "+d.value.median+" <br/> 1st Quartile: "  + d.value.q1+" <br/> 3rd Quartile: "  + d.value.q3+" <br/> Minimum: "  + d.value.min+" <br/> Maximum: "  + d.value.max)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });





    BoxSpam=tvg22
    .selectAll("boxesSpam")
    .data(sumstatSpam)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)-10})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "steelblue")
        .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Median: "+d.value.median+" <br/> 1st Quartile: "  + d.value.q1+" <br/> 3rd Quartile: "  + d.value.q3+" <br/> Minimum: "  + d.value.min+" <br/> Maximum: "  + d.value.max)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });









  // Show the median
  medianSpam=tvg22
    .selectAll("medianLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)-10 })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)


  medianGen=tvg22
    .selectAll("medianLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)+10 })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)





  minSpam=tvg22
    .selectAll("minLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)-10 })
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.min))})
      .attr("stroke", "black")
      .style("width", 80)


  minGen=tvg22
    .selectAll("minLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)+10 })
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.min))})
      .attr("stroke", "black")
      .style("width", 80)

maxSpam=tvg22
    .selectAll("maxLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)-10 })
      .attr("y1", function(d){return(y(d.value.max))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 80)


  maxGen=tvg22
    .selectAll("maxLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)+10 })
      .attr("y1", function(d){return(y(d.value.max))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 80)



////PointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPointPoint
// var jitterWidth = 50
var Genpoints=tvg22
  .selectAll("PointsGen")
  .data(filteredDataGen)
  .enter()
  .append("circle")
    .attr("cx", function(d){return(x(d.Month)-boxWidth/2)+20})
    .attr("cy", function(d){return(y(Number(d.Tweet)))})
    .attr("r", 4)
    .style("fill", "#69b3a2")
    .attr("stroke", "#69b3a2")
    .attr("opacity","0.5")

    .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Account ID: <br/>"+d.UserID+" <br/> Number of Tweets: <br/>"  + d.Tweet)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });






  var Spampoints=tvg22
  .selectAll("PointsSpam")
  .data(filteredDataSpam)
  .enter()
  .append("circle")
    .attr("cx", function(d){return(x(d.Month)-boxWidth/2)})
    .attr("cy", function(d){return(y(Number(d.Tweet)))})
    .attr("r", 4)
    .style("fill", "steelblue")
    .attr("stroke", "steelblue")
    .attr("opacity","0.5")

    .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Account ID: <br/>"+d.UserID+" <br/> Number of Tweets: <br/>"  + d.Tweet)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });

  
      function update(selectedGroup) {

      // // Create new data with the selection?
      // var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // // Give these new data to update line
      // line
      //     .datum(dataFilter)
      //     .transition()
      //     .duration(1000)
      //     .attr("d", d3.line()
      //       .x(function(d) { return x(+d.time) })
      //       .y(function(d) { return y(+d.value) })
      //     )
      //     .attr("stroke", function(d){ return myColor(selectedGroup) })
        



      var maxx=0;


        filteredDataSpam = data.filter(function(d)
        { 
        if(d.Year==selectedGroup && d.Label=="Spambot" && d.Typo==pp22)
        {
          return d;
        }
        // return d.Year === "2009"  d.Label === "Spambot"

    })
          filteredDataGen = data.filter(function(d)
  { 
        if(d.Year==selectedGroup && d.Label=="Genuine" && d.Typo==pp22)
        {
          return d;
        }
        // return d.Year === "2009"  d.Label === "Spambot"

    })

          sumstatSpam = d3.nest() // nest function allows to group the calculation per level of a factor
    // .filter(function(d) { return g.Sepa < 400 })
    .key(function(d) { return d.Month;})
    .rollup(function(d) {
      q1 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.25)
      median = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.5)
      q3 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.75)
      interQuantileRange = q3 - q1
      // min = q1 - 1.5 * interQuantileRange
      // max = q3 + 1.5 * interQuantileRange
      min=d3.min(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      max=d3.max(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      if(maxx<max)
      {
        maxx=max;
      }
      return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(filteredDataSpam)


  sumstatGen = d3.nest() // nest function allows to group the calculation per level of a factor
    // .filter(function(d) { return g.Sepa < 400 })
    .key(function(d) { return d.Month;})
    .rollup(function(d) {
      q1 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.25)
      median = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.5)
      q3 = d3.quantile(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending),.75)
      interQuantileRange = q3 - q1
      // min = q1 - 1.5 * interQuantileRange
      // max = q3 + 1.5 * interQuantileRange
      min=d3.min(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      max=d3.max(d.map(function(g) { return Number(g.Tweet);}).sort(d3.ascending))
      if(maxx<max)
      {
        maxx=max;
      }
      return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
    })
    .entries(filteredDataGen)

    // console.log(filteredDataSpam)
    console.log(maxx);

    // if(selectedGroup=="2007" &&)





    // BoxGen.remove()
    BoxSpam.remove()
    BoxGen.remove()
    LineSpam.remove()
    LineGen.remove()
    Genpoints.remove()
    Spampoints.remove()
    minGen.remove()
    minSpam.remove()
    maxGen.remove()
    maxSpam.remove()
    medianSpam.remove()
    medianGen.remove()
    Y_label.remove()
    l.remove()

    y = d3.scaleLinear()
    .domain([0,maxx+100])
    .range([height_TV, 0])
  l=tvg22.append("g").call(d3.axisLeft(y))
    var boxWidth = 20
    // svg
    // .selectAll("boxesGen")
    
    // // .enter()
    // .selectAll("rect")


    Y_label=tvg22.append("text")
    .attr("class", "axisLabel")
    .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -175)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(function(){


      if (pp22=="Reply")
        return "Frequency of Replies";
      else
        return "Frequency of "+pp22+"s";



    });

    LineSpam=tvg22
    .selectAll("vertLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-0})
      .attr("x2", function(d){return(x(d.key)-boxWidth/2)-0})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)






    LineGen=tvg22
    .selectAll("vertLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+20})
      .attr("x2", function(d){return(x(d.key)-boxWidth/2)+20})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)



    BoxGen=tvg22
    .selectAll("boxesGen")
    .data(sumstatGen)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)+10})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#69b3a2")
        .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Median: "+d.value.median+" <br/> 1st Quartile: "  + d.value.q1+" <br/> 3rd Quartile: "  + d.value.q3+" <br/> Minimum: "  + d.value.min+" <br/> Maximum: "  + d.value.max)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });





    // svg
    // .select("boxesSpam")
    
    // .selectAll("rect")
    BoxSpam=tvg22
    .selectAll("boxesSpam")
    .data(sumstatSpam)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)-10})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "steelblue")
        .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Median: "+d.value.median+" <br/> 1st Quartile: "  + d.value.q1+" <br/> 3rd Quartile: "  + d.value.q3+" <br/> Minimum: "  + d.value.min+" <br/> Maximum: "  + d.value.max)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });







// Show the median
  medianSpam=tvg22
    .selectAll("medianLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")

      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)-10 })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)


  medianGen=tvg22
    .selectAll("medianLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)+10 })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)





  minSpam=tvg22
    .selectAll("minLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)-10 })
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.min))})
      .attr("stroke", "black")
      .style("width", 80)


  minGen=tvg22
    .selectAll("minLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)+10 })
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.min))})
      .attr("stroke", "black")
      .style("width", 80)

maxSpam=tvg22
    .selectAll("maxLinesSpam")
    .data(sumstatSpam)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)-10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)-10 })
      .attr("y1", function(d){return(y(d.value.max))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 80)


  maxGen=tvg22
    .selectAll("maxLinesGen")
    .data(sumstatGen)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2)+10 })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2)+10 })
      .attr("y1", function(d){return(y(d.value.max))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 80)



      Genpoints=tvg22
  .selectAll("PointsGen")
  .data(filteredDataGen)
  .enter()
  .append("circle")
    .attr("cx", function(d){return(x(d.Month)-boxWidth/2)+20})
    .attr("cy", function(d){return(y(Number(d.Tweet)))})
    .attr("r", 4)
    .style("fill", "#69b3a2")
    .attr("stroke", "#69b3a2")
    .attr("opacity","0.5")

    .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Account ID: <br/>"+d.UserID+" <br/> Number of Tweets: <br/>"  + d.Tweet)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });






  Spampoints=tvg22
  .selectAll("PointsSpam")
  .data(filteredDataSpam)
  .enter()
  .append("circle")
    .attr("cx", function(d){return(x(d.Month)-boxWidth/2)})
    .attr("cy", function(d){return(y(Number(d.Tweet)))})
    .attr("r", 4)
    .style("fill", "steelblue")
    .attr("stroke", "steelblue")
    .attr("opacity","0.5")

    .on("mousemove", function() {
     tooltip22.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit22.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip22.style("visibility", "hidden");
     tooltit22.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip22.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip22.style("visibility", "visible")
      .html("Account ID: <br/>"+d.UserID+" <br/> Number of Tweets: <br/>"  + d.Tweet)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit22.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit22.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });






    }







  d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        qq22=selectedOption;
        // run the updateChart function with this selected option
        update(selectedOption)
    })


  d3.select("#selectoButtono").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        pp22=selectedOption;
        // run the updateChart function with this selected option
        update(qq22)
    });



})

}
// createBoxPlot("retweets");
// // d3.select("#my_dataviz").remove();
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
// console.log("poof")
// createBoxPlot("retweets");

// console.log("swag")
// createBoxPlot("retweets")
