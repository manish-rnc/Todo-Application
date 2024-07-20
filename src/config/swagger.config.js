import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo Application API',
            version: '1.0.0',
            description: "List of all the API's for managing the todos",
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(options);
export default swaggerSpecs;
