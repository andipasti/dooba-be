export default {
  "/api/users": {
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
          name: "team",
          schema: {
            type: "string"
          },
        },
      ],
      responses: {
        "200": {
          description: "Done",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    _id: { type: "string" },
                    email: { type: "string" },
                  }
                }
              }
            }
          }
        },
      }
    }
  },
  "/api/users/share-project": {
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
              required: ["userId", "projectId", "teamId"],
              properties: {
                userId: { type: "string" },
                projectId: { type: "string" },
                teamId: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
        },
      }
    }
  },
  "/api/users/share-project-to-client": {
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
              required: ["hostname","email", "projectId", "teamId"],
              properties: {
                hostname: { type: "string" },
                email: { type: "string" },
                projectId: { type: "string" },
                teamId: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
        },
      }
    }
  },
  "/api/users/add-to-team": {
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
              required: ["userIds", "teamId"],
              properties: {
                userIds: { type: "array", items: {
                    type: "string"
                  }
                },
                teamId: { type: "string" },
              }
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Done",
        },
      }
    }
  },
}