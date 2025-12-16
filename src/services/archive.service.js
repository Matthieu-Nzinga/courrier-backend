const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ArchiveService {
  static async getArchivedCourriers({
    page = 1,
    limit = 10,
    categorie,
    origineId,
    archivedById,
    search,
  }) {
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    // 🔐 construction propre du where
    const where = {};

    // filtre par catégorie
    if (categorie) {
      where.categorie = categorie;
    }

    // filtre par utilisateur qui a archivé
    if (archivedById) {
      where.archivedById = archivedById;
    }

    // filtres liés au courrier
    if (origineId || search) {
      where.courrier = {};

      if (origineId) {
        where.courrier.origineId = origineId;
      }

      if (search) {
        where.courrier.OR = [
          {
            objet: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            numero_courrier: {
              contains: search,
              mode: "insensitive",
            },
          },
        ];
      }
    }

    const [total, rows] = await Promise.all([
      prisma.archiveCourrier.count({ where }),

      prisma.archiveCourrier.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          courrier: {
            include: {
              origine: true,
              type: true,
              creator: {
                select: { id: true, nom: true, prenom: true },
              },
              destinataire: {
                select: { id: true, nom: true, prenom: true },
              },
            },
          },
          archivedBy: {
            select: { id: true, nom: true, prenom: true },
          },
        },
      }),
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      rows,
    };
  }
}

module.exports = ArchiveService;
