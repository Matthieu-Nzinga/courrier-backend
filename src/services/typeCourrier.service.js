const prisma = require("../prisma");

exports.findAll = () => {
  return prisma.typeCourrier.findMany({
    orderBy: { libelle: "asc" }
  });
};

exports.findById = (id) => {
  return prisma.typeCourrier.findUnique({ where: { id } });
};

exports.create = (data) => {
  return prisma.typeCourrier.create({
    data: {
      libelle: data.libelle
    }
  });
};

exports.update = async (id, data) => {
  try {
    return await prisma.typeCourrier.update({
      where: { id },
      data: { libelle: data.libelle }
    });
  } catch (err) {
    return null;
  }
};

exports.remove = async (id) => {
  try {
    await prisma.typeCourrier.delete({ where: { id } });
    return true;
  } catch (err) {
    return false;
  }
};
