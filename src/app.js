const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const projects = [];

const techs = [];

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(projects);
});

app.post("/repositories", (request, response) => {
  const { title, url, techsList } = request.body;

  techsList.forEach(tech => {
    techs.push(tech);
  });

  const project = { id: uuid(), title: title, url: url, techs: techs, like : 0 };

  projects.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, techsList } = request.body;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json( {error: 'ID não encontrado'} );
  }

  const project = {
    id,
    title,
    techsList
  }

  projects[projectIndex] = project;

  return response.json('Project Atualizado');
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json( {error: 'ID não encontrado'} );
  }

  
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
