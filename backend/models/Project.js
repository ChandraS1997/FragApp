export const ProjectSchema = {
  name: "Project",
  primaryKey: "id",
  properties: {
    id: "string",
    name: "string",
    desc: "string",
    img_url: "string",
    created_at: "date",
    updated_at: "date",
    created_by: "string",
    updated_by: "string",
    // synced: { type: 'bool', default: false },
  },
};

  export const ImageSchema = {
    name: "Images",
    primaryKey: "id",
    properties: {
      id: "string",
      img_url: "string",
      // Foreign key to ProjectSchema
      project_id: "string",
      created_at: "date",
      updated_at: "date",
      created_by: "string",
      updated_by: "string",
    },
  };