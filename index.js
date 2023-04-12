//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const unsplash = require("./modules/Unsplash/api");
const nytimes = require("./modules/nytimes/api");
const { request } = require("https");
const { response } = require("express");

//Set up express app and port number
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//convert form data to JSON for easier use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//PAGE ROUTES
app.get("/", async (request, response) => {
  //Getting Popular Photos
  let PhotoList = await unsplash.getPopularPhotos();
  //console.log(PhotoList);
  //Getting photos from Search if query exsist
  let SearchList = "";
  let query = request.query.search;

  if (query) {
    SearchList = await unsplash.SearchPhotos(query);
    // SearchList.results.forEach(element => {
    //  console.log(element);
    //});
    // for(var i =0;i< SearchList.results.length;i++){
    //   console.log(SearchList.results[]);

    // }
    // console.log(SearchList.results[1]);
  }

  response.render("index", { title: "Photos", photos: PhotoList, result: SearchList, Keyword: query });
});

app.get("/Photo-Veiw", async (request, response) => {
  let query = request.query.query;
  //console.log(query);
  //Getting images from search
  let id = request.query.id;
  let alt = request.query.alt;
  let SearchList = await unsplash.SearchPhotos(query);
  let PhotoList = await unsplash.getPopularPhotos();
  //getting articles from search
  let news = await nytimes.getArticle(alt);
  //console.log(news.response.docs);
  response.render("photo", { title: "Photo", result: SearchList, picid: id, photos: PhotoList, search: query, newslist: news.response.docs });
});

//Remove functionality
//app.get("/Removed", async (request, response) => {
//let alt = request.query.alt;
//let image = await unsplash.removeimg(request.query.url);
// console.log(image);
// response.render("removed", { title: "Removed", alttext: alt });
//});



//form processing paths
app.post("/submit", async (request, response) => {
  //for a POST form, the data is retrieved through the body
  //request.body.<field_name>
  let query = request.body.search;
  //console.log(query);
  //let SearchList = await unsplash.SearchPhotos(query);
  //console.log(SearchList);
  response.redirect('/?search=' + query);
});


//Set up server listener
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
