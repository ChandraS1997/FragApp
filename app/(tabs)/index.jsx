import { useEffect, useState } from "react";
import { YStack } from "tamagui";
import { getAllProjects } from "../../backend/functions/ProjectsFunction";
import Header from "../../components/common/Header";
import ProjectActionBar from "../../components/common/ProjectActionBar";
import ProjectImageView from "../../components/common/ProjectImageView";
import ProjectLists from "../../components/common/ProjectLists";
// import { usePaginatedData } from "../../backend/functions/Usepage";

const Home = () => {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [projects, setProjects] = useState([]);
  // Fetch initial data (or skip if offline, etc.)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <YStack flex={1}>
      <Header title={"Project"} />
      <ProjectActionBar
        query={query}
        setQuery={setQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setProjects={setProjects}
        projects={projects}
      />
      {viewMode === "list" && (
        <ProjectLists
          query={query}
          projects={projects}
          setProjects={setProjects}
        />
      )}
      {viewMode === "grid" && (
        <ProjectImageView
          query={query}
          projects={projects}
          setProjects={setProjects}
        />
      )}
    </YStack>
  );
};

export default Home;
