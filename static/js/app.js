

// Grab a reference to the dropdown select element
var selector = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("/data").then(response => {
    console.log(response);
    response.forEach((myData) => {
    selector
      .append("option")
      .text(myData)
      .property("value", myData);
  });
});