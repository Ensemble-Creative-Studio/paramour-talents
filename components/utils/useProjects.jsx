'use client'// useProjects.js
import { useState, useEffect, createContext, useContext } from 'react';
import { CurrentTagContext } from './CurrentTagContext';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children, initialData }) => {
  const { currentTag } = useContext(CurrentTagContext);
  const [projectsData, setProjectsData] = useState(initialData);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
console.log(projectsData[0].tagsSUB)
  useEffect(() => {
    if (currentTag) {
      setFilteredProjects(
        
        projectsData.filter((project) =>
       
          project.tags?.some((tag) => tag._id === currentTag._id)
        )
      );
    } else {
      setFilteredProjects(projectsData);
    }
  }, [currentTag, projectsData]);

  return (
    <ProjectContext.Provider value={{ projectsData, setProjectsData, filteredProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
