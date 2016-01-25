d3.json("tempdata.json", function(error, data){
    if(error){
        console.log("error on getting json data");
    }
    else{
        visualizeData2(data);
    }

});

function visualizeData2(data){
    //reformat the data into array
    var rData = [];
    rData = data.map(function(obj){
        return obj.temp;
    });
    console.log(rData);
    
    var newData = [];
    for(var i = 0; i<40; i++){
        newData.push(rData[i]);
    }
    console.log(newData);
    
    //set up parameters
    var margin = {top:20, right:20, bottom:30, left:40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        n = 40;
    
    var x = d3.scale.linear().domain([0, n-2]).range([0, width]);
    var y = d3.scale.linear().domain([22, 30]).range([height, 0]);
    
    var xAxis = d3.svg.axis().scale(x);
    var yAxis = d3.svg.axis().scale(y).orient("left");
    
    var line = d3.svg.line()
                .interpolate("basis")
                .x(function(d, i){return x(i);})
                .y(function(d, i){return y(d);});
    //svg container
    var svgContainer2 = d3.select("#temp").append("svg")
                    .attr("width", width+margin.left+margin.right)
                    .attr("height", height+margin.top+margin.bottom)
                    .append("g")
                    .attr("transform", "translate("+margin.left+","+ margin.top+")");
    //add x and y axises
    svgContainer2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,"+ y(25)+")")
            .call(xAxis);
    svgContainer2.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    //add the line graph
    var path2 = svgContainer2.append("path")
                .datum(newData)
                .attr("class", "line")
                .attr("d",line)
                .attr("stroke","black")
                .attr("stroke-width", 2)
                .attr("fill", "none");
    tick();
    function tick(){
        newData.push(rData[n]);
        path2.attr("d", line)
            .attr("transform", null)
            .transition()
            .duration(500)
            .ease("linear")
            .attr("transform", "translate("+x(0)+",0)")
            .each("end", tick);
        rData.shift();
        newData.shift();
    }
}
