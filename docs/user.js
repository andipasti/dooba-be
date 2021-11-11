import {
  userSchema,
  getProjectsSchema,
  projectSchema,
  AllProjectSchema,
} from "../constants/DocsSchemas";


export default {
  "/api/user/change-password": {
    post: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["old_password", "password"],
              properties: {
                old_password: { type: "string" },
                password: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {},
      }
    }
  },
  "/api/user/forgot-password": {
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["email", "hostname"],
              properties: {
                email: { type: "string" },
                hostname: { type: "string" }
              }
            }
          }
        },
      },
      responses: {
        "200": {},
      }
    }
  },
  "/api/user/change-password-with-token": {
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["password", "token"],
              properties: {
                password: { type: "string" },
                token: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
      "200": {},
      }
    }
  },
  "/api/user/projects": {
    get: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer"
          },
        },
      ],
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                ...getProjectsSchema
              }
            }
          }
        },
      }
    },
  },
  "/api/user/projects/{id}": {
    get: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
        {
          in: "path",
          name: "id",
          schema: {
            type: "integer"
          },
          required: true
        },
      ],
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  project: {
                    ...projectSchema
                  }
                }
              }
            }
          }
        },
      }
    },
    put: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
        {
          in: "path",
          name: "id",
          schema: {
            type: "integer"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                deadline: { type: "string" },
                members: { type: "string" },
                kanbanBoard: {
                  type: "object",
                  properties: {}
                },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                ...projectSchema
              }
            }
          }
        },
      }
    },
    delete: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
        {
          in: "path",
          name: "id",
          schema: {
            type: "integer"
          },
          required: true
        },
      ],
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                },
              }
            }
          }
        },
      }
    },
  },
  "/api/user": {
    put: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                ...userSchema
              }
            }
          }
        },
      }
    }
  },
  "/api/user/role": {
    put: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["teamMemberId", "role"],
              properties: {
                teamMemberId: { type: "string" },
                role: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  role: { type: "string" }
                }
              }
            }
          }
        },
      }
    }
  },
  "/api/user/import-redmine-projects": {
    post: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["projectIds"],
              properties: {
                projectIds: { type: "array", items: { type: "number" }, description: "id's from redmine" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                ...getProjectsSchema
              }
            }
          }
        },
      }
    }
  },
  "/api/user/redmine-projects": {
    get: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  projects: {
                    type: "array",
                    items: {
                      ...AllProjectSchema
                    }
                  },
                  total_count: { type: "number" },
                  offset: { type: "number" },
                  limit: { type: "number" },
                }
              }
            }
          }
        },
      }
    },
  },
  "/api/user/projects/{id}/build-kanban": {
    put: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
        {
          in: "path",
          name: "id",
          schema: {
            type: "string"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["kanbanSchema"],
              properties: {
                kanbanSchema: {
                  type: "object",
                  description: "                   { New: \"Your column name\", \n" +
                    "                    \"In Progress\": \"Your column name\", \n" +
                    "                    Resolved:  \"Your column name\", \n" +
                    "                    Closed:  \"Your column name\", \n" +
                    "                    Rejected:  \"Your column name\", \n" +
                    "                    Feedback:  \"Your column name\" }",
                  properties: {}
                },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                ...projectSchema
              }
            }
          }
        },
      }
    }
  },
  "/api/user/default-kanban-schema": {
    get: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "object",
                description: "                  { New: \"Backlog\",\n" +
                  "                  \"In Progress\": \"In Progress\",\n" +
                  "                  Resolved: \"Done\",\n" +
                  "                  Closed: \"Done\",\n" +
                  "                  Rejected: \"Blocked\", \n" +
                  "                  Feedback: \"Backlog\" }",
                properties: {
                  New: { type: "string" },
                  "In Progress": { type: "string" },
                  Resolved: { type: "string" },
                  Closed: { type: "string" },
                  Rejected: { type: "string" },
                  Feedback: { type: "string" },
                }
              }
            }
          }
        },
      }
    },
  },
  "/api/user/add-redmine-instance": {
    post: {
      parameters: [
        {
          in: "header",
          name: "authorization",
          schema: {
            type: "JWT"
          },
          required: true
        },
      ],
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["redmine_url", "redmine_api_key"],
              properties: {
                redmine_url: { type: "string" },
                redmine_api_key: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  team: { type: "string" },
                  role: { type: "string" },
                }
              }
            }
          }
        },
      }
    }
  },
}