const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var generateHTML = require("./generateHTML");
const pdfmake = require("pdfmake");

inquirer
    .prompt([{
        message: "Enter your GitHub username",
        name: "username"
    }, {
        type: "list",
        message: "Choose a color",
        name: "favColor",
        choices: ["red", "green", "blue", "pink"]
    }])
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios
            .get(queryUrl)
            .then(function(response) {
                console.log(response);
                const res = response.data;
                const name = res.name;
                const userBio = res.bio;
                const publicRepos = res.public_repos;
                const followers = res.followers;
                // const stars = ;
                const following = res.following;

                console.log(name, `\n`, userBio, `\n`, publicRepos, `\n`, followers, `\n`, following)

            });
        // pdfmake
    })
    .then(function init() {
        var page = generateHTML;
        var pdf = pdfmake.createPdf(page);
        pdf.write('resume.pdf');

    })

// init()