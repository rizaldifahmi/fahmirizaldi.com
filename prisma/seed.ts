const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create skill categories
  const categories = [
    {
      name: 'Programming Languages',
      skills: ['TypeScript', 'JavaScript', 'PHP'],
    },
    {
      name: 'Frontend Development',
      skills: ['React.js', 'Next.js', 'HTML', 'CSS'],
    },
    {
      name: 'Backend Development',
      skills: ['Node.js', 'CodeIgniter', 'Express.js'],
    },
    {
      name: 'Styling & UI',
      skills: ['Tailwind CSS', 'Bootstrap', 'Chakra UI'],
    },
    {
      name: 'Databases',
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'],
    },
    {
      name: 'DevOps & Tools',
      skills: ['Git', 'Docker', 'Linux', 'Nginx', 'RabbitMQ', 'CI/CD'],
    },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.skillCategory.create({
      data: {
        name: category.name,
      },
    });

    for (const skillName of category.skills) {
      await prisma.skill.create({
        data: {
          name: skillName,
          skill_category_id: createdCategory.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 