const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
  },
  console.log()
);

const mainmenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuchoice",
        message: "What would you like to do?",
        choices: ["View All Figures", "Add A New Figure", "Quit"],
      },
    ])
    .then((choice) => {
      switch (choice.menuchoice) {
        case "View All Figures":
          viewFigures();
          break;
        case "Add A New Figure":
          addFigure();
          break;
        case "Quit":
          process.exit();
        default:
          console.log(
            "I'm sorry I didn't understand your choice, please start over."
          );
          mainmenu();
      }
    });
};

const viewFigures = () => {
  let sql = "SELECT * FROM figures ORDER BY name ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    }
    let table = cTable.getTable(results);
    console.log(table);
    mainmenu();
  });
};

const addFigure = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new Figure?",
      },
      {
        type: "input",
        name: "type",
        message: "What type of Figure is it?",
      },
      {
        type: "number",
        name: "price",
        message: "How much was the figure?",
      },
      {
        type: "input",
        name: "series",
        message: "What series is the figure from?",
      },
      {
        type: "confirm",
        name: "inStorage",
        message: "Will the figure be in storage?",
      },
    ])
    .then((choices) => {
      console.log(choices);
      let sql = `INSERT INTO figures (name, type, price, series, inStorage)
            VALUES ("${choices.name}", "${choices.type}", "${choices.price}", "${choices.series}", ${choices.inStorage});`;
      console.log(sql);
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        viewFigures();
        console.log("Figures successfully added!");
      });
    });
};

mainmenu();
