import { Text, View } from "react-native";
import InputText from "../../components/InputText/index";
import CustomButton from "../../components/CustomButton/index";
import { Card } from "react-native-paper";
import { styles } from "./style";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useLogin";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export default function Login({ navigation }) {
  const { login, isLoading } = useLogin({ navigation });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data) {
    login(data);
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View>
          <Text style={styles.paragraph}>Premier</Text>
          <Text style={styles.subtitle}>Sistema de controle de estoque</Text>
        </View>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputText
              label="E-mail"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputText
              label="Senha"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />

        <CustomButton disabled={isLoading} onPress={handleSubmit(onSubmit)}>
          {isLoading ? "Entrando..." : "Entrar"}
        </CustomButton>
      </Card>
    </View>
  );
}
