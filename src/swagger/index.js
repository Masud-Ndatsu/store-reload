import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "StoreReload Backend API",
            description: "The API documentation for StoreReload Backend API",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${Number(port)}/api/v1`,
                description: "Localhost (development)",
            },
            {
                url: `${baseUrl}/api/v1`,
                description: "Production",
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
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/swagger/routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    app.get("docs.json", (_req, res) => {
        res.json(swaggerSpec);
    });
    console.log(`Docs is live on  http://localhost:${Number(port)}/api-docs`);
};

export { swaggerDocs };
