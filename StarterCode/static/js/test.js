// // Submit Button handler
// function handleSubmit() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();

//     // Select the input value from the ID form
//     var ID = d3.select("#selDataset").node().value;
//     console.log(ID);

//     // clear the input value
//     d3.select("#selDataset").node().value = "";

//     // Build the plot with the new stock
//     buildPlot(ID);
// }



// Grab values from the response json object to build the plots
var id = data.names;
var m_id = data.metadata.id;
var m_ethnicity = data.metadata.ethnicity;
var m_gender = data.metadata.gender;
var ma_age = data.metadata.age;
var m_location = data.metadata.location;
var m_bbtype = data.metadata.bbtype;
var m_wfreq = data.metadata.wfreq;
var s_id = data.samples.id;
var s_otu_ids = data.samples.otu_ids;
var s_sample_values = data.samples.sample_values;
var s_otu_labels = data.samples.otu_labels;

console.log(id)
console.log(s_sample_values)

// Convert variables to integers
ma_age = +ma_age
m_wfreq = +m_wfreq
s_sample_values = +s_sample_values

var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UT-MCC-DATA-PT-01-2020-U-C/master/homework-instructions/15-Interactive-Visualizations-and-Dashboards/Instructions/data/samples.json?token=AOITQCEXAGSPKP5RFW6P3GS6ZNEQ2";

sorted_values = s_sample_values
    .sort(function(a, b) { return a - b })
    .slice(0, 10)