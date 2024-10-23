import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rob@razorhollow.com";
  console.log('Cleaning up the existing database...🧹')
  
  // Additional user
  const newUser = await prisma.user.create({
    data: {
      id: 'cm1temz600000al45x8z7rwze',
      email: 'rob@razorhollow.com',
      password: {
        create: {
          hash: '$2a$10$PWwaMLjwnpN467.sXnkBf.spaZqxfuY0oavpPH.6KnNbtEqVO9r4m',
        },
      },
    },
  });


  // Additional notes for the new user
  await prisma.note.create({
    data: {
      id: 'cm1temz6p0002al45wk6kf1oh',
      title: 'My first note',
      body: 'Hello, world!',
      userId: newUser.id,
    },
  });

  await prisma.note.create({
    data: {
      id: 'cm1temz6r0004al45p3pgmevt',
      title: 'My second note',
      body: 'Hello, world!',
      userId: newUser.id,
    },
  });


  // Additional techniques for the new user
  const additionalTechniques = [
    {
      id: 81,
      name: 'Rear Naked Choke',
      description: '',
      category: 'Back Control',
      userId: newUser.id,
    },
    {
      id: 82,
      name: 'Side Scissor to Armbar / Triangle',
      description: '',
      category: 'Closed Guard',
      userId: newUser.id,
    },
  ];

  for (const technique of additionalTechniques) {
    await prisma.technique.create({
      data: technique,
    });
  }

