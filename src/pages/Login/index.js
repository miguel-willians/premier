import { Text, View } from 'react-native';
import InputText from '../../components/InputText/index';
import CustomButton from '../../components/CustomButton/index';
import { Card } from 'react-native-paper';
import { styles } from './style';
import { useState } from 'react';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View>
          <Text style={styles.paragraph}>Premier</Text>
          <Text style={styles.subtitle}>Sistema de controle de estoque</Text>
        </View>

        <InputText
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          disabled={false}
        />
        <InputText
          label="Senha"
          placeholder=""
          value={password}
          onChangeText={setPassword}
          disabled={false}
        />
        <CustomButton onPress={() => navigation.navigate("Home")}>Entrar</CustomButton>
      </Card>
    </View>
  );
}
