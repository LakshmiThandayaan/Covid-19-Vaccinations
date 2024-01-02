//setting up continainers for Vaccination Program.
let daily_vacc = function(){

    var daily_vacc = d3.select("#dataviz")
                        .append("div")
                        .attr("class","vacc_data")
                        .append("div")
                        .attr("class","row2");

    //adding left column for heading and line graph
    var left_column = daily_vacc.append("div")
                                .attr("class","column2 left2");

    //adding div element for title
    left_column.append("div")
                    .append("h3")
                    .attr("class","title");
    
    //setting up svg element for line graph
    left_column.append("svg")
                .attr("id","daily_vacc")
                .attr("width",graph_width)
                .attr("height",graph_height)
                .attr("transform","translate(100,10)");
    
    //setting tooltip for line graph to display information to user
    left_column.append("div")
                .attr("class","tooltip2");

    //setting right column for drop down menu and list of checkboxes for locations 
    var right_column = daily_vacc.append("div")
                        .attr("class","column2 right2");

    //container for drop down menu
    right_column.append("div")
                .attr("class","column_options2")
                .append("div")
                .attr("class","container2")
                .append("div")
                .attr("class","select-box2")
                .append("div")
                .attr("class","options-container2");

    //options for drop down menu
    var option1 = d3.select(".options-container2")
                .append("div")
                .attr("class","option");

    option1.append("input")
        .attr("type","radio")
        .attr("class","radio")
        .attr("id","new_vaccinations")
        .attr("name","category");

    option1.append("label")
        .attr("class","label_1")
        .attr("for","new_vaccinations")
        .text("Daily vaccinations administered");

    var option2 = d3.select(".options-container2")
                        .append("div")
                        .attr("class","option");

    option2.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","total_vaccinations")
            .attr("name","category");
    
    option2.append("label")
            .attr("class","label_1")
            .attr("for","total_vaccinations")
            .text("Total vaccinations administered");


    var option3 = d3.select(".options-container2")
            .append("div")
            .attr("class","option");

    option3.append("input")
    .attr("type","radio")
    .attr("class","radio")
    .attr("id","new_people_vaccinated")
    .attr("name","category");

    option3.append("label")
    .attr("class","label_1")
    .attr("for","new_people_vaccinated")
    .text("Daily people vaccinated");

    var option4 = d3.select(".options-container2")
                        .append("div")
                        .attr("class","option");

    option4.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","total_people_vaccinated")
            .attr("name","category");
    
    option4.append("label")
            .attr("class","label_1")
            .attr("for","total_people_vaccinated")
            .text("Total people vaccinated");

    
    var option5 = d3.select(".options-container2")
                        .append("div")
                        .attr("class","option");

    option5.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","total_people_fully_vaccinated")
            .attr("name","category");
    
    option5.append("label")
            .attr("class","label_1")
            .attr("for","total_people_fully_vaccinated")
            .text("Total people fully vaccinated");

    var option6 = d3.select(".options-container2")
                        .append("div")
                        .attr("class","option");

    option6.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","total_boosters")
            .attr("name","category");
    
    option6.append("label")
            .attr("class","label_1")
            .attr("for","total_boosters")
            .text("Total booster doses");

    //to hold selected option by user or default option
    d3.select(".select-box2")
            .append("div")
            .attr("class","selected_3")
            .text("Daily vaccinations administered");

   //container for list of locations
   var countries_list = right_column.append("div")
                                .attr("class","option_countries");

   //adding each country
   for (var i = 0; i < locations.total_locations; i++)
   {
        var label = countries_list.append("label")
                                        .attr("class","container3 " + locations.all_locations[i])
                                        .text(locations.all_locations[i])
                                        .style("font-weight","bold");

        label.append("input")
                .attr("type","checkbox");

        label.append("span")
                .attr("class","checkmark");

   }

   //ticking the chosen options by user. Initially 'World' would be ticked
   for (var i = 0; i < locations.selected_locations.length; i++){
        d3.select(".option_countries")
                .select("."+locations.selected_locations[i])
                .select("input")
                .attr("checked","checked");
   }


}