const { PrismaClient } = require("@prisma/client")

let prisma = new PrismaClient()

module.exports = { prisma }