// cleanup the existing database
  await prisma.user.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.technique.deleteMany({});
  await prisma.note.deleteMany({});
  console.log('Database cleaned up. 🧹')

  const hashedPassword = await bcrypt.hash("lexilovesyou", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  async function main() {
    const techniquesData = [
      {
        name: "Rear Naked Choke",
        description: "",
        category: "Back Control",
        videoLink: null,
        lastIntroduced: new Date("2024-06-17"),
        userId: user.id,
      },
      {
        name: "Side Scissor to Armbar / Triangle",
        userId: user.id,
        description: "",
        category: "Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-06-19"),
      },
      {
        name: "Bow and Arrow Choke",
        description: "",
        category: "Back Control",
        videoLink: null,
        lastIntroduced: new Date("2024-06-21"),
        userId: user.id,
      },
      {
        name: "Cross Collar Choke",
        description: "",
        category: "Closed Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-06-24"),
        userId: user.id,
      },
      {
        name: "Wizzer Trap Sequence",
        description: "",
        category: "Closed Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-06-26"),
        userId: user.id,
      },
      {
        name: "Clamp Armbar",
        description: "",
        category: "Closed Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-06-28"),
        userId: user.id,
      },
      {
        name: "Americana",
        description: "",
        category: "Mount",
        videoLink: null,
        lastIntroduced: new Date("2024-07-01"),
        userId: user.id,
      },
      {
        name: "Cross Collar Choke",
        description: "",
        category: "Mount",
        videoLink: null,
        lastIntroduced: new Date("2024-07-03"),
        userId: user.id,
      },
      {
        name: "Armbar / Triangle Gauging Reactions",
        description: "",
        category: "Mount",
        videoLink: null,
        lastIntroduced: new Date("2024-07-05"),
        userId: user.id,
      },
      {
        name: "Kata Gatame",
        description: "",
        category: "Side Control",
        videoLink: null,
        lastIntroduced: new Date("2024-07-08"),
        userId: user.id,
      },
      {
        name: "Scarf Choke and Progression",
        description: "",
        category: "Side Control",
        videoLink: null,
        lastIntroduced: new Date("2024-07-10"),
        userId: user.id,
      },
      {
        name: "Armbar / Kimura",
        description: "",
        category: "North South",
        videoLink: null,
        lastIntroduced: new Date("2024-07-12"),
        userId: user.id,
      },
      {
        name: "Toreando and Jimmy Pass",
        description: "",
        category: "Guard Passing",
        videoLink: null,
        lastIntroduced: new Date("2024-07-15"),
        userId: user.id,
      },
      {
        name: "Over/Under and Stack Pass",
        description: "",
        category: "Guard Passing",
        videoLink: null,
        lastIntroduced: new Date("2024-07-17"),
        userId: user.id,
      },
      {
        name: "Double Under / Double Under Back Take",
        description: "",
        category: "Guard Passing",
        videoLink: null,
        lastIntroduced: new Date("2024-07-19"),
        userId: user.id,
      },
      {
        name: "DLR Guard Sweep Options (Basic, Getup, Crab Ride)",
        description: "",
        category: "De La Riva Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-07-22"),
        userId: user.id,
      },
      {
        name: "Baited Sweep",
        description: "",
        category: "Spider Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-07-24"),
        userId: user.id,
      },
      {
        name: "Hip Kick Sweep",
        description: "",
        category: "Lasso Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-07-26"),
        userId: user.id,
      },
      {
        name: "Triangle Tips and Tricks",
        description: "",
        category: "Closed Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-07-29"),
        userId: user.id,
      },
      {
        name: "Ezekiel Choke",
        description: "",
        category: "3/4 Mount",
        videoLink: null,
        lastIntroduced: new Date("2024-07-31"),
        userId: user.id,
      },
      {
        name: "Kimura",
        description: "",
        category: "Top Half Guard",
        videoLink: null,
        lastIntroduced: new Date("2024-08-02"),
        userId: user.id,
      },
      {
        name: "Back Door Shoulder Lock",
        description: "",
        category: "Side Control Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-05"),
        userId: user.id,
      },
      {
        name: "Knee Grab Half Guard Recovery",
        description: "",
        category: "Side Control Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-07"),
        userId: user.id,
      },
      {
        name: "Back Door D'Arce Escape",
        description: "",
        category: "Side Control Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-09"),
        userId: user.id,
      },
      {
        name: "High Knee North South Escape",
        description: "",
        category: "North South Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-14"),
        userId: user.id,
      },
      {
        name: "North South Variations: Double Over, Alternate to High Knee",
        description: "",
        category: "North South Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-16"),
        userId: user.id,
      },
      {
        name: "Makikomi Roll Through Sweep",
        description: "",
        category: "Turtle Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-19"),
        userId: user.id,
      },
      {
        name: "Single Leg Turtle Escape",
        description: "",
        category: "Turtle Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-21"),
        userId: user.id,
      },
      {
        name: "Granby Roll Escape",
        description: "",
        category: "Turtle Bottom",
        videoLink: null,
        lastIntroduced: new Date("2024-08-23"),
        userId: user.id,
      },
      {
        name: "Knee on Belly Fundamentals",
        description: "",
        category: "Knee on Belly",
        videoLink: null,
        lastIntroduced: new Date("2024-08-26"),
        userId: user.id,
      },
      {
        name: "Baseball Choke",
        description: "",
        category: "Knee on Belly",
        videoLink: null,
        lastIntroduced: new Date("2024-08-28"),
        userId: user.id,
      },
      {
        name: "Elbow Control Arm Lock",
        description: "",
        category: "Knee on Belly",
        videoLink: null,
        lastIntroduced: new Date("2024-08-30"),
        userId: user.id,
      },
      {
        name: "Adamir Turtle Attacks",
        description: "",
        category: "Turtle Top",
        videoLink: null,
        lastIntroduced: new Date("2024-09-09"),
        userId: user.id,
      },
      {
        name: "Adamir Turtle Attacks",
        description: "",
        category: "Turtle Top",
        videoLink: null,
        lastIntroduced: new Date("2024-09-11"),
        userId: user.id,
      },
      {
        name: "Near Side Turtle Back Take",
        description: "",
        category: "Turtle Top",
        videoLink: null,
        lastIntroduced: new Date("2024-09-16"),
        userId: user.id,
      },
      {
        name: "Toreando Spider Defense",
        description: "",
        category: "Guard Retention",
        videoLink: null,
        lastIntroduced: new Date("2024-09-18"),
        userId: user.id,
      },
      {
        name: "Toreando Collar Drag",
        description: "",
        category: "Guard Retention",
        videoLink: null,
        lastIntroduced: new Date("2024-09-20"),
        userId: user.id,
      },
      {
        name: "Toreando Sleeve Grab Roll Sweep",
        description: "",
        category: "Guard Retention",
        videoLink: null,
        lastIntroduced: new Date("2024-09-23"),
        userId: user.id,
      },
      {
        name: "Toreando Knee Brace Lasso",
        description: "",
        category: "Guard Retention",
        videoLink: null,
        lastIntroduced: new Date("2024-09-25"),
        userId: user.id,
      },
      {
        name: "Head Control Concept",
        description: "",
        category: "Guard Retention",
        videoLink: null,
        lastIntroduced: new Date("2024-09-27"),
        userId: user.id,
      },
    ];

    for (const techniqueData of techniquesData) {
      await prisma.technique.create({
        data: techniqueData,
      });
    }
  }

  await main().catch((e) => console.error(e));

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
