const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.js <email> <password>");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log(`Successfully created admin user: ${admin.email}`);
  } catch (error) {
    if (error.code === 'P2002') {
      console.error("Error: An admin with this email already exists.");
    } else {
      console.error("Error creating admin:", error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
