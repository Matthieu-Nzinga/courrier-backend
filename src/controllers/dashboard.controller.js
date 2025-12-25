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

exports.getGlobalCourrierTotals = async (req, res) => {
  try {
    const totals = await dashboardService.getGlobalCourrierTotals();
    res.json(totals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.getGlobalCourrierStatuts = async (req, res) => {
  try {
    const stats = await dashboardService.getGlobalCourrierStatuts();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.getCourrierTraiteParDestinataire = async (req, res) => {
  try {
    const data = await dashboardService.getCourrierTraiteParDestinataire();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.getCourriersLuNonLu = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await dashboardService.getCourriersLuNonLu(userId);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors du chargement des statistiques",
      error
    });
  }
};
