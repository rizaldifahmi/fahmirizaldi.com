import { useEffect, useState } from 'react';

const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
};

export default useMounted;
