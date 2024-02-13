//This file is used to read the required data sets

//reading the data set for the world map
d3.csv("https://raw.githubusercontent.com/LakshmiThandayaan/Covid-19-Vaccinations/main/code/vaccination-data.csv",function(d){
    const vaccine_data =   {country: d.COUNTRY, code: d.ISO3, fully_vaccinated: d.PERSONS_LAST_DOSE, 
        fully_vaccinated_per100: d.PERSONS_LAST_DOSE_PER100, partly_vaccinated: d.PERSONS_VACCINATED_1PLUS_DOSE, 
        partly_vaccinated_per100: d.PERSONS_VACCINATED_1PLUS_DOSE_PER100, booster: d.PERSONS_BOOSTER_ADD_DOSE,
        booster_per100: d.PERSONS_BOOSTER_ADD_DOSE_PER100};
    return vaccine_data;
}).then(function(data){
    /*calling this function for reading the json file with oultines for each country 
    and also to initally add the map and also */
    world_map(data);
})

//the headings for maps are also added
map_options();

//reading the csv file for the line graph and bar chart
d3.csv("https://raw.githubusercontent.com/LakshmiThandayaan/Covid-19-Vaccinations/main/code/owid-covid-data.csv./owid-covid-data.csv",function(d){
    const data = {date: d3.timeParse("%Y-%m-%d")(d.date), nonFormatedDate: d.date, location: d.location, new_cases: parseFloat(d.new_cases_smoothed), 
        new_deaths: parseFloat(d.new_deaths_smoothed), total_vaccinations: parseFloat(d.total_vaccinations_per_hundred), new_vaccinations: parseFloat(d.new_vaccinations_smoothed_per_million), 
        total_people_vaccinated: parseFloat(d.people_vaccinated_per_hundred), new_people_vaccinated: parseFloat(d.new_people_vaccinated_smoothed_per_hundred),
        total_people_fully_vaccinated: parseFloat(d.people_fully_vaccinated_per_hundred), total_boosters: parseFloat(d.total_boosters_per_hundred)};
    return data;
}).then(function(data){
    //grouping data based on locations
    const groupedLocations = d3.group(data, d => d.location);
    //grouping data based on locations and date
    groupedDatedLocation = d3.group(data, d => d.location, d => d.nonFormatedDate);
    //getting list of all locations and total number of locations
    locations.all_locations = Array.from(groupedLocations.keys());
    locations.total_locations = groupedLocations.size; 
    //setting up maps to make it easier to get data later on in the program
    for(var i=0; i < groupedLocations.size; i++){
        var key = locations.all_locations[i];
        var value = d3.filter(groupedLocations.get(key), d=> !isNaN(d.new_vaccinations));
        //mapping a location to an array of all data for that location
        graph_map.set(key, value);

        //mapping a location to a color for the line graph
        graph_colors.set(key, getColorSet()[i]);
    }

})
