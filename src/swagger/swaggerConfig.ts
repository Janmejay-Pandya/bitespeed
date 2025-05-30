// src/swagger/swaggerConfig.ts

import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BiteSpeed Identity API Assignment",
      version: "1.0.0",
      description: "API documentation for user identification logic",
    },
    servers: [
      {
        url: "https://bitespeed-fqe1.onrender.com/identify",
        description: "server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
