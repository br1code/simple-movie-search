const express = require("express");
const request = require("request");

const port = process.env.PORT || 3000;

var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/results", (req, res) => {
    let movieName = req.query.movieName;
    let url = `http://www.omdbapi.com/?apikey=thewdb&s=${movieName}`;
    request(url, (error, response, body) => {
        let data = JSON.parse(body);
        if (!data.Error && response.statusCode === 200) {
            let moviesList = data.Search;
            res.render("results",{
                movies: moviesList,
                search: movieName
            });
        } else {
            res.redirect("/");
        }
    });
});


app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});