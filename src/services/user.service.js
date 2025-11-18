import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

export const findAllUsers = () => {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

export const createNewUser = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role || "USER",
    },
    select: {
      id: true, name: true, email: true, role: true, createdAt: true
    }
  });
};

export const updateUserById = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  try {
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true }
    });
  } catch (error) {
    return null;
  }
};

export const deleteUserById = async (id) => {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (err) {
    return false;
  }
};
