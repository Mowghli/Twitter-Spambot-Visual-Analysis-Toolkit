


    
function dim_red_dataset1(){       

var margin = { top: 10, right: 20, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;


//var x = d3.scaleLog().range([0, width]);
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var color = d3.scaleOrdinal(d3.schemeCategory10);




var svg = d3.select("#my_dataviz_dr")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data/processed/Dataset_1/lda_pca_dataset1.csv", function(error, data) {
    if (error) throw error;
    
    data.forEach(function(d) {
       
        d.pca_1 = +d.pca_1;
        d.pca_2 = +d.pca_2;
        d.tweet_count = +d.tweet_count;
        d.lda_1 = +d.lda_1;
        d.s_no = +d.s_no;
    });


pca();

var Algorithms = ["PCA" , "LDA"]

d3.select("#selectButtonDR")
      .selectAll('myOptions')
      .data(Algorithms)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })


d3.select("#selectButtonDR").on("change", function(d) {
        
        var selectedOption = d3.select(this).property("value")
        
        if (selectedOption == "PCA")
        {   clear();
            pca();
        }

        else
        {
            clear();
            lda();
        }
    })


function  clear(){

d3.select('#my_dataviz_dr').selectAll('circle').remove();
d3.select('#my_dataviz_dr').select('.y.axis').remove();
d3.select('#my_dataviz_dr').select('.x.axis').remove();
d3.select('#my_dataviz_dr').select('.x.label').remove();
d3.select('#my_dataviz_dr').select('.y.label').remove();

d3.select('#my_dataviz_dr').select('.title').remove();
}



   
function pca(){
    x.domain(d3.extent(data, function(d) { return d.pca_1; }));
    
    y.domain(d3.extent(data, function(d) { return d.pca_2; }));
    

    // range domain for radius
    domN = d3.extent(data, function(d) { return d.tweet_count; });
    ran = [1, 5];
    var scale = d3.scaleLinear().domain(domN).range(ran);

    // Add color
    //var color = d3.scaleOrdinal(d3.schemeCategory10);
    // Add the scatterplot
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
       
        .attr("r", function(d) { return scale(d.tweet_count); })
        //.attr("r", 5)
        .attr("cx", function(d) { return x(d.pca_1); })
        .attr("cy", function(d) { return y(d.pca_2); })


        
        .style("opacity", 0.8)
        
        .style("fill", function(d, i) { return (color(d.Label)) });

   

    // Add the X Axis
    svg.append("g")
        .attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .style('font-family', '"Open Sans", Lato')
        //.tickValues([300, 400, "1k", "2k", "3k", "4k", "10k" , "20k" , "30k" , "40k" , "100k"])
        .call(d3.axisBottom(x))
            //.ticks(11, ".0s"));

    // Add x lables
    svg.append("text")
        .attr('class', 'x label')
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style('font-family', '"Open Sans", sans-serif')
        .style("font-size", "14px")
        .style("font-weight", "700")
        //.text("GDP per Capita");
        .text("Principal Component 1");

    // Add the Y Axis
    svg.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y));

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
        .text("Principal Component 2");

    svg.append("text")
        .attr('class', 'title')
        .attr("x", (width / 2))
        //.attr("y", 0 - (margin.top / 2))
        //.attr("y", (height / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .style("font-weight", "700")
        //.style("font-family", "sans-serif")
        .style('font-family', '"Open Sans", sans-serif')
        //.text("GDP vs Life Expectancy (1952, 2007)");
        .text("Principal Component Analysis");

    var legend_keys = ["Content Polluter", "Legitimate User"]


    var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
        .enter().append("g")
        .attr("class", "lineLegend")
        .attr("transform", function(d, i) {
            return "translate(" + (width - 100) + "," + (i * 20) + ")";
        });

    lineLegend.append("text").text(function(d) { return d; })
        //.attr("transform", "translate(15,9)") //align texts with boxes
        .attr("transform", "translate(20,13)")
        .style("font-size", "11px")
        .style('font-family', '"Open Sans", sans-serif');

    lineLegend.append("rect")
        .attr("fill", function(d, i) { return color(d); })
        .attr("width", 15).attr("height", 15);



}


function lda(){

    x.domain(d3.extent(data, function(d) { return d.s_no; }));
    
    y.domain(d3.extent(data, function(d) { return d.lda_1; }));
    

    // range domain for radius
    domN = d3.extent(data, function(d) { return d.tweet_count; });
    ran = [1, 5];
    var scale = d3.scaleLinear().domain(domN).range(ran);

    // Add color
    //var color = d3.scaleOrdinal(d3.schemeCategory10);
    // Add the scatterplot
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
       
        .attr("r", function(d) { return scale(d.tweet_count); })
        
        .attr("cx" , function(d){ return x(d.s_no); })
        
        /*
        .attr("cx", function(d) { 
            if (d.Label == "content polluter")
                return x(d.s_no);
            else
                return x(d.s_no - 22223)
              })
        */
        .attr("cy", function(d) { return y(d.lda_1); })
       
        .style("opacity", 0.4)
        
        .style("fill", function(d, i) { return (color(d.Label)) });

   

    // Add the X Axis
    svg.append("g")
        .attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .style('font-family', '"Open Sans", Lato')
        //.tickValues([300, 400, "1k", "2k", "3k", "4k", "10k" , "20k" , "30k" , "40k" , "100k"])
        .call(d3.axisBottom(x))
            //.ticks(11, ".0s"));

    // Add x lables
    svg.append("text")
        .attr('class', 'x label')
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style('font-family', '"Open Sans", sans-serif')
        .style("font-size", "14px")
        .style("font-weight", "700")
        //.text("GDP per Capita");
        .text("Number of Users");

    
    
    // Add the Y Axis
    svg.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y));

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
        .text("Linear Discriminant 1");

    
    svg.append("text")
            .attr('class', 'title')

        .attr("x", (width / 2))
        //.attr("y", 0 - (margin.top / 2))
        //.attr("y", (height / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .style("font-weight", "700")
        //.style("font-family", "sans-serif")
        .style('font-family', '"Open Sans", sans-serif')
        //.text("GDP vs Life Expectancy (1952, 2007)");
        .text("Linear Discriminant Analysis");

    var legend_keys = ["Content Polluter", "Legitimate User"]
    //var legend_keys = ["setosa", "versicolor" , "virginica"]

    var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
        .enter().append("g")
        .attr("class", "lineLegend")
        .attr("transform", function(d, i) {
            return "translate(" + (width - 100) + "," + (i * 20) + ")";
        });

    lineLegend.append("text").text(function(d) { return d; })
        //.attr("transform", "translate(15,9)") //align texts with boxes
        .attr("transform", "translate(20,13)")
        .style("font-size", "11px")
        .style('font-family', '"Open Sans", sans-serif');

    lineLegend.append("rect")
        .attr("fill", function(d, i) { return color(d); })
        .attr("width", 15).attr("height", 15);


}


});




 }
