import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { colors } = useTheme();

  const navigation = useNavigation();


  function handleSignUp(){
  setIsLoading(true)

  if(confirmPassword != password){
    Alert.alert('Criar Conta', 'As senhas precisam ser iguais.');
    setIsLoading(false)
  }
  if(!email || !password){
    Alert.alert('Criar Conta', 'Por favor digite e-mail e senha.');
    setIsLoading(false)
  }
  else{
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      setIsLoading(false)
      navigation.navigate('home')
    })
    .catch(error =>{
      console.log(error)
      setIsLoading(false)

      if (error.code === 'auth/invalid-email') {
        return Alert.alert('Criar conta', 'E-mail inválido.');
      }

      if (error.code === 'auth/weak-password') {
        return Alert.alert('Criar conta', 'A senha deve conter no minimo 6 caracteres');
      }
      
    })

  }
  }
  
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Crie sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />

      <Input
        mb={4}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

<Input
        mb={4}
        placeholder="Confirme a Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <Button 
        title="Criar Conta" 
        w="full" 
        onPress={handleSignUp} 
        isLoading={isLoading}
      />
    </VStack>
  );
}