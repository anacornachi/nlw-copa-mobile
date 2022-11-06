import {Icon, useToast, VStack, FlatList} from 'native-base';
import Button from '../components/Button';
import {Header} from '../components/Header';
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {api} from '../services/api';
import {useCallback, useState} from 'react';
import {PollCard, PollPros} from '../components/PollCard';
import Loading from '../components/Loading';
import {EmptyPollList} from '../components/EmptyPollList';
import {useFocusEffect} from '@react-navigation/native';

export default function Polls() {
  const {navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PollPros[]>([]);

  const toast = useToast();

  async function fetchPolls() {
    try {
      setIsLoading(true);
      const {data} = await api.get('polls');
      setPolls(data.polls);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bg: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls();
    }, [])
  );

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={<Octicons />} name="search" color="black" size="md" />
          }
          onPress={() => navigate('findPolls')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <PollCard
              data={item}
              onPress={() => navigate('details', {id: item.id})}
            />
          )}
          ListEmptyComponent={() => <EmptyPollList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{paddingBottom: 10}}
          px={5}
        />
      )}
    </VStack>
  );
}
