const express = require("express");

const server = express();

server.use(express.json());

// in-memory projects storage
const projects = [
  {
    id: "0",
    title: "Trip",
    tasks: [
      "Save up money",
      "Set up a date",
      "Make flight reservation",
      "Make hotel reservation",
      "Do it!"
    ]
  },
  {
    id: "1",
    title: "Finish node project",
    tasks: [
      "Evaluate dependencies",
      "Finish core app",
      "Choose tools to handle routing",
      "Implement them"
    ]
  }
];

// return all projects
server.get("/projects", (req, res) => res.json(projects));

// register a new project
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.listen(3000);
