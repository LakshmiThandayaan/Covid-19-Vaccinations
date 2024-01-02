//adding tooltip for each of the bars in the bar graph
let impact_mouseover = function(d){

    d3.select(this)
        .style("opacity", 1)
        .style("stroke","black")
        .style("stroke-width", "1");

    //adding labels based on the type of option chosen by user
    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
        impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
        impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses")
    {
        var cases = d3.select(this).attr("cases");
        if (cases >= 1000000000) 
        {
            cases_text = (cases / 1000000000).toFixed(2) + " billion";
        } 
        else if (cases >= 1000000) 
            {
                cases_text = (cases / 1000000).toFixed(2) + " million";
            }
        else
            {
                cases_text = parseFloat(cases).toLocaleString();
            }

        d3.select(".tooltip3")
            .html(d3.select(this).attr("location")+"<br><br>Date: "
                + d3.select(this).attr("date")+"<br>Confirmed Cases: "
                +cases_text+"<br>Vaccinated: "
                +d3.select(this).attr("vaccinated")) 
            .style("opacity",1);
    }
    else
    {
        var cases = d3.select(this).attr("cases");
        if (cases >= 1000000000) 
        {
            cases_text = (cases / 1000000000).toFixed(2) + " billion";
        } 
        else if (cases >= 1000000) 
            {
                cases_text = (cases / 1000000).toFixed(2) + " million";
            }
        else
            {
                cases_text = parseFloat(cases).toLocaleString();
            }
        d3.select(".tooltip3")
            .html(d3.select(this).attr("location")+"<br><br>Date: "
            + d3.select(this).attr("date")+"<br>Recorded Deaths: "
            +cases_text+"<br>Vaccinated: "
            +d3.select(this).attr("vaccinated"))
        .style("opacity",1);
    }
}

//moving tooltip along with mouse point
let impact_mousemove = function(event, d){
    d3.select(".tooltip3").style("transform","translateY(-55%)")
    .style("left",(event.x)+"px")
    .style("top",(event.y)-40+"px");
}

//resuming to default mode when mouse point is removed from graph
let impact_mouseleave = function(d){
    d3.selectAll(".bar")
      .style("opacity", 0.6)
      .style("stroke-width", "0");

    d3.select(".tooltip3").style("opacity",0);

}

