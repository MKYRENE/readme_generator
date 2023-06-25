// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

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
    name: 'usage',
    message: "Usage Information",
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Contribution guidelines',
  },
  {
    type: 'input',
    name: 'test',
    message: 'Test Instructions',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Select a preferred license for your README.',
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
  let markdown = `# ${data.title}\n\n`;

  markdown += `## Description\n${data.description}\n\n`;

  markdown += `## Table of Contents\n`;
  markdown += `- [Installation](#installation)\n`;
  markdown += `- [Usage](#usage)\n`;

  if (data.license !== 'None') {
    markdown += `- [License](#license)\n`;
  }

  markdown += `- [Contributing](#contributing)\n`;
  markdown += `- [Tests](#tests)\n`;
  markdown += `- [Questions](#questions)\n\n`;

  markdown += `## Installation\n${data.installation}\n\n`;
  markdown += `## Usage\n${data.usage}\n\n`;

  if (data.license !== 'None') {
    markdown += `## License\n${renderLicenseBadge(data.license)}\n\n`;
  }

  markdown += `## Contributing\n${data.contribution}\n\n`;
  markdown += `## Tests\n${data.test}\n\n`;
  markdown += `## Questions\nIf you have any questions or need further assistance, feel free to reach out:\n\n`;
  markdown += `- GitHub Profile: [${data.username}](https://github.com/${data.username})\n`;
  markdown += `- Email: ${data.email}\n`;

  return markdown;
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
