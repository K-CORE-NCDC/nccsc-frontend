import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
// import genes from '../Common/gene.json'
// import { getBreastKeys, getUserDataProjectsTableData } from '../../actions/api_actions'

export default function BoxPlot({ box_data }) {
  const elementRef = useRef(null);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const drawChart = (data_) =>{
  // function box2() {
    // Inspired by http://informationandvisualization.de/blog/box-plot
    function d3_functor(v) {
      return typeof v === "function" ? v : function() { return v; };
    }

    // d3.functor = d3_functor;

    const box2 = () => {
      var width = 1,
          height = 1,
          duration = 0,
          domain = null,
          value = Number,
          whiskers = boxWhiskers,
          quartiles = boxQuartiles,
          showLabels = true, // whether or not to show text labels
          numBars = 4,
          curBar = 1,
          tickFormat = null,
          group = null;

      // For each small multiple…
      function box2(g) {
        g.each(function(data, i) {
          //d = d.map(value).sort(d3.ascending);
          //var boxIndex = data[0];
          //var boxIndex = 1;

         // var d = data[1].sort(d3.ascending);
         //console.log(data)
            var d = data.value.sort(d3.ascending);
         //console.log("************");
         //console.log(d);

          var g = d3.select(this),
              n = d.length,
              min = d[0],
              max = d[n - 1];

          // Compute quartiles. Must return exactly 3 elements.
          var quartileData = d.quartiles = quartiles(d);

          // Compute whiskers. Must return exactly 2 elements, or null.
          var whiskerIndices = whiskers && whiskers.call(this, d, i),
              whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

          // Compute outliers. If no whiskers are specified, all data are "outliers".
          // We compute the outliers as indices, so that we can join across transitions!
          var outlierIndices = whiskerIndices
              ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
              : d3.range(n);

          // Compute the new x-scale.
          // var x1 = d3.scale.linear()
          //     .domain(domain && domain.call(this, d, i) || [min, max])
          //     .range([height, 0]);

          var x1 = d3.scaleLinear()
              .domain(domain && domain.call(this, d, i) || [min, max])
              .range([height, 0]);

          // Retrieve the old x-scale, if this is an update.
          var x0 = this.__chart__ || d3.scaleLinear()
              .domain([0, Infinity])
             // .domain([0, max])
              .range(x1.range());

          // Stash the new scale.
          this.__chart__ = x1;

          // Note: the box, median, and box tick elements are fixed in number,
          // so we only have to handle enter and update. In contrast, the outliers
          // and other elements are variable, so we need to exit them! Variable
          // elements also fade in and out.

          // Update center line: the vertical line spanning the whiskers.
          var center = g.selectAll("line.center")
              .data(whiskerData ? [whiskerData] : []);

         //vertical line
          center.enter().insert("line", "rect")
              .attr("class", "center")
              .attr("x1", width / 2)
              .attr("y1", function(d) { return x0(d[0]); })
              .attr("x2", width / 2)
              .attr("y2", function(d) { return x0(d[1]); })
              .style("opacity", 1e-6)
            .transition()
              .duration(duration)
              .style("opacity", 1)
              .attr("y1", function(d) { return x1(d[0]); })
              .attr("y2", function(d) { return x1(d[1]); });

          center.transition()
              .duration(duration)
              .style("opacity", 1)
              .attr("y1", function(d) { return x1(d[0]); })
              .attr("y2", function(d) { return x1(d[1]); });

          center.exit().transition()
              .duration(duration)
              .style("opacity", 1e-6)
              .attr("y1", function(d) { return x1(d[0]); })
              .attr("y2", function(d) { return x1(d[1]); })
              .remove();

          // Update innerquartile box.
          var box = g.selectAll("rect.box")
              .data([quartileData]);

          box.enter().append("rect")
              .attr("class", "box")
              .style("fill", function(d){
      
                return getRandomColor()
              }) //"yellowgreen")
              .attr("x", 0)
              .attr("y", function(d) { return x0(d[2]); })
              .attr("width", width)
              .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
            .transition()
              .duration(duration)
              .attr("y", function(d) { return x1(d[2]); })
              .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

          box.transition()
              .duration(duration)
              .attr("y", function(d) { return x1(d[2]); })
              .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

          // Update median line.
          var medianLine = g.selectAll("line.median")
              .data([quartileData[1]]);

          medianLine.enter().append("line")
              .attr("class", "median")
              .attr("x1", 0)
              .attr("y1", x0)
              .attr("x2", width)
              .attr("y2", x0)
            .transition()
              .duration(duration)
              .attr("y1", x1)
              .attr("y2", x1);

          medianLine.transition()
              .duration(duration)
              .attr("y1", x1)
              .attr("y2", x1);

          // Update whiskers.
          var whisker = g.selectAll("line.whisker")
              .data(whiskerData || []);

          whisker.enter().insert("line", "circle, text")
              .attr("class", "whisker")
              .attr("x1", 0)
              .attr("y1", x0)
              .attr("x2", 0 + width)
              .attr("y2", x0)
              .style("opacity", 1e-6)
            .transition()
              .duration(duration)
              .attr("y1", x1)
              .attr("y2", x1)
              .style("opacity", 1);

          whisker.transition()
              .duration(duration)
              .attr("y1", x1)
              .attr("y2", x1)
              .style("opacity", 1);

          whisker.exit().transition()
              .duration(duration)
              .attr("y1", x1)
              .attr("y2", x1)
              .style("opacity", 1e-6)
              .remove();

          // Update outliers.
          // var outlier = g.selectAll("circle.outlier")
          //     .data(outlierIndices, Number);
          //
          // outlier.enter().insert("circle", "text")
          //     .attr("class", "outlier")
          //     .attr("r", 3)
          //     .attr("cx", width / 2)
          //     .attr("cy", function(i) { return x0(d[i]); })
          //     .style("opacity", 1e-6)
          //     .on("mouseover", function(d) {
          //       console.log(d)
          //       })
          //   .transition()
          //     .duration(duration)
          //     .attr("cy", function(i) { return x1(d[i]); })
          //     .style("opacity", 1);
          //
          // outlier.transition()
          //     .duration(duration)
          //     .attr("cy", function(i) { return x1(d[i]); })
          //     .style("opacity", 1);
          //
          // outlier.exit().transition()
          //     .duration(duration)
          //     .attr("cy", function(i) { return x1(d[i]); })
          //     .style("opacity", 1e-6)
          //     .remove();

          // Compute the tick format.
          var format = tickFormat || x1.tickFormat(8);

          // Update box ticks.
        var boxTick = g.selectAll("text.box")
            .data(quartileData);
         if(showLabels == true) {
          boxTick.enter().append("text")
              .attr("class", "box")
              .attr("dy", ".3em")
              .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
              .attr("x", function(d, i) { return i & 1 ?  + width : 0 })
              .attr("y", x0)
              .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
              .text(format)
            .transition()
              .duration(duration)
              .attr("y", x1);
        }

        boxTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1);

          // Update whisker ticks. These are handled separately from the box
          // ticks because they may or may not exist, and we want don't want
          // to join box ticks pre-transition with whisker ticks post-.
        var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

        if(showLabels == true) {
          whiskerTick.enter().append("text")
              .attr("class", "whisker")
              .attr("dy", ".3em")
              .attr("dx", 6)
              .attr("x", width)
              .attr("y", x0)
              .text(format)
              .style("opacity", 1e-6)
            .transition()
              .duration(duration)
              .attr("y", x1)
              .style("opacity", 1);
        }
          whiskerTick.transition()
              .duration(duration)
              .text(format)
              .attr("y", x1)
              .style("opacity", 1);

          whiskerTick.exit().transition()
              .duration(duration)
              .attr("y", x1)
              .style("opacity", 1e-6)
              .remove();
        });
        // d3.timer.flush();
      }

      box2.width = function(x) {
        if (!arguments.length) return width;
        width = x;
        return box2;
      };

      box2.height = function(x) {
        if (!arguments.length) return height;
        height = x;
        return box2;
      };

      box2.tickFormat = function(x) {
        if (!arguments.length) return tickFormat;
        tickFormat = x;
        return box2;
      };

      box2.duration = function(x) {
        if (!arguments.length) return duration;
        duration = x;
        return box2;
      };

      box2.domain = function(x) {
        if (!arguments.length) return domain;
        domain = x == null ? x : d3_functor(x);
        return box2;
      };

      box2.value = function(x) {
        if (!arguments.length) return value;
        value = x;
        return box2;
      };

      box2.whiskers = function(x) {
        if (!arguments.length) return whiskers;
        whiskers = x;
        return box2;
      };

      box2.showLabels = function(x) {
        if (!arguments.length) return showLabels;
        showLabels = x;
        return box2;
      };

      box2.quartiles = function(x) {
        if (!arguments.length) return quartiles;
        quartiles = x;
        return box2;
      };

      return box2;
    };

    function boxWhiskers(d) {
      return [0, d.length - 1];
    }

    function boxQuartiles(d) {
      return [
        d3.quantile(d, .25),
        d3.quantile(d, .5),
        d3.quantile(d, .75)
      ];
    }
  // }

    var dataset = data_

    var labels2 = true;
    var color = d3.scaleBand()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var margin = {top: 30, right: 50, bottom: 70, left: 25};
    var width = 600 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var min = Infinity,
    max = -Infinity;

    var x0 = d3.scaleBand()
      .rangeRound([0, width]).paddingInner(.5);

    var x_1 = d3.scaleBand();

    var y_0 = d3.scaleLinear()
      .range([height + margin.top, 0]);

    // var xAxis1 = d3.svg.axis()
    //   .scale(x0)
    //   .orient("bottom");

    var xAxis1 =  d3.axisBottom(x0)


    // var yAxis1 = d3.svg.axis()
    //   .scale(y_0)
    //   .orient(   "left");
      //.tickFormat(d3.format(".2s"));

    var yAxis1 =  d3.axisLeft(y_0)

    var svg1 = d3.select("#box").append("svg")
      .attr("class", "box")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var groups_data = d3.map(dataset, function(d){return d.Group;}).keys();
    // var dates_data = d3.map(dataset, function(d){return d.x;}).keys();
    var dates_data = []
    var groups_data = []
    for (var i = 0; i < dataset.length; i++) {
      var date = dataset[i]['x']
      var group = dataset[i]['Group']
      if (!dates_data.includes(date)){
        dates_data.push(date)
      }
      groups_data.push(group)
    }


    var dataset2 = [];
    var tmp = [];
    var data_tmp = []
    dates_data.forEach(function(date) {
        data_tmp = []
        groups_data.forEach(function(group) {
        tmp = [];
        dataset.forEach(function(d) {
            if(d.x == date && d.Group == group){
            tmp.push(d.y);
            };
        });
        data_tmp.push({group: group, value: tmp});
        });
        dataset2.push({Date: date, Data: data_tmp});
    });
    //
    min = d3.min(dataset, function(d){ return d.y }) * 0.995;
    max = d3.max(dataset, function(d){ return d.y }) * 1.005;

    x0.domain(dataset.map(function(d) { return d.x; }));

    // x_1.domain(Groups).rangeRound([0, x0.rangeBand()]);

    x_1.domain(groups_data).rangeRound([0, x0.bandwidth()]);
    y_0.domain([min, max]);

    svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + margin.top) + ")")
      .call(xAxis1);

    svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

    function iqr(k) {
      return function(d, i) {
          var q1 = d.quartiles[0],
              q3 = d.quartiles[2],
              iqr = (q3 - q1) * k,
              i = -1,
              j = d.length;
          while (d[++i] < q1 - iqr);
          while (d[--j] > q3 + iqr);
          return [i, j];
      };
    }


    var boxplot = box2()
      .whiskers(iqr(1.5))
      .width(x_1.bandwidth())
      .height(height + margin.top)
      .domain([min, max])
      .showLabels(labels2);

    var state = svg1.selectAll(".state2")
      .data(dataset2)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" +  x0(d.Date)  + ",0)"; } );

    state.selectAll(".box")
      .data(function(d) { return d.Data; })
	  .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x_1(d.group)  + ",0)"; } )
      .call(boxplot);
  }

  useEffect(()=>{
    // var data_ = [
    //   {'Group': 1, 'y': 5, 'x': 'Nonsense_Mutation'},
    //   {'Group': 1, 'y': 4, 'x': 'Nonsense_Mutation'},
    //   {'Group': 1, 'y': 7, 'x': 'Nonsense_Mutation'},
    //   {'Group': 1, 'y': 3, 'x': 'Nonsense_Mutation'},
    //   {'Group': 1, 'y': 3, 'x': 'Splice_Site'},
    //   {'Group': 1, 'y': 4, 'x': 'Splice_Site'},
    //   {'Group': 1, 'y': 1, 'x': 'Splice_Site'},
    //   {'Group': 1, 'y': 9, 'x': 'Splice_Site'},
    //   {'Group': 1, 'y': 8, 'x': 'Splice_Site'},
    // ];
    if(box_data){
        drawChart(box_data)
    }
  },[])


  return (
      <div id="box" className="md:w-auto sm:w-auto">
      </div>
  )
}
