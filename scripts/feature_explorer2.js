// set the dimensions and margins of the graph
function invoke_feature2() {
var margin_feat2 = {top: 30, right: 30, bottom: 40, left: 80},
    width_feat2 = 560 - margin_feat2.left - margin_feat2.right,
    height_feat2 = 450 - margin_feat2.top - margin_feat2.bottom;

// append the svg object to the body of the page
var svg_feat2 = d3.select("#my_dataviz_2")
    .append("svg")
    .attr("width", width_feat2 + margin_feat2.left + margin_feat2.right)
    .attr("height", height_feat2 + margin_feat2.top + margin_feat2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin_feat2.left + "," + margin_feat2.top + ")");

var polluters_color_feat2 = "#e74a3b"; 
var legitimate_color_feat2 = "#1cc88a";
var all_color_feat2 = "#4e73df";
var features_feat2 = ["Followers", "Following", "Number of Tweets"];
d3.select("#selectButtonFeature2")
   .selectAll('myOptions')
   .data(features_feat2)
   .enter()
   .append('option')
   .text(function (d) { return d; }) // text showed in the menu
   .attr("value", function (d) { return d; })

var followers_limit_feat2 = 1000;
var y1_axis_followers_limit_feat2 = 0.0065;
var y2_axis_followers_limit_feat2 = 0.0055;

var data1_followers_feat2;


var data2_followers_feat2;

var dataAll_followers_feat2;


// ********* Followings Data *************
var followings_limit_feat2 = 1000;
var y1_axis_followings_limit_feat2 = 0.0065;
var y2_axis_followings_limit_feat2 = 0.0055;

var data1_followings_feat2;


var data2_followings_feat2;

var dataAll_followings_feat2;


// ********* Tweets Count Data *************
var tweets_limit = 1000;
var y1_axis_tweets_limit = 0.0065;
var y2_axis_tweets_limit = 0.0055;

var data1_tweets_feat2;


var data2_tweets_feat2;

var dataAll_tweets_feat2;


    // ********* Feature Selection *************



function updateFeatureView1(option) {
    var data1;
    var data2;
    var dataAll;
    var limit;
    var y1_axis_limit;
    var y2_axis_limit;
   
    svg_feat2.selectAll("line").remove();
    svg_feat2.selectAll("path").remove();
    svg_feat2.selectAll("text").remove();
    svg_feat2.selectAll("circle").remove();


    //svg_feat2.remove()
    //svg_feat2
    //.attr("width", width_feat2 + margin_feat2.left + margin_feat2.right)
    //.attr("height", height_feat2 + margin_feat2.top + margin_feat2.bottom)
    //.append("g")
    //.attr("transform",
    //    "translate(" + margin_feat2.left + "," + margin_feat2.top + ")");



    if (option == "Number of Tweets") {
    data1 = data1_tweets_feat2;
    data2 = data2_tweets_feat2;
    dataAll = dataAll_tweets_feat2;
    limit = tweets_limit_feat2;
    y1_axis_limit = y1_axis_tweets_limit_feat2;
    y2_axis_limit = y2_axis_tweets_limit_feat2;
    }

    else if (option == "Followers") {
    data1 = data1_followers_feat2;
    data2 = data2_followers_feat2;
    dataAll = dataAll_followers_feat2;
    limit = followers_limit_feat2;
    y1_axis_limit = y1_axis_followers_limit_feat2;
    y2_axis_limit = y2_axis_followers_limit_feat2;
    }

    else {
    data1 = data1_followings_feat2;
    data2 = data2_followings_feat2;
    dataAll = dataAll_followings_feat2;
    limit = followings_limit_feat2;
    y1_axis_limit = y1_axis_followings_limit_feat2;
    y2_axis_limit = y2_axis_followings_limit_feat2;
   
    }

    const asc = dataAll => dataAll.sort((a, b) => a - b);

    const sum = dataAll => dataAll.reduce((a, b) => a + b, 0);

    const mean = dataAll => sum(dataAll) / arr.length;

    // sample standard deviation
    const std = (dataAll) => {
        const mu = mean(dataAll);
        const diffArr = dataAll.map(a => (a - mu) ** 2);
        return Math.sqrt(sum(diffArr) / (dataAll.length - 1));
    };

    const quartile = (arr, q) => {
        const sorted = asc(arr);
        const pos = ((sorted.length) - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if ((sorted[base + 1] !== undefined)) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };

    var quartile1 = quartile(dataAll, 0.25)
    var quartile3 = quartile(dataAll, 0.75)
    var median = quartile(dataAll, 0.5)

    // add the x Axis
    var x = d3.scaleLinear()
        .domain([0, limit])
        .range([0, width_feat2]);
    svg_feat2.append("g")
        .attr("transform", "translate(0," + height_feat2 + ")")
        .call(d3.axisBottom(x));

    // add the first y Axis

    var y1 = d3.scaleLinear()
        .range([height_feat2/2, 0])
        .domain([0, y1_axis_limit]);
    svg_feat2.append("g")
        .attr("transform", "translate(-20,0)")
        .call(d3.axisLeft(y1).ticks(5).tickSizeOuter(0));

    // add the first y Axis
    var y2 = d3.scaleLinear()
        .range([height_feat2/2, height_feat2])
        .domain([0, y2_axis_limit]);
    svg_feat2.append("g")
        .attr("transform", "translate(-20,0)")
        .call(d3.axisLeft(y2).ticks(5).tickSizeOuter(0));

    svg_feat2.append("text")
        .attr('class', 'x label')
        .attr("transform",
            "translate(" + (width_feat2 / 2) + " ," +
            (height_feat2 + margin_feat2.top) + ")")
        .style("text-anchor", "middle")
        .style('font-family', '"Open Sans", sans-serif')
        .style("font-size", "14px")
        .style("font-weight", "100")
        //.text("GDP per Capita");
        .text("Feature (# of)");


        svg_feat2.append("text")
        .attr('class', 'y label')
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin_feat2.left)
        .attr("x", 0 - (height_feat2 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', '"Open Sans", sans-serif')
        //.style("font-family", "sans-serif")
        //.style("font-family", "Lato")
        .style("font-size", "14px")
        .style("font-weight", "100")
        //.text("Life Expectancy");
        .text("Kernel density estimator (KDE)");
    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(20), x.ticks(30))
    var density1 =  kde( data1)
    //.filter(function(d){return parseInt(d.NumberOfFollowers) < 1000} )
    ////.filter( function(d){return d.type === "variable 1"} )
    //.map(function(d){ 
    //    return parseInt(d.NumberOfFollowers);
    //}) )
    var density3 =  kde(dataAll)
    var density2 = kde(data2)
    //.filter(function(d){return parseInt(d.NumberOfFollowers) < 1000} )
    ////.filter( function(d){return d.type === "variable 2"} )
    //.map(function(d){  return parseInt(d.NumberOfFollowers); }) )



    // Plot the area
    svg_feat2.append("path")
        .attr("class", "mypath")
        .datum(density1)
        .attr("fill", "#fff")
        .attr("fill-opacity","0.0")
        .attr("opacity", "1")
        .attr("stroke", polluters_color_feat2)
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { 
                return x(d[0]);
            })
            .y(function(d) {
                return y1(d[1]);
            })
        );

    // Plot the area
    svg_feat2.append("path")
        .attr("class", "mypath")
        .datum(density2)
    //.attr("fill", "#fff")
        .attr("opacity", "1")
        .attr("fill-opacity","0.0")
        .attr("stroke", legitimate_color_feat2)
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { 
                return x(d[0]);
            })
            .y(function(d) {
                return y1(d[1]);
            })
        );
        //.on("mouseover", function(d){

        //    console.log("data all");
        //})
        //.on("mouseout", function(d){
        //    console.log("data all out");
        //});

    // Plot the area
    svg_feat2.append("path")
        .attr("class", "mypath")
        .datum(density3)
    //.attr("fill", "#fff")
        .attr("opacity", "1")
        .attr("fill-opacity","0.0")
        .attr("stroke", all_color_feat2)
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")

        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) {
                return x(d[0]); 
            })
            .y(function(d) { return y2(d[1]); })
        );

    svg_feat2.append("line")          // attach a line
        .style("stroke", "black")  // colour the line
        .attr("stroke-width", 2)
        .attr("x1", x(quartile1))     // x position of the first end of the line
        .attr("y1", height_feat2/2)      // y position of the first end of the line
        .attr("x2", x(quartile3))     // x position of the second end of the line
        .attr("y2", height_feat2/2);


    svg_feat2.append("line")          // attach a line
        .style("stroke", "black")  // colour the line
        .attr("stroke-width", 2)
        .attr("x1", x(median))     // x position of the first end of the line
        .attr("y1", height_feat2/2-10)      // y position of the first end of the line
        .attr("x2", x(median))     // x position of the second end of the line
        .attr("y2", height_feat2/2+10);

    // Handmade legend
    svg_feat2.append("circle").attr("cx",290).attr("cy",25).attr("r", 6).style("fill", polluters_color_feat2)
    svg_feat2.append("circle").attr("cx",290).attr("cy",55).attr("r", 6).style("fill", legitimate_color_feat2)
    svg_feat2.append("circle").attr("cx",290).attr("cy",85).attr("r", 6).style("fill", all_color_feat2)
    svg_feat2.append("text").attr("x", 310).attr("y", 30).text("Content polluters").style("font-size", "15px").attr("alignment-baseline","middle")
    svg_feat2.append("text").attr("x", 310).attr("y", 60).text("Legitimate Users").style("font-size", "15px").attr("alignment-baseline","middle")
    svg_feat2.append("text").attr("x", 310).attr("y", 90).text("All Users").style("font-size", "15px").attr("alignment-baseline","middle")



}


