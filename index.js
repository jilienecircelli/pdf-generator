const fs = require("fs"),
    convertFactory = require('electron-html-to');
const axios = require("axios");
const inquirer = require("inquirer");
var generateHTML = require("./generateHTML");
const path = require("path")

function promptUser() {
    return inquirer
        .prompt([{
            message: "Enter your GitHub username",
            name: "username"
        }, {
            type: "list",
            message: "Choose a color",
            name: "favColor",
            choices: ["red", "green", "blue", "pink"]
        }])
}

function init() {
    return promptUser().then(function({ username, favColor }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios
            .get(queryUrl)
            .then(function(response) {
                // console.log(response);
                const res = response.data;
                response.data.color = favColor;
                const name = res.name;
                const userBio = res.bio;
                const publicRepos = res.public_repos;
                const followers = res.followers;
                // const stars = ;
                const following = res.following;

                console.log(res)

                console.log(name, `\n`, userBio, `\n`, publicRepos, `\n`, followers, `\n`, following)

                const html = generateHTML(res);

                writeToFile("resume.html", html);
            })
            .then(() => {
                var conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                })
                conversion()
            })
            .catch(function(err) {
                console.log(err);
            })
    })
}

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

init()