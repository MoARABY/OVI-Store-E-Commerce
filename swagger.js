const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
    title: 'OVI store E-commerce Platform APIs',
    version: '1.0.0',
    description: 'API documentation for my Node.js project',
    },
    servers: [
    {
        url: 'http://localhost:8000',
        description: 'Development server',
    },
    {
      url: 'https://ovi-store-e-commerce.vercel.app/',
      description: 'production server',
    }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/modules/routes/*.js'], // Adjust the path according to your project structure
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };