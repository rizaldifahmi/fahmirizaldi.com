import type { NextRequest } from 'next/server';

import {
  createEndorsement,
  deleteEndorsement,
  getEndorsements,
  isEndorsed,
} from '@/actions/endorsements';
import { auth } from '@/lib/auth';
import { response } from '@/lib/server';
import type {
  APIErrorResponse,
  APIListResponse,
  APISingleResponse,
} from '@/types/server';
import type { SkillCategory } from '@/types/skill';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const endorsements = await getEndorsements();
    return response<APIListResponse<SkillCategory>>({ data: endorsements });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session) {
      return response<APIErrorResponse>(
        {
          message: 'Unauthenticated',
        },
        401,
      );
    }

    const body = await req.json();
    const { skillId } = body;
    const userId = session.id as string;
    const parsedSkillId = Number(skillId);

    const alreadyEndorsed = await isEndorsed({
      skillId: parsedSkillId,
      userId,
    });

    if (alreadyEndorsed) {
      return response<APIErrorResponse>(
        {
          message: 'Conflict',
        },
        409,
      );
    }

    await createEndorsement({ skillId: parsedSkillId, userId });

    return response<APISingleResponse<{}>>(
      {
        data: {},
      },
      201,
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session) {
      return response<APIErrorResponse>(
        {
          message: 'Unauthenticated',
        },
        401,
      );
    }

    const body = await req.json();
    const { skillId } = body;
    const userId = session.id as string;
    const parsedSkillId = Number(skillId);

    const alreadyEndorsed = await isEndorsed({
      skillId: parsedSkillId,
      userId,
    });

    if (!alreadyEndorsed) {
      return response<APIErrorResponse>(
        {
          message: 'Not endorsed',
        },
        404,
      );
    }

    await deleteEndorsement({ skillId: parsedSkillId, userId });

    return response<APISingleResponse<{}>>(
      {
        data: {},
      },
      200,
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
