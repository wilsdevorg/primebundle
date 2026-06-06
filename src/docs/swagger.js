const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PrimeBundle API",
      version: "1.0.0",
      description: "PrimeBundle Backend API Documentation",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://primebundle-api.onrender.com/api"
            : "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

console.log(
  "📚 Swagger loaded",
  Object.keys(swaggerSpec.paths || {}).length,
  "routes",
);

if (process.env.NODE_ENV !== "production") {
  console.log("Swagger paths:", Object.keys(swaggerSpec.paths || {}));
}

module.exports = swaggerSpec;
