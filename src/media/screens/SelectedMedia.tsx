import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
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
  const imageWidth = dimensions.width - 80;
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
    <ScrollView>
      <StyledText size="lg">
        {mediaResult?.title}
        {mediaResult?.year ? ` (${mediaResult.year})` : ''}
      </StyledText>
      <StyledText size="sm" style={styles.secondaryText}>
        {mediaResult?.titleType === 'movie' ? 'Movie' : 'TV Show'}
      </StyledText>
      <StyledText size="sm" style={styles.secondaryText}>
        Run Time: {mediaResult?.runningTimeInMinutes} minutes
      </StyledText>
      <StyledButton
        onPress={() => setShowScheduleForm(true)}
        text="Schedule this media"
      />
      <StyledModal isVisible={showScheduleForm}>
        <ScheduleMedia closeModal={() => setShowScheduleForm(false)} id={id} media={mediaResult} />
      </StyledModal>
      <StyledButton type="secondary" onPress={() => router.back()} text="Back" />
      <Image
        source={mediaResult?.image?.url}
        style={{ width: imageWidth, height: imageHeight }}
        placeholder={mediaResult?.title}
        contentFit="scale-down"
      />
      <StyledText size="sm" style={styles.secondaryText}>
        Plot summary: {mediaResult?.summary}
      </StyledText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  secondaryText: {
    color: colors.ash,
    marginVertical: 0,
    textAlign: 'left',
  },
});
