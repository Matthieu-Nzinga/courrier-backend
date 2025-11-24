const prisma = require("../prisma");

/**
 * Statistiques globales pour l'utilisateur connecté
 */
exports.getCourrierStats = async (userId) => {
  // Comptage par statut
  const totalTraites = await prisma.courrier.count({
    where: { destinataire: { id: userId }, statut: { libelle: "Validé" } }
  });

  const totalRejetes = await prisma.courrier.count({
    where: { destinataire: { id: userId }, statut: { libelle: "Rejeté" } }
  });

  const totalEnCours = await prisma.courrier.count({
    where: { destinataire: { id: userId }, statut: { libelle: "En cours de traitement" } }
  });

  // Lu/non lu
  const totalLu = await prisma.courrierLu.count({
    where: { userId, lu: true }
  });

  const totalNonLu = await prisma.courrierLu.count({
    where: { userId, lu: false }
  });

  return {
    totalTraites,
    totalRejetes,
    totalEnCours,
    totalLu,
    totalNonLu
  };
};

/**
 * Liste des agents ayant des dossiers en cours (statut "En cours de traitement")
 */
exports.getAgentsEnCours = async () => {
  const agents = await prisma.user.findMany({
    where: {
      courriersDestines: {
        some: { statut: { libelle: "En cours de traitement" } }
      }
    },
    select: {
      id: true,
      nom: true,
      prenom: true,
      courriersDestines: {
        where: { statut: { libelle: "En cours de traitement" } },
        select: { id: true }
      }
    }
  });

  return agents.map(a => ({
    id: a.id,
    nom: a.nom,
    prenom: a.prenom,
    dossiersEnCours: a.courriersDestines.length
  }));
};

/**
 * Liste des dossiers en cours pour un agent spécifique
 */
exports.getDossiersAgent = async (agentId) => {
  const courriers = await prisma.courrier.findMany({
    where: { destUserId: agentId, statut: { libelle: "En cours de traitement" } },
    include: {
      type: true,
      creator: true,
      reponses: true,
      origine: true,
      annotations: { include: { auteur: true } },
      courriersLu: true
    },
    orderBy: { createdAt: "desc" }
  });

  return courriers.map(c => ({
    ...c,
    estLu: c.courriersLu.length > 0 ? c.courriersLu[0].lu : false
  }));
};
