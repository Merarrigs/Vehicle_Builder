import fs from 'fs';
import inquirer from 'inquirer';

// Prompt questions
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter project title:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter project description:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Enter contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Enter test instructions:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['Apache 2.0', 'MIT','GPL 3.0', 'None']
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// Generate README content
const generateREADME = (answers) => {
  let licenseNotice = '';

  switch (answers.license) {
    case 'MIT':
      licenseNotice = 'This project is licensed under the MIT License.';
      break;
    case 'Apache 2.0':
      licenseNotice = 'This project is licensed under the Apache 2.0 License.';
      break;
    case 'GPL 3.0':
      licenseNotice = 'This project is licensed under the GPL 3.0 License.';
      break;
    case 'None':
      licenseNotice = 'This project is not licensed.';
      break;
  }

  return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
${licenseNotice}

## Questions
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
  `;
};

// TODO: Create a function to write README file
const writeFile = (content) => {
  fs.writeFile('README.md', content, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('README.md has been generated!');
    }
  });
};

const init = async () => {
  try {
    if (fs.existsSync('README.md')) {
      console.log('README.md already exists. Please remove it before generating a new one.');
      return;
    }

const answers = await inquirer.prompt(questions);

 const content = generateREADME(answers);

writeFile(content);
} catch (err) {
    console.error('Error:', err);
    }
    };
   // Function call to initialize app
    init();