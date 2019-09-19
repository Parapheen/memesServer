const express = require('express');
const path = require('path');
const cors = require('cors');
const serveStatic = require('serve-static');
const fetch = require("node-fetch");
require('dotenv').config();

let app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(cors());

app.get('/api/memes', (req, res) => {
    const token = process.env.API_KEY;
const method = 'wall.get';
const owner_id = '-146430492';
const url = "https://api.vk.com/method";

fetch(`${url}/${method}?owner_id=${owner_id}&access_token=${token}&v=5.101&count=50`,{
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
}).then(res => res.json())
.then((json) => {
    let result = json;
let posts = result.response.items;
let sortedPosts = posts.sort((a,b) => {
    return b.likes.count - a.likes.count
});
res.json(sortedPosts)
});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port)
});
