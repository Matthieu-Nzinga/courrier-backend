const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

router.use(authMiddleware);

// Statistiques globales pour l'utilisateur connecté
router.get("/stats", dashboardController.getStats);

// Liste des agents ayant des dossiers en cours
router.get("/agents-en-cours", dashboardController.getAgentsEnCours);

// Dossiers en cours pour un agent spécifique
router.get("/agents/:agentId/dossiers", dashboardController.getDossiersAgent);

module.exports = router;
