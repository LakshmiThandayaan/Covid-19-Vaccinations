//This script file deals with navigations in the interface

//changing headings of the map as well as legend for map based on user choices
let map_headings = function(){
    document.querySelector(".selected_2").innerHTML = map_selected_option.chosen_option;
    if(map_selected_option.chosen_option == "People fully vaccinated"){
        d3.select(".map_title").text("People who have completed the intitial vaccination protocol");
        d3.select("#sub_heading").text("complete primary series");
    }
    else if(map_selected_option.chosen_option == "People vaccinated with atleast one dose"){
        d3.select(".map_title").text("People who have recieved atleast one vaccine dose");
        d3.select("#sub_heading").text("dose of the primary series"); 
    }
    else if(map_selected_option.chosen_option == "People vaccinated with Booster dose"){
        d3.select(".map_title").text("People who have recieved a booster dose");
        d3.select("#sub_heading").text("booster dose"); 
    }
}

//This function deals with changing map based on the option chosen by user from drop down menu in Overview
let map_options = function(){

    const selected = document.querySelector(".selected_2");
    const optionsContainer = document.querySelector(".options-container1");
    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
        d3.select("#legend").transition().duration(100).attr("transform","translate(20,-10)");
        d3.select("#instructions").transition().duration(100).attr("transform","translate(20,-30)");
        var element = document.getElementById(".options-container1");
        if(!(d3.select(".options-container1").classed("active"))){
            d3.select("#instructions").transition().duration(100).attr("transform","translate(20,-200)");
            d3.select("#legend").transition().duration(100).attr("transform","translate(20,-180)");
        }

    });

    optionsList.forEach(o => {
        
        o.addEventListener("click", () => {
            //selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            d3.select("#instructions").transition().duration(100).attr("transform","translate(20,-200)");
            d3.select("#legend").transition().duration(200).attr("transform","translate(20,-180)");
            map_selected_option.chosen_option = o.querySelector("label").innerHTML;
            d3.select("#map").remove();
            draw_map(); 
            map_headings();
        });
    });
}

//This function deals with changing graph based on the option chosen by user from drop down menu in Vaccination Program
let vaccine_dist = function(){

    const selected = document.querySelector(".selected_3");
    const optionsContainer = document.querySelector(".options-container2");
    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
        });

    optionsList.forEach(o => {
            o.addEventListener("click", () => {
                selected.innerHTML = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
                dist_graph_selected_option.chosen_option = o.querySelector("label").innerHTML;
                d3.select("#line_graph").remove();
                dist_graph();
            })
        });

}

//This function deals with changing graph based on the option chosen by user in the checkboxes of locations in Vaccination Program
let vaccine_checkboxes = function(){

    const checkboxes = d3.selectAll('.container3 input[type="checkbox"]');
    checkboxes.on('change', function(){
        const selectedOptions = checkboxes.filter(function(){
        return this.checked;
    }).nodes().map(checkbox => checkbox.parentElement.textContent.trim());
        locations.selected_locations = selectedOptions;
        d3.select("#line_graph").remove();
        dist_graph();
    });

}

//this function changes the legend subheading based on the option chosen by user in Impact of Vaccinations
let impact_legend_subheadings = function(){
    
    if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people vaccinated" ||
        impact_graph_selected_option.chosen_option == "Recorded Deaths with people vaccinated")
        d3.select("#impact_sub_heading").text("dose of the primary vaccine");
    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with people fully vaccinated" ||
            impact_graph_selected_option.chosen_option == "Recorded Deaths with people fully vaccinated")
        d3.select("#impact_sub_heading").text("complete primary series");
    else if(impact_graph_selected_option.chosen_option == "Confirmed Cases with booster doses" ||
        impact_graph_selected_option.chosen_option == "Recorded Deaths with booster doses")
        d3.select("#impact_sub_heading").text("booster dose");

}

//this function changes the graph based on the location chosen by user in Impact of Vaccinations
let impact_countries = function(){

    const selected = document.querySelector(".selected_5");
    const optionsContainer = document.querySelector(".options-container4");
    const optionsList = document.querySelectorAll(".option2");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
        });

    optionsList.forEach(o => {
            o.addEventListener("click", () => {
                selected.innerHTML = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
                impact_locations.chosen_option = o.querySelector("label").innerHTML;
                d3.select("#impact_graph").remove();
                impact_graph();
            })
        });

}

//this function changes the graph based on the type of graph chosen by user in Impact of Vaccinations
let impact_dropdown_menu = function(){

    const selected = document.querySelector(".selected_4");
    const optionsContainer = document.querySelector(".options-container3");
    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
        });

    optionsList.forEach(o => {
            o.addEventListener("click", () => {
                selected.innerHTML = o.querySelector("label").innerHTML;
                optionsContainer.classList.remove("active");
                impact_graph_selected_option.chosen_option = o.querySelector("label").innerHTML;
                d3.select("#impact_graph").remove();
                impact_legend_subheadings();
                impact_graph();
            })
        });

}

//the chosen option in the navigaiton bar is given orange color
const options = d3.selectAll(".nav_option");
options.on("click",function(){
    options.classed("selected",false);
    d3.select(this).classed("selected",true);
}); 

/*the options in the navigation bar are attched with event listeners and when the are clicked the corresponding graphs 
are displayed by calling the required functions*/
const navigationLinks = document.querySelectorAll(".navbar a");
navigationLinks.forEach(link => {
    var choosen_option = "";
    var displayed_option = "";
    link.addEventListener('click', event => {
        
        choosen_option = link.innerText;
        displayed_option = document.querySelector('.selected_1').innerText;
        if(displayed_option == choosen_option){}
        else{
            if(choosen_option == "Overview")
            {
                document.querySelector('.selected_1').innerText = choosen_option;
                d3.select(".vacc_data").remove();  
                overview();
                draw_map();
                map_options();
                map_legend();
                map_headings();
            }
            else if(choosen_option == "Vaccination Program")
            {
                document.querySelector('.selected_1').innerText = choosen_option;
                d3.select(".vacc_data").remove(); 
                daily_vacc();
                dist_graph();
                vaccine_dist();
                vaccine_checkboxes();
                document.querySelector('.selected_3').innerText = dist_graph_selected_option.chosen_option;

            }
            else if(choosen_option == "Impact of Vaccinations")
            {
                document.querySelector('.selected_1').innerText = choosen_option;
                d3.select(".vacc_data").remove(); 
                vacc_impact();
                impact_graph();
                impact_dropdown_menu();
                impact_countries();
                impact_legend();
                document.querySelector('.selected_4').innerText = impact_graph_selected_option.chosen_option;
                document.querySelector('.selected_5').innerText = impact_locations.chosen_option;
            }
            //displays the data sources used for developing the visualizations
            else if(choosen_option == "Data Sources")
            {
                document.querySelector('.selected_1').innerText = choosen_option;
                d3.select(".vacc_data").remove(); 
                d3.select("#dataviz")
                    .append("div")
                    .attr("class","vacc_data")
                    .attr("id","data_source")
                    .html("<p>The data set used for the choropleth map displayed using the 'Overview' option was taken from the" 
                    +"<a href=https://covid19.who.int/?mapFilter=vaccinations> WHO Coronavirus (COVID-19) Dashboard<a>.<br> The data"+
                    " set used for the line graph and bar chart displayed using the 'Vaccination Program' and 'Impact of Vaccinations"
                    +" was taken from the <a href = https://ourworldindata.org/covid-vaccinations>Our World in Data.</p>");
            }
        }
    })
});
