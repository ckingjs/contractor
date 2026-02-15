import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("pass1234", 10);

  await prisma.user.upsert({
    where: { email: "manager@contractor.local" },
    update: { name: "Maria Manager", role: UserRole.manager, passwordHash },
    create: {
      email: "manager@contractor.local",
      name: "Maria Manager",
      role: UserRole.manager,
      passwordHash
    }
  });

  await prisma.user.upsert({
    where: { email: "worker@contractor.local" },
    update: { name: "Wes Worker", role: UserRole.worker, passwordHash },
    create: {
      email: "worker@contractor.local",
      name: "Wes Worker",
      role: UserRole.worker,
      passwordHash
    }
  });

  await prisma.project.upsert({
    where: { id: "550e8400-e29b-41d4-a716-446655440000" },
    update: {
      name: "Smith Residence Rewiring",
      geofenceEnabled: true,
      geofenceLat: 34.0522,
      geofenceLng: -118.2437,
      geofenceRadius: 100,
      geofenceAddress: "123 Main St, Los Angeles, CA"
    },
    create: {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Smith Residence Rewiring",
      geofenceEnabled: true,
      geofenceLat: 34.0522,
      geofenceLng: -118.2437,
      geofenceRadius: 100,
      geofenceAddress: "123 Main St, Los Angeles, CA"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
