import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apis/apiAuth";
import { useToast } from "react-native-toast-notifications";

export function useLogout({ navigation }) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      // Limpa o usuário do cache global
      queryClient.removeQueries(["user"]);

      // Redireciona para login (limpa o stack)
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

      toast.show("Sessão encerrada com sucesso", {
        type: "success",
        placement: "top",
      });
    },

    onError: (err) => {
      console.log("LOGIN ERROR:", err.message);
      toast.show("Algo deu errado. Tente novamente mais tarde.", {
        type: "danger",
        placement: "top",
      });
    },
  });

  return { logout, isLoading };
}
