import type { APIErrorResponse, APIListResponse } from '@/types/server';
import type { SkillCategory } from '@/types/skill';

import useRequest from './use-request';

type CurrentUser = {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
} | null;

const useEndorsements = ({
  fallbackData,
  currentUser,
}: {
  fallbackData: SkillCategory[];
  currentUser?: CurrentUser;
}) => {
  const { data, isLoading, error, mutate } = useRequest<
    APIListResponse<SkillCategory>,
    APIErrorResponse
  >('/api/endorsements', undefined, {
    fallbackData: {
      data: fallbackData,
    },
  });

  const endorsements = data?.data ?? fallbackData;

  const addEndorsement = async (skillId: string) => {
    const previousData = data;

    try {
      if (currentUser?.id) {
        mutate(
          (current) => {
            const source = current?.data ?? endorsements;

            return {
              data: source.map((category) => ({
                ...category,
                skills: category.skills.map((skill) =>
                  skill.id === skillId
                    ? {
                        ...skill,
                        users: skill.users.some(
                          (user) => user.id === currentUser.id,
                        )
                          ? skill.users
                          : [
                              ...skill.users,
                              {
                                id: currentUser.id ?? '',
                                name: currentUser.name ?? 'You',
                                email: currentUser.email ?? '',
                                image: currentUser.picture,
                              },
                            ],
                      }
                    : skill,
                ),
              })),
            };
          },
          { revalidate: false },
        );
      }

      const response = await fetch('/api/endorsements', {
        method: 'POST',
        body: JSON.stringify({ skillId }),
      });

      if (!response.ok) {
        const json = await response.json();
        const message =
          json.message ?? 'There was a problem endorsing this skill.';
        throw new Error(message);
      }
    } catch (error) {
      mutate(previousData, { revalidate: false });
      throw error;
    } finally {
      mutate();
    }
  };

  const removeEndorsement = async (skillId: string) => {
    const previousData = data;

    try {
      if (currentUser?.id) {
        mutate(
          (current) => {
            const source = current?.data ?? endorsements;

            return {
              data: source.map((category) => ({
                ...category,
                skills: category.skills.map((skill) =>
                  skill.id === skillId
                    ? {
                        ...skill,
                        users: skill.users.filter(
                          (user) => user.id !== currentUser.id,
                        ),
                      }
                    : skill,
                ),
              })),
            };
          },
          { revalidate: false },
        );
      }

      const response = await fetch('/api/endorsements', {
        method: 'DELETE',
        body: JSON.stringify({ skillId }),
      });

      if (!response.ok) {
        const json = await response.json();
        const message =
          json.message ?? 'There was a problem removing this endorsement.';
        throw new Error(message);
      }
    } catch (error) {
      mutate(previousData, { revalidate: false });
      throw error;
    } finally {
      mutate();
    }
  };

  return {
    endorsements,
    isLoading,
    error,
    mutate,
    addEndorsement,
    removeEndorsement,
  };
};

export default useEndorsements;