function drawFeatureView2(error, data) {
  
    // ********* Followers Data *************
    followers_limit_feat2 = 1000;
    y1_axis_followers_limit_feat2 = 0.0065;
    y2_axis_followers_limit_feat2 = 0.0055;

    data1_followers_feat2 = data[0]
        .filter(function(d){
            return parseInt(d.NumberOfFollowers) < followers_limit_feat2} )
        .map(function(d) { return parseInt(d.NumberOfFollowers)});


    data2_followers_feat2 = data[1]
        .filter(function(d){return parseInt(d.NumberOfFollowers) < followers_limit_feat2} )
        .map(function(d) { return parseInt(d.NumberOfFollowers)});

    dataAll_followers_feat2 = [...data1_followers_feat2, ...data2_followers_feat2].sort();


    // ********* Followings Data *************
    followings_limit_feat2 = 1000;
    y1_axis_followings_limit_feat2 = 0.0065;
    y2_axis_followings_limit_feat2 = 0.0055;
    
    data1_followings_feat2 = data[0]
        .filter(function(d){
            return parseInt(d.NumerOfFollowings) < followings_limit_feat2} )
        .map(function(d) { return parseInt(d.NumerOfFollowings)});


    data2_followings_feat2 = data[1]
        .filter(function(d){return parseInt(d.NumerOfFollowings) < followings_limit_feat2} )
        .map(function(d) { return parseInt(d.NumerOfFollowings)});

    dataAll_followings_feat2 = [...data1_followings_feat2, ...data2_followings_feat2].sort();


    // ********* Tweets Count Data *************
    tweets_limit_feat2 = 1000;
    y1_axis_tweets_limit_feat2 = 0.0065;
    y2_axis_tweets_limit_feat2 = 0.0055;
    
    data1_tweets_feat2 = data[0]
        .filter(function(d){
            return parseInt(d.NumberOfTweets) < tweets_limit_feat2} )
        .map(function(d) { return parseInt(d.NumberOfTweets)});


    data2_tweets_feat2 = data[1]
        .filter(function(d){return parseInt(d.NumberOfTweets) < tweets_limit_feat2} )
        .map(function(d) { return parseInt(d.NumerOfTweets)});

    dataAll_tweets_feat2 = [...data1_tweets_feat2, ...data2_tweets_feat2].sort();


    // ********* Feature Selection *************
    updateFeatureView1("Followers");

}

// Function to compute density
function kernelDensityEstimator(kernel, X) {
    return function(V) {
        return X.map(function(x) {
            return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
    };
}
function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}

var Feature1_q = d3_queue.queue(1)
    .defer(d3.csv, "./data/processed/Dataset_2/legitimate_users.csv")
    .defer(d3.csv, "./data/processed/Dataset_2/content_polluters.csv")
// .defer(d3.csv, url3)
    .awaitAll(drawFeatureView2);

  d3.select("#selectButtonFeature2").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        qq=selectedOption;
        // run the updateChart function with this selected option
        updateFeatureView1(selectedOption)
    })

}
