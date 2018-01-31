# Assessment 1

First assessment of school subject Front-end 3.

## Steps taken

###### 1. 
My first step was searching for a graph that was similar to the one I wanted to make. I used Mike Bostocks's [bar chart](https://bl.ocks.org/mbostock/3885304). 

###### 2. 
After seeing how the bar chart worked, I tried setting it up with my own data. My data comes from CBS, so I had to make a few adjustments. I stored the columns of the category name as keys with .slice.
```javascript
var keys = data.columns.slice(1);
```
Then, for the rest of the data I sliced off the title and the source. 
```javascript
var data = data.slice(1, data.length-1);
```

###### 3.
I stored the categories as the x0.domain to use as a legend. 
```javascript
  x0.domain(data.map(function(d) { return d.Onderwijssoort; }));
```
Next I used the previously made varable keys to make up the x axis
```javascript
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
 ```
For the y axis, I used a static scale, from 0 to 600.000
```javascript
y.domain([0, 600000]); 
```

###### 4.

I made the legend by adding the attribute transform to the first g. 
```javascript
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.Onderwijssoort) + ",0)"; })
```

Next I selected all the rect, without them existing yet. In here, I wrote a function with the data
as a parameter, and used the .map expression.
```javascript
    .selectAll("rect")
    // function to make a new array where you put the 
    .data(function(d) { 
      return keys.map(function(key) { 
        return {key: key, value: d[key]}; 
      }); 
    })
```

by return keys.map I return the variable keys as a new object. The function key refers to each value in the array.

###### 5.

I made the bars and made them match to the data of my domains. After adding
the attributes x, y, width, height and fill, I gave them each a function to return their values.
```javascript
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });
```

Then I made the g on the x axis and made the location match the width of the bars. 
.call is used to load the dates  into the x axis.
```javascript
  g.append("g")
      .attr("class", "axis", "x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));
```


### The dataset

|Perioden|Totaal middelbaar beroepsonderwijs|Hoger beroepsonderwijs|Wetenschappelijk onderwijs|
|-----|-----|------|----|
|2005/'06|483812|356842|205886|
|2006/'07|496227|366689|208618|
|2007/'08|509642|374802|212713|
|2008/'09|513925|383713|220504|
|2009/'10|522274|403278|233128|
|2010/'11|528009|416629|242345|
|2011/'12|519962|423945|245428|
|2012/'13|510857|421693|241372|
|2013/'14|498108|440293|250186|
|2014/'15|481405|446434|255661|
|2015/'16|476275|442594|261169|
|2016/'17*|483927|446585|267905|
© Centraal Bureau voor de Statistiek, Den Haag/Heerlen 12-10-2017



###### Source of the data

The data can be downloaded at: [cbs](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=71450ned&D1=0&D2=0&D3=0&D4=8,16-17&D5=0&D6=0&D7=5-16&HDR=G1,T,G2,G4,G5,G3&STB=G6&VW=T)

Select:
Onderwijssoort > Middelbaarberoepsonderwijs > totaal middelbaar beroepsonderwijs
Onderwijssoort > Hoger onderwijs > Hoger beroepsonderwijs & Wetenschappelijk onderwijs
Perioden > 2005 - 20016



 ## Features

* [`d3.map`](https://github.com/d3/d3-collection/blob/master/README.md#map) - mapping values in new array
* [`d3.scale`](https://github.com/d3/d3-scale) - visualiation of the abstract data
* [`d3.selection`](https://github.com/d3/d3-selection) - selecting and modifing the html

## Licence 

All the rights go to [Mike Bostock](https://b.locks.org/mbostock) for the [bar chart](https://bl.ocks.org/mbostock/3885304) 
All rights for features used in the library go to[D3](https://d3js.org/). 



