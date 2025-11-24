const prisma = require("../prisma");

/**
 * Retourne les notifications d'un utilisateur triées par date (desc).
 * @param {string} userId
 */
exports.getByUser = (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { courrier: true }
  });
};

/**
 * Marque une notification comme lue si elle appartient à l'utilisateur.
 * @param {string} notifId
 * @param {string} userId
 */
exports.markAsRead = async (notifId, userId) => {
  // updateMany afin d'éviter erreur si id n'existe pas ou n'appartient pas à l'user
  const result = await prisma.notification.updateMany({
    where: { id: notifId, userId },
    data: { statut: "read" } // on utilise ton champ 'statut' (unread/read)
  });

  return result.count > 0;
};

/**
 * Retourne le nombre de notifications non lues pour un utilisateur.
 * @param {string} userId
 */
exports.countUnread = async (userId) => {
  const count = await prisma.notification.count({
    where: { userId, statut: "unread" }
  });
  return count;
};
