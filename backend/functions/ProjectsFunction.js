import getRealmInstance from "../database/realm";

export const addProject = async (project) => {
  const realm = await getRealmInstance();
  realm.write(() => {
    realm.create("Project", project);
  });
};

export const getAllProjects = async () => {
  const realm = await getRealmInstance();
  const projects = realm.objects("Project").sorted("created_at", true);
  return projects.map((project, index) => ({
    id: project.id,
    name: project.name,
    desc: project.desc,
    img_url: project.img_url,
    created_at: project.created_at,
    updated_at: project.updated_at,
    created_by: project.created_by,
    updated_by: project.updated_by,
  }));
};

export const deleteProject = async (projectId) => {
  const realm = await getRealmInstance();
  realm.write(() => {
    const project = realm.objectForPrimaryKey("Project", projectId);
    if (project) {
      realm.delete(project);
    }
  });
};
