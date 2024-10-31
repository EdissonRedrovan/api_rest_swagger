const express = require('express')

const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         fecha_registro:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro del usuario
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
routes.post('/', function(req, res) {
    controller.insertar_usuario( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
routes.get('/', function(req, res) {
    controller.obtener_usuario( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la actualización
 */
routes.put('/:id', function(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario a actualizar
    controller.actualizar_usuario(userId, req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error en la eliminación
 */
routes.delete('/:id', function(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario a eliminar
    controller.eliminar_usuario(userId)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

module.exports = routes