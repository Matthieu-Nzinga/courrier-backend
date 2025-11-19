/**
 * @openapi
 * tags:
 *   name: Notifications
 *   description: Gestion des notifications utilisateur
 */

/**
 * @openapi
 * /notifications/my:
 *   get:
 *     tags: [Notifications]
 *     summary: Récupère les notifications de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications
 */

/**
 * @openapi
 * /notifications/{id}/read:
 *   put:
 *     tags: [Notifications]
 *     summary: Marque la notification comme lue
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marquée comme lue
 *       404:
 *         description: Notification introuvable
 */

/**
 * @openapi
 * /notifications/unread-count:
 *   get:
 *     tags: [Notifications]
 *     summary: Retourne le nombre de notifications non lues de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Nombre non lu
 */

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

router.get("/my", authMiddleware, notificationController.getMyNotifications);
router.put("/:id/read", authMiddleware, notificationController.markAsRead);
router.get("/unread-count", authMiddleware, notificationController.getUnreadCount);

module.exports = router;
