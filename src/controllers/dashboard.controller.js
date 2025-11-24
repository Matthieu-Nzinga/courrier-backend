const dashboardService = require("../services/dashboard.service");

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const stats = await dashboardService.getCourrierStats(userId);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.getAgentsEnCours = async (req, res) => {
  try {
    const agents = await dashboardService.getAgentsEnCours();
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.getDossiersAgent = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const courriers = await dashboardService.getDossiersAgent(agentId);
    res.json(courriers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};
