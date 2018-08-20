
// Grab a reference to the dropdown select element
var title = [];
var budget = [];
var director = [];
var year = [];
var actor = [];
var ratings = [];
var earnings = [];
var genre = ['Crime', 'Action', 'Adventure', 'Thriller', 'Fantasy', 'Family', 'Science Fiction',                'Horror', 'Drama', 'Romance', 'Comedy', 'Animation', 'Mystery', 'Music', 'Western',                'War', 'Foreign', 'History', 'Documentary'];
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',             'October', 'November', 'December'];
var production = [];
var awards = [];
var rated = [];
var releaseDate = [];
var roi = [];
/*
 * Initialize Function Defination
 */
function initialize(){
    
    url = "http://www.omdbapi.com/?apikey=e6767b7c&t="
    // Use the list of sample names to populate the select options
    d3.json("/data").then(response => {
        console.log(response);
        response.forEach((response) => {
            title = response.title;
            budget.push(response.budget);
            try{
                d3.json(url + title)
                .then(function(data) {
                    director.push(data.Director);
                    year.push(data.Year);
                    actor.push(data.Actors);
                    ratings.push(data.Ratings);
                    earnings.push(data.BoxOffice);
                    production.push(data.Production);
                    awards.push(data.Awards);
                    rated.push(data.Rated);
                })
                .finally(function() { 
                    try{
                        for(var i=0; i<budget.length; i++){
                            roi.push((Number(earnings[i].replace(/[^0-9.-]+/g,""))) - budget[i] / (Number(earnings[i].replace(/[^0-9.-]+/g,"")))); 
                        }
                        fillYearDropdown();
                        fillMonthDropdown();
                        fillGenreDropdown();
                        fillDirectorDropdown();
                        printData(); 
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
function fillYearDropdown(){
    var select = document.getElementById("year"); 
    for(var i = 0; i < year.length; i++) {
        var opt = year[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function fillMonthDropdown(){
    console.log(month);
    var select = document.getElementById("month"); 
    for(var i = 0; i < month.length; i++) {
        var opt = month[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function fillGenreDropdown(){
    var select = document.getElementById("genre"); 
    for(var i = 0; i < genre.length; i++) {
        var opt = genre[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function fillDirectorDropdown(){
    var select = document.getElementById("director"); 
    for(var i = 0; i < director.length; i++) {
        var opt = director[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}
function printData(){
    console.log(roi);
    console.log(director);
    console.log(year);
    console.log(actor);
    console.log(ratings);
    console.log(earnings);
    console.log(genre);
    console.log(production);
    console.log(awards);
    console.log(rated);
    console.log(month);
    console.log("--------------"); 
    title = [];
    budget = [];
    director = [];
    year = [];
    actor = [];
    ratings = [];
    earnings = [];
    production = [];
    awards = [];
    rated = [];
    releaseDate = [];
    roi = [];
}