import {Heading, Text, useToast, VStack} from 'native-base';
import {Header} from '../components/Header';
import Logo from '../assets/logo.svg';
import {Input} from '../components/Input';
import Button from '../components/Button';
import {api} from '../services/api';
import {useState} from 'react';

export default function NewPoll() {
  const [pollTitle, setPollTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePollCreation() {
    if (!pollTitle.trim()) {
      return toast.show({
        title: 'Informe o título para seu bolão',
        placement: 'top',
        bg: 'red.500',
      });
    }
    try {
      setIsLoading(true);
      await api.post('/polls', {
        title: pollTitle,
      });

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bg: 'green.500',
      });

      setPollTitle('');
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bg: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setPollTitle}
          value={pollTitle}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePollCreation}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após cirar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
