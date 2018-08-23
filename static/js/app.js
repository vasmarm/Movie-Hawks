var movies = [];
var movies_filtered = [];
// arrays to hold data for plotly

var actors = []
var awards = []
var budgets = []
var directors = []
var genres = []
var months = []
var ratings = []
var releaseDates = []
var revenues = []
var rois = []
var titles = []
var years = []

var imdb_scores = []
var rotten_scores = []
var meta_scores = []

var number_awards = []
// filter placeholders
yearFilter = ""
monthFilter = ""
genreFilter = ""
actorFilter = ""
directorFilter = ""

// Grab a reference to the dropdown select element
// var title = [];
// var director = [];
// var year = [];
// var actor = [];
// var ratings = [];
var genreDisplay = ['Crime', 'Action', 'Adventure', 'Thriller', 'Fantasy', 'Family', 'Science                           Fiction', 'Horror', 'Drama', 'Romance', 'Comedy', 'Animation', 'Mystery',                         'Music', 'Western', 'War', 'Foreign', 'History', 'Documentary'];
var monthDisplay = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',                                            'Sep', 'Oct', 'Nov', 'Dec'];
// var production = [];
// var awards = [];
// var rated = [];
// var releaseDate = [];
// var roi = [];
// var genre = [];
// var month = [];
// var budget = [];
// var revenue = [];


/*
 * Initialize Function Defination
 */
function initialize(){
    
    url = "http://www.omdbapi.com/?apikey=e6767b7c&t="
    // Use the list of sample names to populate the select options
    d3.json("/data").then(response => {
        var respLength = response.length;
        response.forEach((response) => {
            var movie = {};
            movie.title = response.title;
            movie.revenue = response.revenue;
            movie.budget = response.budget;
            movie.releaseDate = response.release_date;
            var currentROI = (response.revenue - response.budget) / (response.budget);
            movie.roi = currentROI;
            var currentTitle = response.title;
            try{
                d3.json(url + currentTitle)
                .then(function(data) {
                    movie.director = data.Director;
                    movie.actor = data.Actors;
                    movie.year = data.Year;
                    movie.ratings = data.Ratings;
                    movie.awards = data.Awards;
                    movie.genre = data.Genre;
                    movie.director = data.Director;
                    movie.month = data.Released.slice(3,6);
                    movies.push(movie);
                })
                .finally(function() { 
                    try{
                        if (movies.map(d => d.director).length === respLength) {
                            fillYearDropdown();
                            fillMonthDropdown();
                            fillGenreDropdown();
                            fillDirectorDropdown();
                            filter();
                            format();
                            separate_ratings();
                            extract_awards();
                            
                            trending();
                            
                            threed_scatter();
                            
                            bubble();
                        }
                        // printData(); 
                    }
                    catch(TypeError){
                        console.log("Type Error Caught!");
                    }
                });
            }
            catch(TypeError){
                console.log("Movie Data Not Found!")
            }  
        });
    })
}

/*
 * Calling initialize function
 */
initialize();




/*
 * Filling Up Several Dropdowns
 */
function fillYearDropdown(){
    var div = document.getElementById("year-dropdown");
    yearList = movies.map(d => d.year)
    for(var i = 0; i < yearList.length; i++) {
        var opt = yearList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el.className = "dropdown-item";
        div.appendChild(el);
    }
}

