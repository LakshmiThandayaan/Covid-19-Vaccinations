//displays tooltip with information about a country when user puts mouse over a country
let map_mouseOver = function(d) {

    //reduces the opacity of all countries in the map
    d3.selectAll("#world_map path")
            .transition()
            .duration(200)
            .style("opacity", .3);

    //increases the opacity of the selected country                
    d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("stroke-width", "1");
    
    //infotmation to be diplayed when we have no data about the country the user chooses  
    if(d3.select(this).attr("country") == 'No_Data'){
        d3.select(".tooltip1").html("No Data")
                .style("opacity",1);

    }

    //information to diplayed otherwise
    else{
        var vacc_per100 = +d3.select(this).attr("vaccinated_per100");
        var vacc = d3.select(this).attr("vaccinated");
        var vacc_text = "";
        if (vacc >= 1000000000) 
        {
            vacc_text = (vacc / 1000000000).toFixed(2) + " billion";
            } 
        else if (vacc >= 1000000) 
            {
                vacc_text = (vacc / 1000000).toFixed(2) + " million";
            }
        else
            {
                vacc_text = parseFloat(vacc).toLocaleString();
            }

        if(map_selected_option.chosen_option == "People fully vaccinated"){
            d3.select(".tooltip1").html(d3.select(this).attr("country")
                                    + "<br> <br>" + vacc_text + " Persons fully vaccinated"
                                    + "<br>"+Math.round(vacc_per100*100)/100 +" Persons fully vaccinated per 100")
                .style("opacity",1)
                .style("width","350px")
                .style("height","150px");
        }
        else if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
            d3.select(".tooltip1").html(d3.select(this).attr("country")
                        + "<br> <br>" + vacc_text + " Persons vaccinated with atleast one dose"
                        + "<br>"+Math.round(vacc_per100*100)/100 +" Persons vaccinated with atleast one dose per 100")
            .style("opacity",1)
            .style("width","450px")
            .style("height","150px");
        }
        else if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
            d3.select(".tooltip1").html(d3.select(this).attr("country")
                        + "<br> <br>" + vacc_text + " Persons vaccinated with Booster dose"
                        + "<br>"+Math.round(vacc_per100*100)/100 +" Persons vaccinated with Booster dose per 100")
            .style("opacity",1)
            .style("width","450px")
            .style("height","150px");
        }
    }
}

//moving tooltip along with mouse when mouse is moving over a country
let map_mouseMove = function(event, d){
          
    d3.select(".tooltip1").style("transform","translateY(-55%)")
            .style("left",(event.x)+"px")
            .style("top",(event.y)-40+"px");
  
}
  
//resume to default mode when mouse leaves all countries
let map_mouseLeave = function(d) {
    
    d3.selectAll("#world_map path")
      .transition()
      .duration(200)
      .style("opacity", .8)
      .style("stroke-width", "0.4");
  
    d3.select(".tooltip1").style("opacity",0);
  
}

//highlight all countries with chosen category when mouse is over a corresponding box in legend
let legend_mouseOver = function(d){
    d3.select("#world_map")
        .selectAll("path")
        .style("opacity", .25);
    var countries = d3.select(this).attr("class");
    d3.selectAll("."+countries)
        .style("opacity",1)
        .style("stroke-width",1.5);

}

//resume to default mode when mouse leaves all legend boxes
let legend_mouseLeave = function(d){
    d3.select("#world_map").selectAll("path").style("opacity", .8)
            .style("stroke-width",0.4);

    d3.select(this)
        .style("stroke-width",0.5);

} 

