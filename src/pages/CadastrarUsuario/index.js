import { Text, View, ScrollView, Switch } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "../../layout";
import InputText from "../../components/InputText";
import CustomButton from "../../components/CustomButton";
import { useSignup } from "../../hooks/useSignup";

const createUserSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme a senha"),
    role: z.enum(["admin", "funcionario"], {
      errorMap: () => ({ message: "Selecione uma opção" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function CadastrarUsuario() {
  const { signup, isLoading } = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "funcionario",
    },
  });

  const onSubmit = (data) => {
    signup({
      email: data.email,
      password: data.password,
      role: data.role,
    });
  };

  return (
    <Layout>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Criar Novo Usuário
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputText
                label="Email"
                placeholder="usuario@empresa.com"
                value={field.value}
                onChangeText={field.onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <InputText
                label="Senha"
                placeholder="********"
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <InputText
                label="Confirmar Senha"
                placeholder="********"
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}
                >
                  Admin?
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Switch
                    value={field.value === "admin"}
                    onValueChange={(isAdmin) =>
                      field.onChange(isAdmin ? "admin" : "funcionario")
                    }
                  />
                  <Text>{field.value === "admin" ? "Sim (Admin)" : "Não"}</Text>
                </View>

                {errors.role && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {errors.role.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <CustomButton onPress={handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Usuário"}
          </CustomButton>
        </View>
      </ScrollView>
    </Layout>
  );
}
