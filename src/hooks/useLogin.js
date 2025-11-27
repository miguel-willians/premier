import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apis/apiAuth";
import { useToast } from "react-native-toast-notifications";

export function useLogin({ navigation }) {
  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      // O Supabase retorna { user, session }
      console.log(data);
      toast.show("Usuário logado com sucesso", {
        type: "success",
        placement: "top",
      });
      queryClient.setQueryData(["user"], data.user);

      navigation.replace("MainApp");
    },

    onError: (err) => {
      console.log("LOGIN ERROR:", err.message);
      if (err.message === "Invalid login credentials") {
        toast.show("E-mail ou senha incorretos.", {
          type: "danger",
          placement: "top",
        });
      } else {
        toast.show("Erro. Tente novamente mais tarde.", {
          type: "danger",
          placement: "top",
        });
      }
    },
  });

  return { login, isLoading };
}
