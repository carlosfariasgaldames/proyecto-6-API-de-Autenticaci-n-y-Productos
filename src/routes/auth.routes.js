import { Router } from "express";
const router = Router();
import * as authCtrl from "../controllers/auth.controller.js";


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", authCtrl.login);

/**
 * @swagger
 * /api/auth/verifytoken:
 *   get:
 *     summary: Verifica el token de autenticación
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o expirado
 */
router.get("/verifytoken", authCtrl.verifyToken);

export default router;
