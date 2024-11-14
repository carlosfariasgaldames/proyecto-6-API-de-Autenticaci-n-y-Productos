import { Router } from "express";
const router = Router();

import * as userCtrl from "../controllers/user.controller.js";
import { authJwt, verifySignup } from "../middlewares/index.js";

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       401:
 *         description: autorizado
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted],
  userCtrl.createUser
);

export default router;
