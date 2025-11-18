const typeService = require("../services/typeCourrier.service");

exports.getTypes = async (req, res) => {
  try {
    const data = await typeService.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const data = await typeService.findById(req.params.id);

    if (!data) return res.status(404).json({ message: "Type introuvable" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

exports.createType = async (req, res) => {
  try {
    const data = await typeService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création", err });
  }
};

exports.updateType = async (req, res) => {
  try {
    const data = await typeService.update(req.params.id, req.body);

    if (!data) return res.status(404).json({ message: "Type introuvable" });

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la modification", err });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const deleted = await typeService.remove(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Type introuvable" });

    res.json({ message: "Type supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", err });
  }
};
