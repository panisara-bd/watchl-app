import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { getMediaById } from '../helpers/get-media';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { StyledText } from '../../design-system/components/StyledText';
import { useToken } from '../../auth/UserContext';
import ScheduleMedia from './ScheduleMedia';
import { StyledButton } from '../../design-system/components/StyledButton';
import { colors } from '../../design-system/colors';
import StyledModal from '../../design-system/components/StyledModal';
import { Media } from '../types';

type Props = {
  id: string;
};

export default function SelectedMedia({ id }: Props) {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width - 60;
  const imageHeight = Math.round((imageWidth * 16) / 9);

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
    <ScrollView style={styles.container}>
      <StyledText size="lg">
        {mediaResult?.title}
      </StyledText>
      <StyledButton
        onPress={() => setShowScheduleForm(true)}
        text="Schedule this media"
      />
      <StyledModal isVisible={showScheduleForm}>
        <ScheduleMedia closeModal={() => setShowScheduleForm(false)} id={id} media={mediaResult} />
      </StyledModal>
      <View style={{flex: 1, height: 1, backgroundColor: colors.darkGray, marginVertical: 10}} />
      <StyledText size="sm" style={styles.secondaryText}>
       {mediaResult?.titleType === 'movie' ? 'Movie' : 'TV Show'}{"\n"}
       {mediaResult?.year ? `Year: ${mediaResult.year}` : ''}
      </StyledText>
      <StyledText size="sm" style={styles.secondaryText}>
        Run Time: {mediaResult?.runningTimeInMinutes} minutes
      </StyledText>
      <Image 
        source={mediaResult?.image?.url}
        style={{ width: imageWidth, height: imageHeight, alignContent: 'center', marginVertical: 20 }}
        placeholder={mediaResult?.title}
      />
      <StyledText size="sm" style={styles.secondaryText}>
        Plot summary: {"\n"}{mediaResult?.summary}
      </StyledText>
      <StyledButton type="secondary" onPress={() => router.back()} text="Back" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  secondaryText: {
    color: colors.ash,
    marginVertical: 0,
    paddingVertical: 0,
    textAlign: 'left',
  },
});
