import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUserRole } from "../services/apis/apiUserRole";

export function useUserRole() {
  const {
    data: role,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userRole"],
    queryFn: getAuthenticatedUserRole,
  });

  return { role, isLoading, error };
}
