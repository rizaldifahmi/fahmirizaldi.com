'use server';

import db from '@/lib/db';
import type { Skill, SkillCategory } from '@/types/skill';
import type { User } from '@/types/user';

export const countAllEndorsements = async (): Promise<number> => {
  return await db.endorsement.count();
};

export const getEndorsements = async () => {
  const data = await db.skillCategory.findMany({
    include: {
      skills_in_category: {
        include: {
          endorsements: {
            include: { user: true },
          },
        },
      },
    },
  });

  return data.map((category) => ({
    name: category.name,
    skills: category.skills_in_category.map((skill) => ({
      id: skill.id.toString(),
      name: skill.name,
      users: skill.endorsements
        .filter((endorsement) => endorsement.userId)
        .map((endorsement) => ({
          id: endorsement.user?.id!,
          name: endorsement.user?.name!,
          email: endorsement.user?.email!,
          image: endorsement.user?.image!,
        })),
    })),
  })) satisfies SkillCategory[];
};

export const isEndorsed = async ({
  skillId,
  userId,
}: {
  skillId: number;
  userId: string;
}): Promise<boolean> => {
  const endorsementCount = await db.endorsement.count({
    where: {
      skill_id: skillId,
      userId,
    },
  });

  return endorsementCount > 0;
};

export const createEndorsement = async ({
  skillId,
  userId,
}: {
  skillId: number;
  userId: string;
}) => {
  await db.endorsement.create({
    data: {
      skill_id: skillId,
      userId,
    },
  });
};
