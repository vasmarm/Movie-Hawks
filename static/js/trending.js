

// console.log(movies);

// yearFilter = '2009'

// var result = movies.filter(year => year.year = yearFilter);

// console.log(result);
// // Declare empty arrays to store ratings
// var imdb_scores = []
// var rotten_scores = []
// var meta_scores = []

// // push ratings to appropriate arrays
// for (i = 0; i < ratings.length; i++) {
//     imdb_scores.push(parseFloat(ratings[i][0].Value))
//     rotten_scores.push(parseFloat(ratings[i][1].Value))
//     meta_scores.push(parseFloat(ratings[i][2].Value))
// };

// // plot setup
// var trace_imdb = {
//     x: movies,
//     y: imdb_scores.map(function (x) {return x*10}),
//     name: 'IMDB',
//     type: 'bar',
//     };
    
// var trace_rotten = {
//     x: movies,
//     y: rotten_scores,
//     name: 'Rotten Tomatoes',
//     type: 'bar'
// };

// var trace_meta = {
//     x: movies,
//     y: meta_scores,
//     name: 'Metacritic',
//     type: 'bar'
// };

// var data = [trace_imdb, trace_rotten, trace_meta];


// var layout = {
//     barmode: 'group',
//     title: 'Highest Rated Movies Released in Last Two Months',
//     xaxis: {
//     tickangle: -45
//     },
//     yaxis: {
//         title: "Viewer Rating"
//     }
// };

// // plot
// Plotly.newPlot('bar-plot', data, layout);