//adding bar chart to dashboard 
let impact_graph = function(){
 
    //adding title based on option chosen by user
    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" )
        d3.select(".impact_title").text("Weekly cases along with highlighting when percentage of population received atleast one Covid-19 vaccine")
    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" )
        d3.select(".impact_title").text("Weekly cases along with highlighting when percentage of population completed the initial Covid-19 vaccine protocol")
    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses" )
        d3.select(".impact_title").text("Weekly cases along with highlighting when percentage of population received the booster doses")
    else if(impact_graph_selected_option.chosen_option == "Recorded Deaths with people vaccinated" )
        d3.select(".impact_title").text("Weekly deaths along with highlighting when percentage of population received atleast one Covid-19 vaccine")
    else if(impact_graph_selected_option.chosen_option == "Recorded Deaths with people fully vaccinated" )
        d3.select(".impact_title").text("Weekly deaths along with highlighting when percentage of population completed the initial Covid-19 vaccine protocol")
    else if(impact_graph_selected_option.chosen_option == "Recorded Deaths with booster doses" )
        d3.select(".impact_title").text("Weekly deaths with highlighting when percentage of population received the booster doses")

   //adding g element to set the bar chart
   var graph = d3.select("#vacc_impact")
                    .append("g")
                    .attr("id","impact_graph")
                    .attr("transform","translate(80,90)");

    //adding up daily data to get weekly data 
    const data = graph_map.get(impact_locations.chosen_option);
    const weekly_data = Array.from(d3.group(data, d => d3.timeWeek(d.date)),
                                    ([key, values]) => ({
                                        key: d3.timeFormat("%b %d, %Y")(new Date(key)),
                                        confirmed_cases: d3.sum(values, d => d.new_cases),
                                        recorded_deaths: d3.sum(values, d => d.new_deaths),
                                        people_vaccinated: d3.max(values, d => d.total_people_vaccinated),
                                        people_fully_vaccinated: d3.max(values, d => d.total_people_fully_vaccinated),
                                        booster_doses: d3.max(values, d => d.total_boosters)
                                    }));
                                    
    //adding x axis
    var x = d3.scaleBand()
                .domain(weekly_data.map(d => d.key))
                .range([0,1200])
                .padding(0.2);
                
    graph.append('g')
            .attr("transform","translate(0,550)")
            .style("stroke-width",1.5)
            .style("font-weight","bold")
            .call(d3.axisBottom(x).ticks(4))
                     .selectAll("text")
                     .attr("transform", "translate(-10,0)rotate(-90)")
                     .style("text-anchor", "end")
                     .style("color","transparent");
    
    //adding y axis                               
    var y_values = [];
    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
    impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
    impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses")
        y_values = d3.map(weekly_data, d => d.confirmed_cases);
    else
        y_values = d3.map(weekly_data, d => d.recorded_deaths);

    var y = d3.scaleLinear()
                .domain([0,d3.max(y_values)])
                .range([550,0]);   
    
    var yAxis_format = d3.axisLeft(y)
                .ticks(4)
                .tickFormat(value => 
                {
                    if (value >= 1000000000) 
                    {
                        return (value / 1000000000).toFixed(0) + " billion";
                    } 
                    else if (value >= 1000000) 
                    {
                        return(value / 1000000).toFixed(0) + " million";
                    }
                    else
                    {
                        return parseFloat(value).toLocaleString();
                    }
                });

    graph.append("g")
                .style("stroke-width",1.5)
                .style("font-weight","bold")
                .style("stroke","transparent")
                .call(yAxis_format);

    //adding bars to graph
    graph.selectAll(".bar")
            .data(weekly_data)
            .enter()
            .append("rect")
            .attr("class","bar")
                .attr("x", function(d){
                    return x(d.key)
                })
                //adding vaccination data based on option chosen by user
                .attr("y", function(d){
                    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
                       impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
                       impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses")
                       {
                            return y(d.confirmed_cases);
                       }
                    else
                            return y(d.recorded_deaths);
                })
                //setting height and width of the bars
                .attr("width", x.bandwidth())
                .attr("height", function(d){
                    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
                    impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
                    impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses"){
                        return 550 - y(d.confirmed_cases);
                    }
                    else 
                        return 550 - y(d.recorded_deaths);
                })
                //adding attributes to call for tooltip
                .attr("location",impact_locations.chosen_option)
                .attr("date", d => d.key)
                .attr("cases", function(d){
                    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
                        impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
                        impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses")
                        return parseInt(d.confirmed_cases);
                    else
                        return parseInt(d.recorded_deaths);
                })
                .attr("vaccinated", function(d){
                    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
                       impact_graph_selected_option.chosen_option == "Recorded Deaths with people vaccinated")
                            return d.people_vaccinated
                    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
                    impact_graph_selected_option.chosen_option == "Recorded Deaths with people fully vaccinated")
                        return d.people_fully_vaccinated;
                    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses" ||
                    impact_graph_selected_option.chosen_option == "Recorded Deaths with booster doses")
                        return d.booster_doses
                })
                //adding color to bars based on the number of vaccinations administered till that point 
                .attr("fill", function(d){
                    //if-else option based on option chosen by user
                    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
                       impact_graph_selected_option.chosen_option == "Recorded Deaths with people vaccinated")
                    {
                        if(d.people_vaccinated < 10)
                            return "#cc0000";
                        else if(d.people_vaccinated < 20)
                            return "#fa7921";
                        else if(d.people_vaccinated < 40)
                            return "#e8aa14";
                        else if(d.people_vaccinated < 60)
                            return "#91cb3e";
                        else if(d.people_vaccinated < 70)
                            return "#457800";
                        else if(d.people_vaccinated < 90)
                            return "#174a00";
                        else if(d.people_vaccinated >= 90)
                            return "#001a00";
                        else 
                            return "#333333";
                    }
                    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
                            impact_graph_selected_option.chosen_option == "Recorded Deaths with people fully vaccinated")
                    {
                        if(d.people_fully_vaccinated < 10)
                            return "#cc0000";
                        else if(d.people_fully_vaccinated < 20)
                            return "#fa7921";
                        else if(d.people_fully_vaccinated < 40)
                            return "#e8aa14";
                        else if(d.people_fully_vaccinated < 60)
                            return "#91cb3e";
                        else if(d.people_fully_vaccinated < 70)
                            return "#457800";
                        else if(d.people_fully_vaccinated < 90)
                            return "#174a00";
                        else if(d.people_fully_vaccinated >= 90)
                            return "#001a00";
                        else 
                            return "##333333";
                    }
                    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses" ||
                            impact_graph_selected_option.chosen_option == "Recorded Deaths with booster doses")
                    {
                        if(d.booster_doses < 10)
                            return "#cc0000";
                        else if(d.booster_doses < 20)
                            return "#fa7921";
                        else if(d.booster_doses < 40)
                            return "#e8aa14";
                        else if(d.booster_doses < 60)
                            return "#91cb3e";
                        else if(d.booster_doses < 70)
                            return "#457800";
                        else if(d.booster_doses < 90)
                            return "#174a00";
                        else if(d.booster_doses >= 90)
                            return "#001a00";
                        else 
                            return "#333333";
                    }
                })
                .style("opacity",0.6)
                //functions to call during these events
                .on("mouseover",impact_mouseover)
                .on("mousemove",impact_mousemove)
                .on("mouseleave",impact_mouseleave);
        
}

//adding legend to display information about colors of bars 
let impact_legend = function(){

    var size = 25;
    legend = d3.select("#impact_legend")

    //adding heading to legend
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
            .attr('id','impact_sub_heading')
            .text("dose of the primary vaccine")
                    .attr("x",30)
                    .attr("y",90);

    //adding the legend boxes with colors
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
            .style("stroke-width",1);
     
    //adding labels to the legend boxes 
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