//draw the map chosen by user or the default map
let draw_map = function(){

    var map = d3.select("#world_map")
        .append("g")
        .attr("id","map");

    //drawing the path or outline required for each country in the map
    map.selectAll("path")
      .data(map_features.map_topo.features)
      .enter()
      .append("path")
        // draw each country
        .attr("d", d3.geoPath()
          .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
          d.total = map_features.map_data.get(d.id) || 0;
            if(map_selected_option.chosen_option == "People fully vaccinated"){
                if(d.total == 0 || isNaN(d.total.fully_vaccinated))
                    return "No_Data";
                else 
                    return colorScale(d.total.fully_vaccinated_per100);
            }
            else if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
                if(d.total == 0 || isNaN(d.total.partly_vaccinated))
                    return "No_Data";
                else 
                    return colorScale(d.total.partly_vaccinated_per100);
            }
            else if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
                if(d.total == 0 || isNaN(d.total.booster))
                    return "No_Data";
                else 
                    return colorScale(d.total.booster_per100);
            }
        })
        //set class with country name + color given for each country to call later
        .attr("class",function(d){
            d.total = map_features.map_data.get(d.id) || 0;
            if(map_selected_option.chosen_option == "People fully vaccinated"){
                if(d.total == 0 || isNaN(d.total.fully_vaccinated) || d.total.fully_vaccinated == '')
                    return "No_Data white";
                else 
                    return d.total.country + " " + colorScale2(d.total.fully_vaccinated_per100);
            }
            else if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
                if(d.total == 0 || isNaN(d.total.partly_vaccinated) || d.total.partly_vaccinated == '')
                    return "No_Data white";
                else 
                    return d.total.country + " " + colorScale2(d.total.partly_vaccinated_per100);
            } 
            else if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
                if(d.total == 0 || isNaN(d.total.booster) || d.total.booster == '')
                    return "No_Data white";
                else 
                    return d.total.country + " " + colorScale2(d.total.booster_per100);
            }
        })
        //set an attribute with country name
        .attr("country",function(d){
            d.total = map_features.map_data.get(d.id) || 0;
            if(map_selected_option.chosen_option == "People fully vaccinated"){
                if(d.total == 0 || isNaN(d.total.fully_vaccinated))
                    return "No_Data";
                else 
                    return d.total.country;
            }
            else  if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
                if(d.total == 0 || isNaN(d.total.partly_vaccinated))
                    return "No_Data";
                else 
                    return d.total.country;
            }
            else  if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
                if(d.total == 0 || isNaN(d.total.booster))
                    return "No_Data";
                else 
                    return d.total.country;
            }
        })
        //set an attribute with number of vaccinations
        .attr("vaccinated", function(d){
            if(map_selected_option.chosen_option == "People fully vaccinated"){
                return parseInt(d.total.fully_vaccinated);
            }
            else  if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
                return parseInt(d.total.partly_vaccinated);
            }
            else  if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
                return parseInt(d.total.booster);
            }
        })
        //set an attribute with number of vaccinations per 100
        .attr("vaccinated_per100",function(d){
            if(map_selected_option.chosen_option == "People fully vaccinated"){
                return d.total.fully_vaccinated_per100;
            }
            else  if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
                return parseInt(d.total.partly_vaccinated_per100).toLocaleString();
            }
            else  if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
                return parseInt(d.total.booster_per100).toLocaleString();
            }
        })
        .style("stroke", "black")
        .style("stroke-width","0.4")
        .style("opacity", .8)
        //functions to call during these events
        .on("mouseover", map_mouseOver )
        .on("mousemove", map_mouseMove)
        .on("mouseleave", map_mouseLeave );  
        
        d3.selectAll(".No_Data")
            .attr("fill","white");

        //adding zoom features to map
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        d3.select("#world_map").call(zoom);

        function zoomed(event) {
            map.attr("transform", event.transform);
        }
}

//setting up legend for the map
let map_legend = function(){

    var size = 25;
    legend = d3.select("#legend")

    //setting up a heading for what the legend displays
    legend.append("text")
            .attr("id","heading")
            .style("font-weight","bold")
            .attr("x",30)
            .attr("y",50)
            .append('tspan')
                .text("Number of people")
            .attr("x",30)
            .attr("y",50)
            .append('tspan')
            .text("vaccinated per 100 with a")
                .attr("x",30)
                .attr("y",70)
            .append('tspan')
            .attr('id','sub_heading')
            .text("complete primary series")
                    .attr("x",30)
                    .attr("y",90);

    //setting up the legend boxes
    legend.selectAll("mylegends")
        .data(colors1)
        .enter()
        .append("rect")
            .attr("class", d => color_map.get(d))
            .attr("x", 60)
            .attr("y", function(d,i){ return 130 + i*(size+7)}) 
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ return d})
            .style("stroke","white")
            .style("stroke-width",1)
            .on("mouseover", legend_mouseOver)
            .on("mouseleave",legend_mouseLeave);
     
    //setting up labels for legend boxes 
    legend.selectAll("mylabels")
            .data(legend_labels)
            .enter()
            .append("text")
                .attr("x", 95 )
                .attr("y", function(d,i){ return 144 + i*(size+7)}) 
                .style("fill", "white")
                .text(function(d){ return d})
                .attr("text-anchor", "left")
                .style("font-size","16px")
                .style("font-weight", "bold")
                .style("alignment-baseline", "middle");  
                
}

//function to read the json file for outline of countries in the world.
let world_map = function(map_data){

    Promise.all([d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")]
            ).then(function(loadData){

                const data = new Map();
                for(var i = 0; i < map_data.length; i++){
                    data.set(map_data[i].code, map_data[i]);
                } 
                //storing the topology of countries to retrieve later   
                map_features.map_topo = loadData[0];

                //storing the data of all countries to retrieve later   
                map_features.map_data = data; 
                
                //adding map and legend when dashboard is opened.
                draw_map(); 
                map_legend();
            })
    }

