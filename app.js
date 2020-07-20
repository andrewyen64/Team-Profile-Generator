const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "employees.html");

const render = require("./lib/htmlRenderer");

// Prompts user to select which type of profile to add
const roster = [];

function chooseNewEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to add?",
            name: "name",
            choices: ["Engineer", "Intern", "Manager", "None, all done!"],
        },
    ]).then(val => {
        if (val.name === "Engineer") {
            addEngineer();
        } else if (val.name === "Intern") {
            addIntern();
        } else if (val.name === "Manager") {
            addManager();
        } else if (val.name === "None, all done!") {
            generateHTML(outputPath, render(roster));
        };
    });
}

// Function to add an Engineer profile
function addEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the engineer?",
            name: "name",
        },
        {
            type: "input",
            message: "What is this engineer's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is this engineer's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is this engineer's GitHub username?",
            name: "github",
        },
    ]).then(function(answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        roster.push(engineer);
        chooseNewEmployee();
    });
}

// Function to add an Intern profile
function addIntern() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is this intern's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is this intern's email?",
            name: "email",
        },
        {
            type: "input",
            message: "Which school does this intern attend?",
            name: "school",
        },
    ]).then(function(answer) {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        roster.push(intern);
        chooseNewEmployee ();        
    });
}

// Function to add a Manager profile
function addManager() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is this manager's ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is this manager's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is this manager's office number?",
            name: "number",
        },
    ]).then(function(answer) {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.number)
        roster.push(manager);
        chooseNewEmployee();
    });
}

// Function to generate the HTML file
function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
    }
    console.log("Successfully created Team Profile HTML webpage!");
    });
};

chooseNewEmployee();
