#!/usr/bin/node
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const intit = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node Fucking JS", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};
const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "what is the name of file output extension?"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "what is the file extension?",
      choices: [".rb", ".js", ".php", ".css"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};
const createFile = (filename, extension) => {
  const filepath = `${process.cwd()}/${filename}.${extension}`;
  shell.touch(filepath);
  return filepath;
};
const successMessage = filepath => {
  console.log(chalk.white.bgGreen.bold(`Done file created at ${filepath}`));
};
const run = async () => {
  //show script introduction
  intit();
  // ask questions
  const answewrs = await askQuestions();
  const { FILENAME, EXTENSION } = answewrs;
  const filepath = createFile(FILENAME, EXTENSION);
  successMessage(filepath);
};
run();
