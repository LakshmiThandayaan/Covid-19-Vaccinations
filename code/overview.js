//This file is used to set up the contiainers required when Overview option is chosen
let overview = function(){

    var overview = d3.select("#dataviz")
                        .append("div")
                        .attr("class","vacc_data");

    //sets up the left column for the map
    var left_column = overview.append("div")
                            .attr("class","column1 left1");

    //adds title of the map that will be displayed
    left_column.append("div")
                .append("h3")
                .attr("class","map_title")
                .text("People who have completed the intitial vaccination protocol");

    //adds the svg (graphical) element that will be used to contain the map
    left_column.append("svg")
        .attr("id","world_map")
        .attr("width",1100)
        .attr("height",700)
        .attr("transform","translate(150,10)");

    //adds a tooltip for the map
    left_column.append("div")
        .attr("class", "tooltip1"); 

    //adds the right column
    var right_column= overview.append("div")
                            .attr("class","column1 right1");

    //adds contiainers for the drop down menu 
    right_column.append("div")
        .attr("class","column_options1")
        .append("div")
        .attr("class","container1")
        .append("div")
        .attr("class","select-box1")
        .append("div")
        .attr("class","options-container1");

    //adds the options for drop down menu
    var option1 = d3.select(".options-container1")
                    .append("div")
                    .attr("class","option");

    option1.append("input")
        .attr("type","radio")
        .attr("class","radio")
        .attr("id","booster")
        .attr("name","category");

    option1.append("label")
        .attr("class","label_1")
        .attr("for","booster")
        .text("People vaccinated with Booster dose");

    var option2 = d3.select(".options-container1")
                    .append("div")
                    .attr("class","option");

    option2.append("input")
            .attr("type","radio")
            .attr("class","radio")
            .attr("id","fully_vaccinated")
            .attr("name","category");

    option2.append("label")
            .attr("class","label_1")
            .attr("for","fully_vaccinated")
            .text("People fully vaccinated");

    var option3 = d3.select(".options-container1")
    .append("div")
    .attr("class","option");

    option3.append("input")
    .attr("type","radio")
    .attr("class","radio")
    .attr("id","partly_vaccinated")
    .attr("name","category");

    option3.append("label")
    .attr("class","label_1")
    .attr("for","partly_vaccinated")
    .text("People vaccinated with atleast one dose");

    //adds a div element to store the option selected by user
    d3.select(".select-box1")
    .append("div")
    .attr("class","selected_2")
    .text("People fully vaccinated")

    //adds svg element required for adding the legend for the map
    right_column.append("div")
                    .append("svg")
                    .attr("id","instructions")
                    .attr("width",300)
                    .attr("height",80)
                    .attr("transform","translate(20,-200)");

    //adds text element which insturct users on how to use the legend
    d3.select("#instructions")
        .append("text")
        .style("color","black")
        .style("font-weight","bold")
        .attr("x",20)
        .attr("y",30)
        .append('tspan')
            .text("Place mouse over a")
        .attr("x",20)
        .attr("y",30)
        .append('tspan')
            .text("legend box to see countries ")
            .attr("x",20)
            .attr("y",50)
        .append('tspan')
        .text("in that vaccination category")
            .attr("x",20)
            .attr("y",70);

    right_column.append("div")
    .append("svg")
    .attr("id","legend")
    .attr("width",300)
    .attr("height",450)
    .attr("transform","translate(20,-180)");
}

//to call the overview() which is displayed as default in the dashboard
overview();