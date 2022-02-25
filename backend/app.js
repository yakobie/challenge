const express = require('express');
const request = require('request');
const { Octokit } = require('octokit');
var cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.EXPRESS_PORT;
const access_token = process.env.PERSONAL_TOKEN;

const octokit = new Octokit({ auth: `${access_token}`});

app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/searchUser/:name', async (req, res) => {
    let result = await octokit.rest.search.users({
        q : req.params.name + " in:name",
        sort : "followers",
        per_page : 5,
    });
    res.json(result);
});

app.get('/getUserInfo/:username', async (req, res) => { 
    let result = await octokit.rest.users.getByUsername(req.params);
    console.log(result);
    res.json(result);
});



app.listen(port, () => console.log(`listening on port ${port}`))