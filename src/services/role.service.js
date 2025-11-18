const prisma = require("../prisma");

exports.findAll = () => {
  return prisma.role.findMany({
    orderBy: { libelle: "asc" }
  });
};