function fillMonthDropdown(){
    var div = document.getElementById("month-dropdown");
    for(var i = 0; i < monthDisplay.length; i++) {
        var opt = monthDisplay[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el.className = "dropdown-item";
        div.appendChild(el);
    }
}

function fillGenreDropdown(){
    var div = document.getElementById("genre-dropdown");
    for(var i = 0; i < genreDisplay.length; i++) {
        var opt = genreDisplay[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el.className = "dropdown-item";
        div.appendChild(el);
    }
}

function fillDirectorDropdown(){
    var div = document.getElementById("director-dropdown");
    dirList = movies.map(d => d.director)
    for(var i = 0; i < dirList.length; i++) {
        var opt = dirList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el.className = "dropdown-item";
        div.appendChild(el);
    }
}
function printData(){
    console.log(director);
    console.log(year);
    console.log(actor);
    console.log(ratings);
    console.log(production);
    console.log(awards);
    console.log(rated);
    console.log(roi);
    console.log("--------------"); 
}


$(".director-dropdown").on('click', 'li a', function(){
    $(this).parent().parent().siblings(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
    $(this).parent().parent().siblings(".btn:first-child").val($(this).text());
});

function filter() {
    movies_filtered.push(movies.filter(movies => movies.year.includes(yearFilter) && movies.month.includes(monthFilter) && movies.genre.includes(genreFilter) && movies.director.includes(directorFilter)))
}

function format() {
    for (let i = 0; i < movies_filtered[0].length; i++) {
        actors.push(movies_filtered[0][i].actor)
        awards.push(movies_filtered[0][i].awards)
        budgets.push(movies_filtered[0][i].budget)
        directors.push(movies_filtered[0][i].director)
        genres.push(movies_filtered[0][i].genre)
        months.push(movies_filtered[0][i].month)
        ratings.push(movies_filtered[0][i].ratings)
        releaseDates.push(movies_filtered[0][i].releaseDate)
        revenues.push(movies_filtered[0][i].revenue)
        rois.push(movies_filtered[0][i].roi)
        titles.push(movies_filtered[0][i].title)
        years.push(movies_filtered[0][i].year)
    };
}

function separate_ratings() {
    for (i = 0; i < ratings.length; i++) {
        imdb_scores.push(parseFloat(ratings[i][0].Value))
        rotten_scores.push(parseFloat(ratings[i][1].Value))
        meta_scores.push(parseFloat(ratings[i][2].Value))
    };};

function extract_awards() {
    for (var i = 0; i < awards.length; i++) {
        var numbers = []
        var numbers = awards[i].match(/\d+/g).map(Number)
        var sum = 0
        for (var j = 0; j <numbers.length; j++) {
        sum += numbers[j]
        } 
         number_awards.push(sum)
      };
}

function trending() {
// plot setup
    var trace_imdb = {
        x: titles,
        y: imdb_scores.map(function (x) {return x*10}),
        name: 'IMDB',
        type: 'bar',
        };
        
    var trace_rotten = {
        x: titles,
        y: rotten_scores,
        name: 'Rotten Tomatoes',
        type: 'bar'
    };

    var trace_meta = {
        x: titles,
        y: meta_scores,
        name: 'Metacritic',
        type: 'bar'
    };

    var data = [trace_imdb, trace_rotten, trace_meta];


    var layout = {
        barmode: 'group',
        title: 'Highest Rated Movies Released in Last Two Months',
        xaxis: {
        tickangle: -45
        },
        yaxis: {
            title: "Viewer Rating"
        }
    };

    // plot
    Plotly.newPlot('bar-plot', data, layout);

}

function threed_scatter() {
    var average_scores = []

    for (i = 0; i < ratings.length; i++) {
        average_scores.push(((imdb_scores[i] * 10) + rotten_scores[i] + meta_scores[i])/3)        
        }
    
    var trace1 = {
        x: average_scores, y: rois, z: number_awards,
        mode: 'markers',
        text: titles,
        marker: {
            size: 12,
            line: {
            color: 'black',
            width: 0.5
        },
            opacity: 0.8},
        type: 'scatter3d'
    };
    

    var layout = {
        scene: {
            xaxis:{title: 'Viewer Rating'},
            yaxis:{title: 'Return on Investment'},
            zaxis:{title: 'Number of Awards and Nominations'},
            },
        autosize: true,
        tickangle: -95,
        margin: {
         l: 0,
         r: 0,
         b: 50,
         t: 50,
         pad: 4
        },
    };

    Plotly.newPlot('3d_scatter', [trace1], layout);
}

function bubble() {
    var average_scores = []

    for (i = 0; i < ratings.length; i++) {
        average_scores.push(((imdb_scores[i] * 10) + rotten_scores[i] + meta_scores[i])/3)        
        }
    

    var trace1 = {
        x: average_scores,
        y: rois,
        text: titles,
        mode: 'markers',
        marker: {
          size: number_awards.map(function (x) {return x*0.75})
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Average Viewer Rating vs ROI',
        showlegend: false,
        height: 600,
        width: 600,
        yaxis: {
            title: "Viewer Rating"
        },
        xaxis: {title: "Average Viewer Score"},
        yaxis: {title: "Return on Investment"}
      };
      
      Plotly.newPlot('bubble', data, layout);
}