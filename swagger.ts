import swaggerJsdoc from "swagger-jsdoc";
 
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IPOS API DOC",
      version: "1.0.0",
      description: "A documentation for an IPOS API which has all necessary endpoints",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};
 
export const specs = swaggerJsdoc(options);