import { useEffect, useState } from "react";

export function useLoading() {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      setIsLoading(false);
   }, []);

   return { isLoading };
}

