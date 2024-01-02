/*This file is used to store and retireve the data chosen by users while navigating the dashboard 
as well as assign values to variables that will be required later on in the program */

//Initialising variables and maps required
var groupedDatedLocation = "";
const graph_map = new Map();
const graph_colors = new Map();
const impact_map = new Map();

//Setting up the projection required for the choropleth map
const projection = d3.geoMercator()
                        .scale(150)
                        .center([0,20])
                        .translate([530, 430]);

// Data and color scale for the map and legend
const colors = ["#cc0000","#fa7921","#e8aa14","#91cb3e","#457800","#174a00","#001a00"];
const color_labels = ["red","orange","yellow","neon_green","forest_green","dark_green","blackish"]

const colorScale = d3.scaleThreshold()
                        .domain([10,20,40,60,70,90])
                        .range(colors);

const colorScale2 = d3.scaleThreshold()
                        .domain([10,20,40,60,70,90])
                        .range(color_labels);

const colors1 = ["#001a00","#174a00","#457800","#91cb3e","#e8aa14","#fa7921","#cc0000","#ffffff"];
const color_map = new Map();
color_map.set("#ffffff","white")
            .set("#cc0000","red")
            .set("#fa7921","orange")
            .set("#e8aa14","yellow")
            .set("#91cb3e","neon_green")
            .set("#457800","forest_green")
            .set("#174a00","dark_green")
            .set("#001a00","blackish");




//adding scale for the color gradient in map and for legend
const scale = [10,20,40,60,70,90];
//const legend_labels = ["No Data Available","<10", "10 - 19", " 20 - 39", "40 - 59", "60 - 69", "70 - 89", ">90"];
const legend_labels = [">90","70 - 89","60 - 69","40 - 59","20 - 39","10 - 19","<10","No Data Available"];

//Assigning variables for width and height for the line graph and bar chart
var graph_width = 1250;
var graph_height = 730; 

//function to get a random integer between 0 and 255
function getRandomInteger() {
    return Math.floor(Math.random() * 255) + 1;
}

//generate an array (the size of the list of locations in our dataset) of distinct colors  
let getColorSet = function(){

    var graphColorSet = new Set();
    while(graphColorSet.size < locations.total_locations){
        color = "rgb("+getRandomInteger()+","+getRandomInteger()+","+getRandomInteger()+")";
        if(color !== "rgb(255,255,255)" )
            graphColorSet.add(color);
    }
    return Array.from(graphColorSet);
}

//to store and retrieve the option chosen by user from drop down menu in Oveview option 
let map_selected_option = {
    option: "People fully vaccinated",
    get chosen_option(){
        return this.option;
    },
    set chosen_option(new_option){
        this.option = new_option;
    }
}

//to store and retireve map data and topology 
let map_features = {
    topo: "",
    data: "",
    get map_topo(){
        return this.topo;
    },
    get map_data(){
        return this.data;
    },
    set map_topo(topo){
        this.topo = topo;
    },
    set map_data(data){
        this.data = data;
    }
}

//to store and retrieve option chosen by user in Vaccination Program option
let dist_graph_selected_option = {
    option: "Daily vaccinations administered",
    get chosen_option(){
        return this.option;
    },
    set chosen_option(option){
        this.option = option;
    }
}

//to store and retrieve the set of locations as well as the locations chosen by user in Vaccination Program option
let locations = {
    locations: "",
    size: "",
    selected: ['World'],
    get all_locations(){
        return this.locations;
    },
    get total_locations(){
            return this.size;
    },
    get selected_locations(){
            return this.selected;
    },
    set all_locations(locations){
        this.locations = locations;
    },
    set total_locations(size){
            this.size = size;
    },
    set selected_locations(selected){
            this.selected = selected;
    }
}

//to store and retrieve the location chosen by user from drop down menu in Impact of Vaccination option 
let impact_locations = {
    option: "World",
    get chosen_option(){
        return this.option;
    },
    set chosen_option(option){
        this.option = option;
    }
}

//to store and retireve the data chosen by user to be displayed from drop down menu in Impact of Vaccination option  
let impact_graph_selected_option = {
    option: "Confirmed Cases with people vaccinated",
    get chosen_option(){
        return this.option;
    },
    set chosen_option(option){
        this.option = option;
    }
}



