const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "employees.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development employees members,
// and to create objects for each employees member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// Prompts user to select which type of profile to add
const employees = [];

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
            generateHTML(outputPath, render(employees));
        };
    });
}

// Funciton to add an Enginner profile
function addEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            mesasge: "What is the name of the engienner?",
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
        employees.push(engineer);
        chooseNewEmployee()
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
        employees.push(intern);
        chooseNewEmployee ()
        
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
        employees.push(manager);

        chooseNewEmployee()
    });
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `employees.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

//Function to create README file
function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
    }
    console.log("Successfully created Team Profile HTML webpage!");
    });
};

chooseNewEmployee();

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
