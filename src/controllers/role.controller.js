const roleService = require("../services/role.service");

exports.getRoles = async (req, res) => {
  try {
    const data = await roleService.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", err });
  }
};
