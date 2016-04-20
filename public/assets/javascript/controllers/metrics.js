    // var svg = dimple.newSvg("body", 800, 600);
    // var data = [
    //   { "Word":"Hello", "Awesomeness":2000 },
    //   { "Word":"World", "Awesomeness":3000 }
    // ];
    // var chart = new dimple.chart(svg, data);
    // chart.addCategoryAxis("x", "Word");
    // chart.addMeasureAxis("y", "Awesomeness");
    // chart.addSeries(null, dimple.plot.bar);
    // chart.draw();
 //     d3.select('div')
 // .append('h1')
 // .text('Hello WorldWWWWWWWWWWW!');




var data = d3.range(10);
d3.select('section.sec').selectAll('.bar').data(data)
 .enter().append('div')
 .style('width', function(d){ return d + '%'; })
 .attr('class', 'bar');
                        