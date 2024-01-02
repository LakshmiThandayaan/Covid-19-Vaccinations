//setting up continainers for Impact of Vaccinations.

let vacc_impact = function(){

    var vacc_impact = d3.select("#dataviz")
                        .append("div")
                        .attr("class","vacc_data")
                        .append("div")
                        .attr("class","row3");

    //adding left column for heading and bar chart
    var left_column = vacc_impact.append("div")
                        .attr("class","column3 left3");

    //adding div element for title
    left_column.append("div")
                .append("h3")
                .attr("class","impact_title");

    //setting up svg element for bar chart
    left_column.append("svg")
                .attr("id","vacc_impact")
                .attr("width",graph_width + 80)
                .attr("height",graph_height)
                .attr("transform","translate(60,10)");

    //setting tooltip for bar chart to display information to user
    left_column.append("div")
                .attr("class","tooltip3");

    //setting right column for drop down menu for type of graph and locations 
    var right_column = vacc_impact.append("div")
                .attr("class","column3 right3");

    //container for drop down menu for type of graph
    right_column.append("div")
        .attr("class","column_options3")
        .append("div")
        .attr("class","container4")
        .append("div")
        .attr("class","select-box3")
        .append("div")
        .attr("class","options-container3");

    //options for drop down menu
    var option1 = d3.select(".options-container3")
                    .append("div")
                    .attr("class","option");

    option1.append("input")
                    .attr("type","radio")
                    .attr("class","radio")
                    .attr("id","cases_with_people_vaccinated")
                    .attr("name","category");

    option1.append("label")
                    .attr("class","label_2")
                    .attr("for","cases_with_people_vaccinated")
                    .text("Confirmed Cases with people vaccinated");

    var option2 = d3.select(".options-container3")
                    .append("div")
                    .attr("class","option");

    option2.append("input")
                    .attr("type","radio")
                    .attr("class","radio")
                    .attr("id","cases_with_people_fully_vaccinated")
                    .attr("name","category");

    option2.append("label")
                    .attr("class","label_2")
                    .attr("for","cases_with_people_fully_vaccinated")
                    .text("Confirmed Cases with people fully vaccinated");

    var option3 = d3.select(".options-container3")
                    .append("div")
                    .attr("class","option");

    option3.append("input")
                    .attr("type","radio")
                    .attr("class","radio")
                    .attr("id","cases_with_booster_doses")
                    .attr("name","category");

    option3.append("label")
                    .attr("class","label_2")
                    .attr("for","cases_with_booster_doses")
                    .text("Confirmed Cases with booster doses");

    var option4 = d3.select(".options-container3")
                    .append("div")
                    .attr("class","option");

    option4.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","deaths_with_people_vaccinated")
            .attr("name","category");

    option4.append("label")
            .attr("class","label_2")
            .attr("for","deaths_with_people_vaccinated")
            .text("Recorded Deaths with people vaccinated");

    var option5 = d3.select(".options-container3")
                        .append("div")
                        .attr("class","option");

    option5.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","deaths_with_people_fully_vaccinated")
            .attr("name","category");

    option5.append("label")
        .attr("class","label_2")
        .attr("for","deaths_with_people_fully_vaccinated")
        .text("Recorded Deaths with people fully vaccinated");

var option6 = d3.select(".options-container3")
                        .append("div")
                        .attr("class","option");

option6.append("input")
        .attr("type","radio")
        .attr("class","radio")
        .attr("id","deaths_with_booster_doses")
        .attr("name","category");

option6.append("label")
        .attr("class","label_2")
        .attr("for","deaths_with_booster_doses")
        .text("Recorded Deaths with booster doses");

//to hold selected option by user or default option
d3.select(".select-box3")
            .append("div")
            .attr("class","selected_4")
            .text("Confirmed Cases with people vaccinated");

//container for drop down menu for list of locations
var countries_list = right_column.append("div")
                                .attr("class","option_for_countries")
                                .append("div")
                                .attr("class","container5")
                                .append("div")
                                .attr("class","select-box4");

countries_list.append("div")
        .attr("class","options-container4");

   //adding each country
    for (var i = 0; i < locations.total_locations; i++)
    {
        var option = countries_list.select(".options-container4")
                                .append("div")
                                .attr("class","option2 "+locations.all_locations[i]);
        
        option.append("input")
                .attr("type","radio")
                .attr("class","radio")
                .attr("id",locations.all_locations[i])   
                .attr("name","category");
                
        option.append("label")
                .attr("class","label_3")
                .attr("for",locations.all_locations[i])
                .text(locations.all_locations[i]);

    }

   //setting up a default value to display initially
    countries_list.append("div")
                        .attr("class","selected_5")
                        .text("World");

    //setting up legend for map
    right_column.append("div")
                .append("svg")
                .attr("id","impact_legend")
                .attr("width",322)
                .attr("height",450)
                .attr("transform","translate(12,20)");
                   
}