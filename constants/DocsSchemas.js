export const userSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    email: { type: "string" },
    name: { type: "string" },
    role: { type: "string" },
    team: { type: "string" },
  }
}

export const AllProjectSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    identifier: { type: "string" },
    description: { type: "string" },
    status: { type: "number" },
    created_on: { type: "string", format: "date-time" },
    updated_on: { type: "string", format: "date-time" },
  }
}

export const projectSchema = {
  type: "object",
  properties: {
    _id: { type: "number" },
    name: { type: "string" },
    identifier: { type: "string" },
    description: { type: "string" },
    status: { type: "number" },
    created_on: { type: "string", format: "date-time" },
    updated_on: { type: "string", format: "date-time" },
    tasks: { type: "array", items: { type: "string" } },
    files: { type: "array", items: { type: "string" } },
  }
}

export const getProjectsSchema = {
  type: "object",
  properties: {
    projects: {
      type: "array",
      items: {
        ...AllProjectSchema
      }
    },
  }
}