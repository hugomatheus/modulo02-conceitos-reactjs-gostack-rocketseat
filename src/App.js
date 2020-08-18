import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import backgroundImage from "./assets/soa.jpg";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);
  async function handleAddProject() {
    //setProjects([...projects, `Project ${Date.now()}`]);
    const response = await api.post("/projects", {
      title: `Project ${Date.now()}`,
      owner: "Hugo",
    });

    setProjects([...projects, response.data]);
  }

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <>
      <Header title="Header 1">
        <ul>
          <li>Menu 1</li>
          <li>Menu 2</li>
        </ul>
      </Header>
      <Header title="Header 2">
        <ul>
          <li>Menu 1</li>
          <li>Menu 2</li>
          <li>Menu 3</li>
        </ul>
      </Header>
      <img width={400} src={backgroundImage} alt="soa" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddProject}>
        Adicionar
      </button>
    </>
  );
}

export default App;
