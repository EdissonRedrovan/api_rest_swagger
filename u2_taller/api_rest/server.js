const express = require('express')
const body_parser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const config = require('./config')
const db = require('./db')
const routes = require('./network/routes')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'Documentación de la API de usuarios',
            contact: {
                name: 'API Support'
            },
            servers: [{
                url: `http://localhost:${config.PORT}`
            }]
        }
    },
    apis: [
        'components/usuario/interface.js'
    ]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)

var app = express()

db(config.DB_URL)

app.use( body_parser.json() )
app.use( body_parser.urlencoded({extended:false}) )
app.use('/', express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

routes(app)

app.listen( config.PORT )
console.log(`La aplicacion se encuentra arriba en http://localhost:${config.PORT}/`)
console.log(`Documentación de Swagger disponible en http://localhost:${config.PORT}/api-docs`)