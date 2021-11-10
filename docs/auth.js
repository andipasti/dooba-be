import { userSchema } from "../constants/DocsSchemas";

export default {
  "/api/login": {
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string" },
                password: { type: "string" },
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
                  user: userSchema,
                  token: { type: "string" }
                }
              }
            }
          }
        },
      }
    }
  },
  "/api/register": {
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["email", "password", "name"],
              properties: {
                email: { type: "string" },
                password: { type: "string" },
                name: { type: "string" },
                token: { type: "string" },
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
                  user: userSchema,
                  token: { type: "string" }
                }
              }
            }
          }
        },
      }
    }
  },
  "/api/silent-login": {
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
                  user: userSchema,
                }
              }
            }
          }
        },
      }
    }
  }
}