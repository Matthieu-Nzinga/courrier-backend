import {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUserById,
  deleteUserById
} from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await createNewUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(parseInt(req.params.id), req.body);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserById(parseInt(req.params.id));

    if (!deleted) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};
