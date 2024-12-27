const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(input, init);

  // Sometimes the body can be empty, and the json() will throw an error.
  if (response.status === 204) {
    return JSON.parse('{}');
  }

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  return (await response.json()) as T;
};

export default fetcher;
