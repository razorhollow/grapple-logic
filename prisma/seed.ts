import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

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
        name: 'Rear Naked Choke',
        description: '',
        category: 'Back Control',
        videoLink: null,
        lastIntroduced: new Date('2024-06-17'),
      },
      {
        name: 'Side Scissor to Armbar / Triangle',
        description: '',
        category: 'Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-06-19'),
      },
      {
        name: 'Bow and Arrow Choke',
        description: '',
        category: 'Back Control',
        videoLink: null,
        lastIntroduced: new Date('2024-06-21'),
      },
      {
        name: 'Cross Collar Choke',
        description: '',
        category: 'Closed Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-06-24'),
      },
      {
        name: 'Wizzer Trap Sequence',
        description: '',
        category: 'Closed Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-06-26'),
      },
      {
        name: 'Clamp Armbar',
        description: '',
        category: 'Closed Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-06-28'),
      },
      {
        name: 'Americana',
        description: '',
        category: 'Mount',
        videoLink: null,
        lastIntroduced: new Date('2024-07-01'),
      },
      {
        name: 'Cross Collar Choke',
        description: '',
        category: 'Mount',
        videoLink: null,
        lastIntroduced: new Date('2024-07-03'),
      },
      {
        name: 'Armbar / Triangle Gauging Reactions',
        description: '',
        category: 'Mount',
        videoLink: null,
        lastIntroduced: new Date('2024-07-05'),
      },
      {
        name: 'Kata Gatame',
        description: '',
        category: 'Side Control',
        videoLink: null,
        lastIntroduced: new Date('2024-07-08'),
      },
      {
        name: 'Scarf Choke and Progression',
        description: '',
        category: 'Side Control',
        videoLink: null,
        lastIntroduced: new Date('2024-07-10'),
      },
      {
        name: 'Armbar / Kimura',
        description: '',
        category: 'North South',
        videoLink: null,
        lastIntroduced: new Date('2024-07-12'),
      },
      {
        name: 'Toreando and Jimmy Pass',
        description: '',
        category: 'Guard Passing',
        videoLink: null,
        lastIntroduced: new Date('2024-07-15'),
      },
      {
        name: 'Over/Under and Stack Pass',
        description: '',
        category: 'Guard Passing',
        videoLink: null,
        lastIntroduced: new Date('2024-07-17'),
      },
      {
        name: 'Double Under / Double Under Back Take',
        description: '',
        category: 'Guard Passing',
        videoLink: null,
        lastIntroduced: new Date('2024-07-19'),
      },
      {
        name: 'DLR Guard Sweep Options (Basic, Getup, Crab Ride)',
        description: '',
        category: 'De La Riva Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-07-22'),
      },
      {
        name: 'Baited Sweep',
        description: '',
        category: 'Spider Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-07-24'),
      },
      {
        name: 'Hip Kick Sweep',
        description: '',
        category: 'Lasso Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-07-26'),
      },
      {
        name: 'Triangle Tips and Tricks',
        description: '',
        category: 'Closed Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-07-29'),
      },
      {
        name: 'Ezekiel Choke',
        description: '',
        category: '3/4 Mount',
        videoLink: null,
        lastIntroduced: new Date('2024-07-31'),
      },
      {
        name: 'Kimura',
        description: '',
        category: 'Top Half Guard',
        videoLink: null,
        lastIntroduced: new Date('2024-08-02'),
      },
      {
        name: 'Back Door Shoulder Lock',
        description: '',
        category: 'Side Control Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-05'),
      },
      {
        name: 'Knee Grab Half Guard Recovery',
        description: '',
        category: 'Side Control Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-07'),
      },
      {
        name: 'Back Door D\'Arce Escape',
        description: '',
        category: 'Side Control Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-09'),
      },
      {
        name: 'High Knee North South Escape',
        description: '',
        category: 'North South Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-14'),
      },
      {
        name: 'North South Variations: Double Over, Alternate to High Knee',
        description: '',
        category: 'North South Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-16'),
      },
      {
        name: 'Makikomi Roll Through Sweep',
        description: '',
        category: 'Turtle Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-19'),
      },
      {
        name: 'Single Leg Turtle Escape',
        description: '',
        category: 'Turtle Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-21'),
      },
      {
        name: 'Granby Roll Escape',
        description: '',
        category: 'Turtle Bottom',
        videoLink: null,
        lastIntroduced: new Date('2024-08-23'),
      },
      {
        name: 'Knee on Belly Fundamentals',
        description: '',
        category: 'Knee on Belly',
        videoLink: null,
        lastIntroduced: new Date('2024-08-26'),
      },
      {
        name: 'Baseball Choke',
        description: '',
        category: 'Knee on Belly',
        videoLink: null,
        lastIntroduced: new Date('2024-08-28'),
      },
      {
        name: 'Elbow Control Arm Lock',
        description: '',
        category: 'Knee on Belly',
        videoLink: null,
        lastIntroduced: new Date('2024-08-30'),
      },
      {
        name: 'Adamir Turtle Attacks',
        description: '',
        category: 'Turtle Top',
        videoLink: null,
        lastIntroduced: new Date('2024-09-09'),
      },
      {
        name: 'Adamir Turtle Attacks',
        description: '',
        category: 'Turtle Top',
        videoLink: null,
        lastIntroduced: new Date('2024-09-11'),
      },
      {
        name: 'Near Side Turtle Back Take',
        description: '',
        category: 'Turtle Top',
        videoLink: null,
        lastIntroduced: new Date('2024-09-16'),
      },
      {
        name: 'Toreando Spider Defense',
        description: '',
        category: 'Guard Retention',
        videoLink: null,
        lastIntroduced: new Date('2024-09-18'),
      },
      {
        name: 'Toreando Collar Drag',
        description: '',
        category: 'Guard Retention',
        videoLink: null,
        lastIntroduced: new Date('2024-09-20'),
      },
      {
        name: 'Toreando Sleeve Grab Roll Sweep',
        description: '',
        category: 'Guard Retention',
        videoLink: null,
        lastIntroduced: new Date('2024-09-23'),
      },
      {
        name: 'Toreando Knee Brace Lasso',
        description: '',
        category: 'Guard Retention',
        videoLink: null,
        lastIntroduced: new Date('2024-09-25'),
      },
      {
        name: 'Head Control Concept',
        description: '',
        category: 'Guard Retention',
        videoLink: null,
        lastIntroduced: new Date('2024-09-27'),
      },
    ];
  
    for (const techniqueData of techniquesData) {
      await prisma.technique.create({
        data: techniqueData,
      });
    }
  }
  
  main()
    .catch((e) => console.error(e))

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
