import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const { argv } = process;
  const command = argv[2];
  const email = argv[3];

  if (!command || !email) {
    console.log("Please provide command and email");
    console.log("add <email> : add admin");
    console.log("remove <email> : remove admin");
    process.exit(1);
  }

  try {
    switch (command) {
      case "add":
        await prisma.admin.create({
          data: {
            email,
          },
        });
        break;
      case "remove":
        await prisma.admin.delete({
          where: {         
            email,
          },
        });
        break;

      default:
        break;
    }
  } catch (error: any) {
    console.log("-------------");
    console.log(error);
    console.log("-------------");
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
