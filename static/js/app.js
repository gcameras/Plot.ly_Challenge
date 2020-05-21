//Initialize page
(async function() {
    var data = await d3.json("./samples.json");
    console.log(data);
    populateDropdown(data.names);
    buildBarChart(data.samples[0]);
    buildBubbleChart(data.samples[0]);
    buildDemoInfo(data.metadata[0]);
    buildGauge(data.metadata[0]);
})();

// Function to populate dropdown with list of IDs
function populateDropdown(name) {
    var dropDown = d3.select("#selDataset")
    name.forEach(id => {
        dropDown.append("option")
            .property("value", id)
            .property("text", id)
    })
};

///**** HORIZONTAL BAR CHART FUNCTION ****///
function buildBarChart(data) {

    // Define variables
    sample_values = data.sample_values.slice(0, 10).reverse()
    otu_ids = data.otu_ids
    otu_labels = data.otu_labels.slice(0, 10).reverse()

    // Create the trace
    var trace1 = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: 'h'
    };

    // Set the variable to plot
    var plotData = [trace1]

    // Set the layout
    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { type: "category" }
    };

    //Plot using plotly
    Plotly.newPlot("bar", plotData, layout);
};


///**** BUBBLE CHART ****///
function buildBubbleChart(data) {

    // Define variables
    sample_values = data.sample_values
    otu_ids = data.otu_ids
    otu_labels = data.otu_labels

    // Create the trace
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        marker: {
            color: otu_ids,
            size: sample_values
        },
        text: otu_labels,
        mode: "markers",
    };

    // Set the variable to plot
    var plotData = [trace1]

    // Set the layout
    var layout = {
        title: 'OTU ID Sample Values',
    };

    //Plot using plotly
    Plotly.newPlot("bubble", plotData, layout);
};

///**** POPULATE DEMOGRAPHIC INFO ****///
function buildDemoInfo(data) {
    var demoBox = d3.select("#sample-metadata");
    Object.entries(data).forEach(([key, value]) => {
        var row = demoBox.append("p");
        row.text(`${key}: ${value}`);
    })
};

///**** BUILD GAUGE ****///
function buildGauge(data) {
    // Define the variable
    var w_freq = data.wfreq

    //Plot the data
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: w_freq,
        title: { text: "Belly Button Washing Frequency</b><br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            steps: [
                { range: [0, 1], color: "white" },
                { range: [1, 2], color: "snow" },
                { range: [2, 3], color: "honeydew" },
                { range: [3, 4], color: "mintcream" },
                { range: [4, 5], color: "aliceblue" },
                { range: [5, 6], color: "whitesmoke" },
                { range: [6, 7], color: "seashell" },
                { range: [7, 8], color: "lavenderblush" },
                { range: [8, 9], color: "mistyrose" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 490
            }
        }
    }];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}

// Function to change when a new ID is selected from drop down
async function optionChanged(data) {
    var data = await d3.json("./samples.json");
    console.log(data);
    var selectID = d3.select("#selDataset").node().value;
    var idSample = data.samples.filter(row => {
        return row.id == selectID
    })[0]
    var idDemo = data.metadata.filter(row => {
        return row.id == +selectID
    })[0]
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    buildBarChart(idSample);
    buildBubbleChart(idSample);
    buildDemoInfo(idDemo);
    buildGauge(idDemo);
};