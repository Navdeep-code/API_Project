const nytimes = "https://api.nytimes.com/svc/search/v2"; //base URL for any API requests
const apikey = process.env.NYTIMES_API_KEY;

//Function to get Articles
async function getArticle(search) {
  let reqUrl = `${nytimes}/articlesearch.json?q=${search}&api-key=${apikey}`;
  let response = await fetch(
    reqUrl,
  );
  return await response.json();
}

module.exports = {
  getArticle
};