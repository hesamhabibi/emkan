import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/500?url=${router.asPath}`);
  }, []);

  return null;
}
