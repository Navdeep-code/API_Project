const unsplash = "https://api.unsplash.com"; //base URL for any unsplash API requests
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

/*
 * Functions for API requests.
 */
//Getting Popular Photos
async function getPopularPhotos() {
  let reqUrl = `${unsplash}/photos?order_by=popular`;
  let response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Version": "v1",
        "Authorization": process.env.UNSPLASH_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Searching Photos with query function
async function SearchPhotos(query) {
  let reqUrl = `${unsplash}/search/photos?query=${query}&per_page=30`;
  let response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Version": "v1",
        "Authorization": process.env.UNSPLASH_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Getting a Single Photo
async function getPhoto(id) {
  let reqUrl = `${unsplash}/photos?id=${id}`;
  let response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Version": "v1",
        "Authorization": process.env.UNSPLASH_CLIENT_ID
      }
    }
  );
  return await response.json();
}

//Removebg Api function to remove the background
async function removeimg(url) {
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_url', url);
  axios({

    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      ...formData.getHeaders(),
      'X-Api-Key': process.env.REMOVAL_API_KEY,
    },
    encoding: null
  })
    .then((response) => {
      if (response.status != 200) return console.error('Error:', response.status, response.statusText);
      fs.writeFileSync("public/no-bg.png", response.data);
    })
    .catch((error) => {
      return console.error('Request failed:', error);
    });

}



module.exports = {
  getPopularPhotos,
  SearchPhotos,
  getPhoto,
  removeimg
};
