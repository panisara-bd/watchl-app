import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { getMediaById } from '../helpers/get-media';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyledText } from '../../design-system/components/StyledText';
import { useToken } from '../../auth/UserContext';
import ScheduleMedia from './ScheduleMedia';
import { StyledButton } from '../../design-system/components/StyledButton';

type Props = {
  id: string;
};

type Media = {
  title: string;
  titleType: string;
  year: string;
  image: {
    height: number;
    url: string;
    width: number;
  };
  runningTimeInMinutes: number;
  summary: string;
};

export default function SelectedMedia({ id }: Props) {
  const [mediaResult, setMediaResult] = useState<Media>();
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const router = useRouter();
  const token = useToken();

  const getMedia = async () => {
    try {
      const result = await getMediaById(token, id);
      setMediaResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <ScrollView>
      <StyledText size="lg">{mediaResult?.title}</StyledText>
      <Text style={styles.text}>{mediaResult?.titleType}</Text>
      <Text style={styles.text}>
        Run Time: {mediaResult?.runningTimeInMinutes} minutes
      </Text>
      <Text style={styles.text}>Year: {mediaResult?.year}</Text>
      <Text style={styles.text}>Plot summary: {mediaResult?.summary}</Text>
      <Image
        source={mediaResult?.image?.url}
        style={{
          width: mediaResult?.image?.width,
          height: mediaResult?.image?.height,
        }}
        placeholder={mediaResult?.title}
        contentFit="contain"
      />
      <Text
        style={styles.text}
        onPress={() => {
          router.push('/');
        }}
      >
        Back
      </Text>
      <StyledButton onPress={() => setShowScheduleForm(true)} text='Schedule this media' />
      <ScheduleMedia isVisible={showScheduleForm} id={id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
