import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  const existingUser = await prisma.user.findUnique({
    where: {
      nickname: "adalovelace",
    },
  });

  if (existingUser) {
    return;
  }

  await prisma.user.create({
    data: {
      email: "ada.lovelace@example.com",
      nickname: "adalovelace",
      password: "changeme",
      Profile: {
        create: {
          bio: "Mathematician and writer, often considered the first computer programmer.",
          iconUrl: "https://example.com/lovelace.png",
          tags: ["Mathematician", "First Programmer", "Visionary"],
          socials: {
            createMany: {
              data: [
                {
                  platform: "twitter",
                  url: "https://twitter.com/AdaLovelaceDay",
                },
              ],
            },
          },
        },
      },
    },
  });
}

main();
