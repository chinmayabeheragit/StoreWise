const path = require('path');
const swaggerJSDOc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const serviceBasePath = `/rest/api`;

module.exports = function (app) {
    let swaggerDefinition = {
        swagger: "2.0",
        info: {
            title: "BILLING APP API'S DOCUMENTS",
            description: "RESTful API for BILLING APP SERVICES",
            version:"1.0",
        },
        servers: [
            {
                url:`http://${process.env.REMOTE_HOST}:${process.env.PORT}`
            }
        ],
        producess: ["application/json"],
        host: process.env.HOST_NAME,
        basePath: serviceBasePath,
    };
    let options = {
        swaggerDefinition: swaggerDefinition,
        explorer: true,

        apis: [  
            path.join(__dirname, "../controllers/*.js"),
            path.join(__dirname, "../routers/*.js")
        ],
    };
    let extraOptions = {
        explorer: true,
        swaggerOptions: {
            validatorUrl: null
        },
        customSiteTitle: "Swagger - BILLING APP"
    };
    swaggerSpec = swaggerJSDOc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec,extraOptions)
    );
};