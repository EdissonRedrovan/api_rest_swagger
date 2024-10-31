const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Usuarios',
        version: '1.0.0',
        description: 'API para gestionar usuarios',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desarrollo',
        },
      ],
    },
    apis: ['../components/usuario/interface'], // Rutas donde están las anotaciones
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  const swaggerDocs = (app, port) => {
    // Ruta para la documentación
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Ruta para el JSON de la documentación
    app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    
    console.log(`📝 Documentación Swagger disponible en http://localhost:${port}/api-docs`);
  };
  
  module.exports = { swaggerDocs };