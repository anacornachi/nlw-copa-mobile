import {useRoute} from '@react-navigation/native';
import {HStack, useToast, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {Share} from 'react-native';
import {EmptyMyPollList} from '../components/EmptyMyPollList';
import {Guesses} from '../components/Guesses';
import {Header} from '../components/Header';
import Loading from '../components/Loading';
import {Option} from '../components/Option';
import {PollPros} from '../components/PollCard';
import {PollHeader} from '../components/PollHeader';
import {api} from '../services/api';

interface RouteParams {
  id: string;
}

export default function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [pollDetails, setPollDetails] = useState<PollPros>({} as PollPros);
  const [selectedOption, setSelectedOption] = useState<'guesses' | 'ranking'>(
    'guesses'
  );

  const route = useRoute();
  const toast = useToast();

  const {id} = route.params as RouteParams;

  async function fetchPollDetails() {
    try {
      setIsLoading(true);

      const {data} = await api.get(`/polls/${id}`);
      setPollDetails(data.poll);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os dados do bolão',
        placement: 'top',
        bg: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {pollDetails._count?.participants > 0 ? (
        <VStack>
          <PollHeader data={pollDetails} />

          <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={selectedOption === 'guesses'}
              onPress={() => setSelectedOption('guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={selectedOption === 'ranking'}
              onPress={() => setSelectedOption('ranking')}
            />
          </HStack>

          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <VStack>
          <EmptyMyPollList code={pollDetails.code} />
        </VStack>
      )}
    </VStack>
  );
}
