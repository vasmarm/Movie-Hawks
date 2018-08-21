var movies = [];

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
    });
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