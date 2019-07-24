const express = require("express");

const server = express();

server.use(express.json());

// requests count
let requests = 0;

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

// middlewares
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  if (!projects[id]) {
    return res.status(400).json({ message: "Project does not exist" });
  }

  return next();
}

function countRequests(req, res, next) {
  requests++;

  console.log(`Total requests until now: ${requests}`);

  return next();
}

// return all projects
server.get("/projects", countRequests, (req, res) => res.json(projects));

// register a new project
server.post("/projects", countRequests, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

// update project
server.put("/projects/:id", countRequests, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

// delete project
server.delete(
  "/projects/:id",
  countRequests,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;

    projects.splice(id, 1);

    return res.send();
  }
);

// project tasks
server.post(
  "/projects/:id/tasks",
  countRequests,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].tasks.push(title);

    return res.json(projects);
  }
);

server.listen(3000);
