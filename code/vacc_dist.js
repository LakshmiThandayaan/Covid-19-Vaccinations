//selecting tooltip for line graph
const tooltip2 = d3.select(".tooltip2");

//drawing the line graph and adding tooltip
let dist_graph = function(){

    //adding title to the map displayed
    if(dist_graph_selected_option.chosen_option == 'Daily vaccinations administered')
                d3.select(".title").text("Daily Covid-19 vaccine doses administered per million people in the total population");
        else  if(dist_graph_selected_option.chosen_option == 'Total vaccinations administered')
                d3.select(".title").text("Total Covid-19 vaccine doses administered per hundred people in the total population");
        else  if(dist_graph_selected_option.chosen_option == 'Daily people vaccinated')
                d3.select(".title").text("Daily number of people recieving a first Covid-19 vaccine dose per hundred people in the total population");
        else  if(dist_graph_selected_option.chosen_option == 'Total people vaccinated')
                d3.select(".title").text("Total number of people who recieved atleast one dose of Covid-19 vaccine per hundred people in the total population");
        else  if(dist_graph_selected_option.chosen_option == 'Total people fully vaccinated')
                d3.select(".title").text("Total number of people who finished the initial Covid-19 vaccine protocol per hundred people in the total population");
        else  if(dist_graph_selected_option.chosen_option == 'Total booster doses')
                d3.select(".title").text("Covid-19 vaccine boosters administered per hundred people in the total population");
  
    //setting container
    var graph = d3.select("#daily_vacc")
                    .append("g")
                    .attr("id","line_graph")
                    .attr("transform","translate(80,90)");

    //setting up range for the x and y axis
    var all_dates = [];
    var all_values = [];
    for(var i=0; i < locations.selected_locations.length; i++){
        var loc = locations.selected_locations[i]
        var data = graph_map.get(loc);
        dates = data.map(d => d.date);
        if(dist_graph_selected_option.chosen_option == 'Daily vaccinations administered')
                values = data.map(d => d.new_vaccinations);
        else  if(dist_graph_selected_option.chosen_option == 'Total vaccinations administered')
                values = data.map(d => d.total_vaccinations);
        else  if(dist_graph_selected_option.chosen_option == 'Daily people vaccinated')
                values = data.map(d => d.new_people_vaccinated);
        else  if(dist_graph_selected_option.chosen_option == 'Total people vaccinated')
                values = data.map(d => d.total_people_vaccinated);
        else  if(dist_graph_selected_option.chosen_option == 'Total people fully vaccinated')
                values = data.map(d => d.total_people_fully_vaccinated);
        else  if(dist_graph_selected_option.chosen_option == 'Total booster doses')
                values = data.map(d => d.total_boosters);

        //merging the x values of dates for all chosen locations
        all_dates = d3.merge([all_dates,dates])

        //merging the y values of vaccination for all chosen locations
        all_values = d3.merge([all_values,values]);
    }

    //setting up the x axis
    var x = d3.scaleTime()
                .domain(d3.extent(all_dates))
                .range([0,1000]);

    var xAxis = graph.append("g")
                        .attr("transform","translate(0,550)")
                        .style("stroke-width",1.5)
                        .style("font-weight","bold")
                        .call(d3.axisBottom(x).ticks(6));

    //setting up the y axis
    var y = d3.scaleLinear()
                .domain([0, d3.max(all_values)])
                .range([550,0]);

    var yAxis_format = d3.axisLeft(y)
                            .ticks(4)
                            .tickFormat(value => {return parseFloat(value).toLocaleString();});

    var yAxis = graph.append("g")
                        .style("stroke-width",1.5)
                        .call(yAxis_format)
                        .style("font-weight","bold");

    //array to store the y point for last vaccine data for each location to add label of location to the side
    var y_position = [];

    for(var i = 0; i < locations.selected_locations.length; i++)
    {
        //to store the last y point for last vaccine data a location
        var y_value = "";
        //getting cumulative data for total vaccinations when there is missing data
        var cumulative_yValue = 0;

        //adding line for each location chosen by user
        graph.append("path")
                .datum(graph_map.get(locations.selected_locations[i]))
                .attr("class","line "+locations.selected_locations[i])
                .attr("fill","none")
                .attr("stroke",graph_colors.get(locations.selected_locations[i]))
                .attr("stroke-width",2.5)
                .attr("d", d3.line()
                    .x(function(d)
                        {
                            return x(d.date);
                        })
                    .y(function(d){
                            //setting up the line for the graph based on option chosen by user
                            if(dist_graph_selected_option.chosen_option == 'Daily vaccinations administered')
                            {
                               if(isNaN(d.new_vaccinations)){
                                   y_value = parseFloat(y(0));
                                   return y(0);
                               }
                               else{
                                    y_value = parseFloat(y(d.new_vaccinations));
                                   return y(d.new_vaccinations);
                               }
                            }
                           else  if(dist_graph_selected_option.chosen_option == 'Total vaccinations administered'){
                               if(isNaN(d.total_vaccinations)){
                                    y_value = parseFloat(y(cumulative_yValue));
                                    return y(cumulative_yValue);
                                }
                               else{
                                    y_value = parseFloat(y(d.total_vaccinations));
                                    cumulative_yValue = d.total_vaccinations;
                                    return y(d.total_vaccinations);
                               }
                           }
                           else  if(dist_graph_selected_option.chosen_option == 'Daily people vaccinated'){
                               if(isNaN(d.new_people_vaccinated)){
                                    y_value = parseFloat(y(0));
                                    return y(0);
                                }
                               else{
                                    y_value[i] = parseFloat(y(d.new_people_vaccinated));
                                   return y(d.new_people_vaccinated);
                               }
                           }
                           else  if(dist_graph_selected_option.chosen_option == 'Total people vaccinated'){
                               if(isNaN(d.total_people_vaccinated)){
                                    y_value = parseFloat(y(cumulative_yValue));
                                    return y(cumulative_yValue);
                                }
                               else{
                                    y_value = parseFloat(y(d.total_people_vaccinated));
                                    cumulative_yValue = d.total_people_vaccinated;
                                    return y(d.total_people_vaccinated);
                               }
                           }
                           else  if(dist_graph_selected_option.chosen_option == 'Total people fully vaccinated'){
                               if(isNaN(d.total_people_fully_vaccinated)){
                                    y_value = parseFloat(y(cumulative_yValue));
                                    return y(cumulative_yValue);
                                }
                               else{
                                    y_value = parseFloat(y(d.total_people_fully_vaccinated));
                                    cumulative_yValue = d.total_people_fully_vaccinated;
                                    return y(d.total_people_fully_vaccinated);
                               }
                           }
                           else  if(dist_graph_selected_option.chosen_option == 'Total booster doses'){
                               if(isNaN(d.total_boosters)){
                                    y_value = parseFloat(y(cumulative_yValue));
                                    return y(cumulative_yValue);
                                }
                               else{
                                    y_value = parseFloat(y(d.total_boosters));
                                    cumulative_yValue = d.total_boosters;
                                    return y(d.total_boosters);   
                               }                                      
                           } 
                        }
                    )
                ); 

        //adding the y_value of each location to an array which will be used later when adding label for each line in the graph
        if(y_value == "" || y_value == 0)
            y_position.push(550);  
        else
            y_position.push(y_value);

        //
        graph.append("text")
                .attr("class","graph_labels")
                .attr("x", 1020)
                .attr("y", function(d){
                    for(var j = 0; j < i; j++){
                        console.log(j);
                        if(i == 0){}
                        //for adjusting the position of labels when there is an overlap
                        if(Math.abs(y_position[j] - y_position[i]) < 20){
                            y_position[i] =  y_position[i] + 20;
                        }
                    }
                    return y_position[i];
                }) // Adjust the position of the label above the line
                .text(locations.selected_locations[i])
                .style("fill",graph_colors.get(locations.selected_locations[i]))
                .style("font-weight","bold")
                .style("font-size","13");
           
    }

    //adding a focus point for tooltip
    var focus = graph.append("g")
                        .attr("class", "focus")
                        .style("display", "none");      

    //setting contianer for a vertical line through the graph to show poisiton of mouse point in the listening rectangle 
    focus.append("line")
            .attr("class", "x")
                        .style("opacity", 0.8)
                        .style("stroke","grey")
                        .attr("y1", 550)
                        .attr("y2", 550);

    //setting contianer for a circular point for each line in grpah to highlight the data point for which information is displayed 
    for(var i = 0; i < locations.selected_locations.length; i++){

        focus.append("circle")
                .attr("class", locations.selected_locations[i].replace(/\s+/g, ""))
                .attr("fill",graph_colors.get(locations.selected_locations[i]))
                .attr("r", 0);
    }

    const length = locations.selected_locations.length;
    var cumulative_yValue = Array.from({length}, () => 0);

    //function gets called when mouse on the line graph
    function mouseMove(event){
            
            //to identify the location of the mouse and get the x value and hence date of point where mouse is within the line graph 
            const bisect = d3.bisector((d) => d.date).left,
            x0 = x.invert(d3.pointer(event, this)[0]),
            i = bisect(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            var x_value = d.date;

            //text for the tooltip
            var tooltip_text = d3.timeFormat("%b %d, %Y")(x_value)+"<br><br>";
            var tooltip_array = [];

            for(var j = 0; j < locations.selected_locations.length; j++){
                /*getting vaccination value for each location where mouse point is
                  This is done by using the d3.group() on the data set for location and then date.
                  vaccination data is then obtained by using .get() with the date value*/
                  var y_value = "";
                value = groupedDatedLocation.get(locations.selected_locations[j]).get(d3.timeFormat("%Y-%m-%d")(x_value))[0];
                //vaccination value taken based on graph chosen by user
                if(dist_graph_selected_option.chosen_option == 'Daily vaccinations administered')
                    {
                        if(isNaN(value.new_vaccinations))
                            y_value =  0;
                        else
                            y_value = value.new_vaccinations;
                    }
                else  if(dist_graph_selected_option.chosen_option == 'Total vaccinations administered')
                    {
                        if(isNaN(value.total_vaccinations))
                        {
                            y_value = cumulative_yValue[j];
                        }
                        else
                        { 
                            y_value = value.total_vaccinations;
                            cumulative_yValue[j] = y_value;
                        }
                    }
                else  if(dist_graph_selected_option.chosen_option == 'Daily people vaccinated')
                    {
                        if(isNaN(value.new_people_vaccinated))
                            y_value = 0;
                        else
                            y_value = value.new_people_vaccinated;
                    }
                else  if(dist_graph_selected_option.chosen_option == 'Total people vaccinated')
                    {
                        if(isNaN(value.total_people_vaccinated))
                                y_value = cumulative_yValue[j];
                        else
                        {
                                y_value = value.total_people_vaccinated;
                                cumulative_yValue[j] = y_value;
                        }
                    }
                else  if(dist_graph_selected_option.chosen_option == 'Total people fully vaccinated')
                    {
                        if(isNaN(value.total_people_fully_vaccinated))
                                y_value = cumulative_yValue[j];
                        else
                        {
                                y_value = value.total_people_fully_vaccinated;
                                cumulative_yValue[j] = y_value;

                        }
                    }
                else  if(dist_graph_selected_option.chosen_option == 'Total booster doses')
                    {
                        if(isNaN(value.total_boosters))
                                y_value = cumulative_yValue;
                        else
                        {
                                y_value = value.total_boosters;     
                                cumulative_yValue[j] = y_value;      
                        }                              
                    }
                    

                focus.select("."+locations.selected_locations[j].replace(/\s+/g, ""))
                            .attr("transform", "translate(" + x(x_value) + "," + y(y_value) + ")")
                            .attr("r",6);

                //infomation for tooltip to display            
                tooltip_text = tooltip_text + locations.selected_locations[j] + ": " + y_value + "<br>";
                tooltip_array.push(locations.selected_locations[j] + ": " + y_value);

            }

            //moving vertical line along with the movement of mouse 
            focus
                .select(".x")
                .attr("transform", "translate(" + x(x_value) + "," + 550 * -1 + ")")
                .attr("y2", 550 + 550);

          
            //tooltip with info being displayed
            d3.select(".tooltip2")
                .style("transform","translateY(-55%)")
                .style("left",(event.x)+40+"px")
                .style("top",(event.y)-60+"px")
                .style("opacity",1)
                .html(tooltip_text); 

        }

        //setting up a listening rectangle for a line graph
        graph.append("rect")
                .attr("width", graph_width - 100)
                .attr("height", graph_height - 100)
                .style("fill", "none")
                .style("pointer-events", "all")
                .on("mouseover", () => {
                        focus.style("display", null);
                    })
                .on("mouseout", () => {
                        focus.style("display", "none");
                        d3.select(".tooltip2").style("opacity",0);
                    })
                .on("touchmove mousemove", mouseMove);

}


