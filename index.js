// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "What is your project's title?",
    },

    {
        type: 'input',
        name: 'description',
        message: "Please provide a description for your project:",
    },

    {
        type: 'input',
        name: 'installation',
        message: "Installation Instructions: ",
    },

    {
        type: 'input',
        name: 'information',
        message: "Usage Information"
    },

    {
        type: 'input',
        name: 'contribution',
        message: 'Contribution guidelines',
    },

    {
        type: 'input',
        name: 'test',
        message: 'Test Instructions'
    },

    {
        type: 'list',
        name: 'license',
        message: 'Select a prefer license for your README.',
        choices: ['MIT License', 'GPO', 'Apache', 'None'],
    },

    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    },
];

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
    return `# ${data.title}
  
  ## Description
  ${data.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  ${renderLicenseLink(data.license)}
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${data.installation}
  
  ## Usage
  ${data.usage}
  
  ## License
  ${renderLicenseBadge(data.license)}
  
  ## Contributing
  ${data.contribution}
  
  ## Tests
  ${data.test}
  
  ## Questions
  If you have any questions or need further assistance, feel free to reach out:
  
  - GitHub Profile: [${data.username}](https://github.com/${data.username})
  - Email: ${data.email}
  `;
}



// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./README_Results/${fileName}.md`, generateMarkdown(data), (err) => {
        if (err) throw err;
        console.log('README file has been successfully generated!');
    });
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((userInput) => {
        writeToFile('readme', userInput);
    });
}


// Function call to initialize app
init();


// Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    if (license !== 'None') {
        return `![GitHub license](https://img.shields.io/badge/license-${encodeURIComponent(
            license
        )}-blue.svg)`;
    }
    return '';
}

// Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    if (license !== 'None') {
        return `\n* [License](#license)\n`;
    }
    return '';
}

// Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    if (license !== 'None') {
        return `## License
  
  This project is licensed under the ${license} license.`;
    }
    return '';
}