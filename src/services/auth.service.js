const prisma = require('../prisma');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt.util');


module.exports.register = async ({ email, password, name }) => {
const exists = await prisma.user.findUnique({ where: { email } });
if (exists) throw new Error('Email already in use');


const hashed = await bcrypt.hash(password, 10);


const user = await prisma.user.create({
data: { email, password: hashed, name }
});


return {
id: user.id,
email: user.email,
name: user.name,
token: signToken({ userId: user.id })
};
};


module.exports.login = async ({ email, password }) => {
const user = await prisma.user.findUnique({ where: { email } });
if (!user) throw new Error('Invalid credentials');


const valid = await bcrypt.compare(password, user.password);
if (!valid) throw new Error('Invalid credentials');


return {
token: signToken({ userId: user.id }),
user: { id: user.id, email: user.email, name: user.name }
};
};