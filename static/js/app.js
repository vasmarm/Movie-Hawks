
var movies = [];
var actorArr = [];
var genreDisplay = ['Crime', 'Action', 'Adventure', 'Thriller', 'Fantasy', 'Family', 'Science                           Fiction', 'Horror', 'Drama', 'Romance', 'Comedy', 'Animation', 'Mystery',                         'Music', 'Western', 'War', 'Foreign', 'History', 'Documentary'];
var monthDisplay = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',                                            'Sep', 'Oct', 'Nov', 'Dec'];
var selectedYear, selectedMonth, selectedGenre, selectedDirector, selectedActor;
/*
 * Initialize Function Defination
 */
var initialize = function(){
    
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
                            getActorList();
                            fillYearDropdown();
                            fillMonthDropdown();
                            fillGenreDropdown();
                            fillDirectorDropdown();
                            fillActorDropdown();
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

function fillActorDropdown(){

    var div = document.getElementById("actor-dropdown");
    for(var i = 0; i < actorArr.length; i++) {
        var opt = actorArr[i];
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

/*
 * Putting All the Actors in a single list
 *
*/
function getActorList(){
    var slicedActor;
    var tempActorArray = [];
    var tempActorNames = [];
    movies.forEach((result) => {
        var tempActorString = result.actor;
        slicedActor = tempActorString.split(",");
        tempActorArray.push(slicedActor);
    });
    tempActorNames = tempActorArray.reduce((acc, val) => acc.concat(val), []);
    $.each(tempActorNames, function(i, el){
        if($.inArray(el, actorArr) === -1) actorArr.push(el);
});
}

/*
 * Code To Navigate Between The Tabs
 *
*/
$(document).ready(function(){

    $("#trending-graph").show();
    $("#ratings-graph").hide();
    $("#genre-graph").hide();
    $("#financial-graph").hide();

    $("#trending").css("font-weight", "bold");
    $("#trending").css("color", "red");
    $("#ratings").css("color", "blue");
    $("#financial").css("color", "blue");
    $("#genre").css("color", "blue");
    
    $("#trending").css({"font-size": "20px"});

    $(".modal").show();

    

    $("#financial").click(function() {
        $("#trending-graph").hide();
        $("#ratings-graph").hide();
        $("#genre-graph").hide();
        $("#financial-graph").show();
        $("#financial").css("font-weight", "bold");
        $("#trending").css("font-weight", "normal");
        $("#ratings").css("font-weight", "normal");
        $("#genre").css("font-weight", "normal");
        $("#financial").css("color", "red");
        $("#trending").css("color", "blue");
        $("#ratings").css("color", "blue");
        $("#genre").css("color", "blue");

        $("#financial").css({"font-size": "20px"});
        $("#trending").css({"font-size": "16px"});
        $("#genre").css({"font-size": "16px"});
        $("#ratings").css({"font-size": "16px"});
    });

    $("#ratings").click(function() {
        $("#trending-graph").hide();
        $("#financial-graph").hide();
        $("#genre-graph").hide();
        $("#ratings-graph").show();

        $("#ratings").css("font-weight", "bold");
        $("#trending").css("font-weight", "normal");
        $("#financial").css("font-weight", "normal");
        $("#genre").css("font-weight", "normal");

        $("#ratings").css("color", "red");
        $("#trending").css("color", "blue");
        $("#financial").css("color", "blue");
        $("#genre").css("color", "blue");

        $("#ratings").css({"font-size": "20px"});
        $("#trending").css({"font-size": "16px"});
        $("#genre").css({"font-size": "16px"});
        $("#financial").css({"font-size": "16px"});
    });

    $("#trending").click(function() {
        $("#genre-graph").hide();
        $("#financial-graph").hide();
        $("#ratings-graph").hide();
        $("#trending-graph").show();

        $("#trending").css("font-weight", "bold");
        $("#genre").css("font-weight", "normal");
        $("#financial").css("font-weight", "normal");
        $("#ratings").css("font-weight", "normal");

        $("#trending").css("color", "red");
        $("#genre").css("color", "blue");
        $("#financial").css("color", "blue");
        $("#ratings").css("color", "blue");

        $("#trending").css({"font-size": "20px"});
        $("#financial").css({"font-size": "16px"});
        $("#genre").css({"font-size": "16px"});
        $("#ratings").css({"font-size": "16px"});
    });

    $("#genre").click(function() {
        $("#trending-graph").hide();
        $("#financial-graph").hide();
        $("#ratings-graph").hide();
        $("#genre-graph").show();

        $("#genre").css("font-weight", "bold");
        $("#trending").css("font-weight", "normal");
        $("#financial").css("font-weight", "normal");
        $("#ratings").css("font-weight", "normal");

        $("#genre").css("color", "red");
        $("#trending").css("color", "blue");
        $("#financial").css("color", "blue");
        $("#ratings").css("color", "blue");

        $("#genre").css({"font-size": "20px"});
        $("#trending").css({"font-size": "16px"});
        $("#financial").css({"font-size": "16px"});
        $("#ratings").css({"font-size": "16px"});
    });

    $("#submit").click(function() {
        var year = document.getElementById("year-dropdown");
        selectedYear = year.options[year.selectedIndex].value;

        var month = document.getElementById("month-dropdown");
        selectedMonth = month.options[month.selectedIndex].value;

        var genre = document.getElementById("genre-dropdown");
        selectedGenre = genre.options[genre.selectedIndex].value;

        var director = document.getElementById("director-dropdown");
        selectedDirector = director.options[director.selectedIndex].value;

        var actor = document.getElementById("actor-dropdown");
        selectedActor = actor.options[actor.selectedIndex].value;

        console.log(selectedYear);
        console.log(selectedMonth);
        console.log(selectedGenre);
        console.log(selectedDirector);
        console.log(selectedActor);
    });
});