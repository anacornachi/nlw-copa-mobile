import {Heading, useToast, VStack} from 'native-base';
import {Header} from '../components/Header';
import {Input} from '../components/Input';
import Button from '../components/Button';
import {useState} from 'react';
import {api} from '../services/api';
import {useNavigation} from '@react-navigation/native';

export default function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [code, setCode] = useState('');

  const {navigate} = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bg: 'red.500',
        });
      }

      await api.post('/polls/join', {code});

      toast.show({
        title: 'Você entrou no bolão',
        placement: 'top',
        bg: 'green.500',
      });

      navigate('polls');
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.message === 'Poll not found') {
        return toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bg: 'red.500',
        });
      }
      if (
        error.response?.data?.message === 'You have already joined this poll'
      ) {
        return toast.show({
          title: 'Você já está participando deste bolão',
          placement: 'top',
          bg: 'red.500',
        });
      }
      toast.show({
        title: 'Não foi possível entrar no bolão',
        placement: 'top',
        bg: 'red.500',
      });
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {'\n'} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
