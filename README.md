# Covid-19 Vaccination Dashboard

I have developed this dashboard of interactive visualizations using the d3 library of JavaScript to help analyze the impact the vaccinations have had
on the spread of the virus and the global disparity in vaccine distribution.

## Data Visualizations
This Covid-19 Vaccination dashboard consists of 3 visualizations:

1. The first visualization is of a choropleth map of the world based on the percentage of people vaccinated in each country. Users have the choice to view the map for the people who has received at least one dose of the vaccination, completed the initial vaccination protocol or received a booster dose. This gives users an overview of the vaccination program. It helps them understand the current vaccination status of each country and also identify countries that have not been able to vaccinate even 20% of the population.

2. The second visualization is of a line graph of the vaccinations administered over time. Users have the option to see the graph for Daily Covid-19 vaccination doses administered, Total Covid-19 Vaccination Doses Administered, Daily number of people receiving a first Covid-19 vaccination dose, Total number of people receiving a first Covid-19 vaccination dose, Total number of people who have completed the initial Covid-19 vaccination protocol (i.e., received both the Covid-19 vaccination doses) and Total Covid-19 booster
doses administered. Users also have the option to compare the vaccination program of different locations. This helps them compare the vaccination progress made by each country over time.

3. The third visualization is of a bar chart displaying the weekly Covid-19 cases. The bars of the chart are given different colors based on the percentage of the populations that has been vaccinated up until that week. A legend is provided along with the chart to make it easier for users to understand the meaning behind the colors for the bars. Users can choose to see the bar chart for weekly Covid-19 cases with the colors based on percentage of population vaccinated with one dose of the vaccination, completed the initial vaccination protocol or received a booster dose and also the weekly Covid-19 deaths with the colors based on percentage of population vaccinated with one dose of the vaccination, completed the initial vaccination protocol or received a booster dose. Users can also choose to see the bar chart for different locations using a drop down menu provided right next to the bar chart. This helps users evaluate the effect of vaccinations on Covid-19 cases and deaths.

## User Guidelines

The dashboard has been designed in the following manner:

<figure align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/16c018e4-fb27-42e3-8696-9b2d5cc63ae9" >
</figure>


Users can navigate the dashboard using the navigation bar. It consist of the clickable options ’Overview’ and ’Vaccination Program’.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/d435cec0-a891-4ae3-b38b-6573f48318dc">
</p>

### Overview
As default when the dashboard is opened the ’Overview’ option is activated and will display a choropleth map of the world showing the percentage of people who has completed the initial vaccination protocol in each country will be displayed. This can be seen in the figure below.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/7b826ad9-6e1d-4f8a-991e-0f53d3a1fe7d" width=75% height=75%>
</p>

When users have their mouse over any country in the map, the country name, absolute number of people vaccinated in the country and percentage of people vaccinated in the country will be displayed in a small pop-up box. The figure below shows the data displayed for United Kingdom.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/856fdc72-7259-4eac-8444-b19ed9dce52a">
</p>

Users can choose to view the map for people who have received at least one dose of the vaccination, people who have completed the initial vaccination protocol and people who have taken the booster dose using the drop down menu in the ’Overview’ option. The figure below shows this drop down menu.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/c48cc9e8-c309-4130-b4f4-1ab6e74b2d46">
</p>

The legend displayed along with the map gives the link between the colors allocated to each country and the percentage of the population that has been vaccinated in that country. The figure below shows the legend for the map displaying the percentage of the population that has completed the primary vaccination series.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/4372cef7-83af-45d4-849b-45ee639f4e75" width=25% height=25%>
</p>

The legend given along with the map is interactive. When users place their mouse over any box in the map, the countries corresponding to that category in the map is displayed. The figure below shows the map highlighting all the countries where the percentage of population that has received a booster dose is less than 10, when the mouse is over the red box in the legend.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/ca301f6b-9903-4b45-9de5-bae03e4cc973">
</p>

The maps can also be zoomed in and out using the scroll options in the mouse. Zooming in can also be done by doubling clicking on the portion of the map you want to zoom into. Users can also pan the map by clicking and dragging in a specific direction. This allows more mobility within the map, hence making it easier for users to investigate and analyze smaller countries in the map. The figure below shows the map zoomed into United Kingdom.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/c667b2fa-9eb4-44cc-8ae3-c7cc16303270" width=50% height=50%>
</p>

### Vaccination Program
When the ’Vaccination Program’ option in the navigation bar is clicked, the interface changes. The interface displayed can be seen in the figure below:

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/246436db-15ea-4ad2-afa8-463f4f9ef827">
</p>

A line graph displaying the daily number of Covid-19 vaccination doses administered in the world is displayed. If the user places the mouse at any point inside the graph, the date and the number of vaccinations administered that day is displayed in a pop-up box. This can be seen in the figure below.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/e890558e-6001-4bfd-b419-fbf3fbaf9419">
</p>

Users can choose to see the graph for Daily Covid-19 vaccinations administered, Cumulative vaccinations administered, Daily number of people receiving a first Covid-19 vaccination dose, Total number of people who received at least one dose of vaccination, Total number of people who finished the initial vaccination protocol and Total Covid-19 boosters administered using a drop down menu right next to the graph. The figure below shows this drop down menu. The figure below shows this drop down menu.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/cc6f19c0-cece-4dde-8587-3789079997e4">
</p>

Users can choose to compare the vaccination distribution in different locations from the list of locations right next to the graph. The figure below shows the list of locations.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/8b8487d6-910d-4751-9494-3f6161253ab4)">
</p>

The figure below shows the graph when the locations Asia, Europe and Africa are chosen.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/039a9d02-1f05-4a09-ab51-601aee073379">
</p>

### Impact of Vaccinations

When the ’Impact of Vaccinations’ option in the navigation bar is clicked, the interface changes. The interface displayed can be seen in the figure below:

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/87ff2538-07a1-44b0-8d43-3f40272b3ba2">
</p>

A bar chart displaying the weekly number of confirmed cases of Covid-19 in the world is displayed. The bars in the chart are colored based on when the percentage of the population received at least one dose of the Covid-19 vaccine. If the user places the mouse on any of the bars in graph, the location, date, number of Covid-19 cases or deaths and percentage of population vaccinated at that point of time will be displayed in a pop-up box. This can be seen in the figure below.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/82f8f5cb-bbc0-4bda-b0ba-6ef052345119">
</p>

Users can choose to see the bar graph for weekly Covid-19 cases and deaths with colors for the bars based on percentage of the population that has received at least one dose of the vaccination, percentage of the population that has completed the initial vaccination protocol and percentage of the population that has received a booster dose using a drop down menu right next to the bar graph. The figure below shows this drop down menu.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/3c9cb1ca-68f1-446b-bf6b-8b461ba0a635" width=25% height=25%>
</p>

Users can also choose to see the bar graph for different countries, continents and income categories using another drop down menu right next to the bar graph. The figure below shows this drop down menu.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/2243cc13-1b11-4064-be1f-2191a2c29c99" width=25% height=25%>
</p>

The legend for the bar chart is also given right next to the chart. The figure shows the legend for the bar chart.
<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/003009aa-f6fd-47f6-a9b3-f861cb3a5ea7" width=25% height=25%>
</p>

### Data Sources

The data sources used for developing the visualizations in the dashboard are given when this option in the navigation bar is clicked.

<p align="center">
  <img src="https://github.com/LakshmiThandayaan/Covid-19-Vaccinations/assets/114150775/5ecdff77-1990-4a8d-be20-954c48c8cd3e">
</p>

