import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apis/apiAuth";
import { useToast } from "react-native-toast-notifications";

export function useSignup() {
  const toast = useToast();

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.show("Usuário criado com sucesso!", {
        type: "success",
        placement: "top",
      });
    },

    onError: (err) => {
      toast.show(
        err.message || "Algo deu errado. Tente novamente mais tarde.",
        {
          type: "danger",
          placement: "top",
        }
      );
    },
  });

  return { signup, isLoading, error };
}
