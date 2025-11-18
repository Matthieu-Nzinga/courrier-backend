const express = require("express");
const reponseController = require("../controllers/reponseCourrier.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware"); // notre middleware multer

const router = express.Router();

// Appliquer auth pour toutes les routes
router.use(authMiddleware);

/**
 * @openapi
 * tags:
 *   name: ReponseCourrier
 *   description: Gestion des réponses de courrier
 */

/**
 * @openapi
 * /reponses:
 *   get:
 *     tags: [ReponseCourrier]
 *     summary: Liste toutes les réponses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réponses
 */
router.get("/", reponseController.getReponses);

/**
 * @openapi
 * /reponses/{id}:
 *   get:
 *     tags: [ReponseCourrier]
 *     summary: Récupère une réponse par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Réponse trouvée }
 *       404: { description: Introuvable }
 */
router.get("/:id", reponseController.getReponseById);

/**
 * @openapi
 * /reponses:
 *   post:
 *     tags: [ReponseCourrier]
 *     summary: Crée une nouvelle réponse
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [courrierId, fichier_joint]
 *             properties:
 *               date_signature: { type: string, format: date }
 *               fichier_joint:
 *                 type: string
 *                 format: binary
 *               courrierId: { type: string }
 *     responses:
 *       201: { description: Réponse créée }
 *       400: { description: Erreur validation }
 */
router.post("/", upload.single("fichier_joint"), (req, res) => {
  if (req.file) req.body.fichier_joint = req.file.path;
  return reponseController.createReponse(req, res);
});

/**
 * @openapi
 * /reponses/{id}:
 *   put:
 *     tags: [ReponseCourrier]
 *     summary: Met à jour une réponse existante
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               date_signature: { type: string, format: date }
 *               fichier_joint:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200: { description: Réponse mise à jour }
 *       404: { description: Introuvable }
 */
router.put("/:id", upload.single("fichier_joint"), (req, res) => {
  if (req.file) req.body.fichier_joint = req.file.path;
  return reponseController.updateReponse(req, res);
});

/**
 * @openapi
 * /reponses/{id}:
 *   delete:
 *     tags: [ReponseCourrier]
 *     summary: Supprime une réponse
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Réponse supprimée }
 *       404: { description: Introuvable }
 */
router.delete("/:id", reponseController.deleteReponse);

module.exports = router;
