function wordcloud2() {
	var users = ["legitimate_users", "content_users"]
	var tweetcount = [50, 100, 400]
	var files = ["./data/processed/Dataset_2/legitimate_50.json", "./data/processed/Dataset_2/legitimate_100.json", "./data/processed/Dataset_2/legitimate_400.json", "./data/processed/Dataset_2/polluted_50.json", "./data/processed/Dataset_2/polluted_100.json", "./data/processed/Dataset_2/polluted_400.json"]



	d3.select("#dataButton")
	  .selectAll('myOptions')
	  .data(users)
	  .enter()
	  .append('option')
	  .text(function (d) { return d; }) // text showed in the menu
	  .attr("value", function (d) { return d; })

	d3.select("#sizeButton")
	  .selectAll('myOptions')
	  .data(tweetcount)
	  .enter()
	  .append('option')
	  .text(function (d) { return d; }) // text showed in the menu
	  .attr("value", function (d) { return d; })
  
	d3.json("./data/processed/Dataset_2/legitimate_50.json", function(error, data) {
		//console.log(data)
		var color = d3.scaleLinear()
			.domain([1,2,3,4,10,15,20,25,30,35,45,50])
			.range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

		d3.layout.cloud().size([1250, 600])
				.words(data)
				.rotate(0)
				.fontSize(function(d) { return (d.size+5); })
				.on("end", draw)
				.start();
		var svg1;
		function draw(words) {
			console.log(1);
			svg1 = d3.select("#my_dataviz_wc").append("svg")
					.attr("width", 825)
					.attr("height", 350)
					.attr("class", "wordcloud")
					.append("g")
					.attr("transform", "translate(320,200)")
					.selectAll("text")
					.data(words)
					.enter().append("text")
					.style("font-size", function(d) { return (d.size+5) + "px"; })
					.style("fill", function(d, i) { return color(i); })
					.attr("transform", function(d) {
						return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					})
					.text(function(d) { return d.text; });
			}
		
		d3.select("#dataButton").on("change", function(d) {
			// recover the option that has been chosen
			var selectedOption = d3.select(this).property("value")
			var sopt = d3.select("#sizeButton").property("value")
			q1=selectedOption;
			q2 = sopt;
			if (q1 == "legitimate_users" && q2 == 50) {
				console.log("a");
				update(files[0])
			}
			if (q1 == "legitimate_users" && q2 == 100) {
				console.log("b");
				update(files[1])
			}
			if (q1 == "legitimate_users" && q2 == 400) {
				console.log("c");
				update(files[2])
			}
			if (q1 == "content_users" && q2 == 50) {
				console.log("c");
				update(files[3])
			}
			if (q1 == "content_users" && q2 == 100) {
				console.log("d");
				update(files[4])
			}
			if (q1 == "content_users" && q2 == 400) {
				console.log("e");
				update(files[5])
			}
		})
	 
		d3.select("#sizeButton").on("change", function(d) {
				// recover the option that has been chosen
				var sopt = d3.select(this).property("value")
				var selectedOption = d3.select("#dataButton").property("value")
				q1=selectedOption;
				q2 = sopt;
				if (q1 == "legitimate_users" && q2 == 50) {
					console.log("a1");
					update(files[0])
				}
				if (q1 == "legitimate_users" && q2 == 100) {
					console.log("b1");
					update(files[1])
				}
				if (q1 == "legitimate_users" && q2 == 400) {
					console.log("c1");
					update(files[2])
				}
				if (q1 == "content_users" && q2 == 50) {
					console.log("d1");
					update(files[3])
				}
				if (q1 == "content_users" && q2 == 100) {
					console.log("e1");
					update(files[4])
				}
				if (q1 == "content_users" && q2 == 400) {
					console.log("f1");
					update(files[5])
				}
			})
		
		function update(dataset) {
			//d3.select("svg").selectAll("g").remove();
			//d3.select("svg").remove();
			d3.select(".wordcloud").selectAll("g").remove();
			d3.select(".wordcloud").remove();
			//d3.select("svg").remove();
			//svg1.remove()
			
			console.log("removed");
			//console.log(dataset);
			d3.json(dataset, function(error, data) {
			//console.log(data)
			var color = d3.scaleLinear()
				.domain([1,2,3,4,10,15,20,25,30,35,45,50])
				.range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

			d3.layout.cloud().size([1250, 600])
					.words(data)
					.rotate(0)
					.fontSize(function(d) { return (d.size+4); })
					.on("end", draw)
					.start();

			function draw(words) {
				svg1 = d3.select("#my_dataviz_wc").append("svg")
						.attr("width", 850)
						.attr("height", 350)
						.attr("class", "wordcloud")
						.append("g")
						.attr("transform", "translate(320,200)")
						.selectAll("text")
						.data(words)
						.enter().append("text")
						.style("font-size", function(d) { return (d.size+3.2) + "px"; })
						.style("fill", function(d, i) { return color(i); })
						.attr("transform", function(d) {
							return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
						})
						.text(function(d) { return d.text; });
				}
			})
		};
	});
}

