import { useEffect, useState } from 'react';
import { useToken } from './auth/UserContext';
import { StyledText } from './design-system/components/StyledText';
import { ScheduledMedia } from './media/types';
import { getAllSchedule } from './media/helpers/get-schedule';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { colors } from './design-system/colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { formatTime } from './media/helpers/format-time';
import { deleteScheduledMedia } from './media/helpers/delete-scheduled-media';

export default function HomeScreen() {
  const [schedule, setSchedule] = useState<ScheduledMedia[]>([]);
  const router = useRouter();
  const token = useToken();

  useEffect(() => {
    getAllSchedule(token).then((result) => setSchedule(result || []));
  }, []);

  const today = new Date();
  const upcoming = schedule.filter(
    (scheduledMedia) => new Date(scheduledMedia.time) > today
  );

  const unschedule = async (time: string) => {
    await deleteScheduledMedia(token, time);
    setSchedule(oldSchedule => oldSchedule.filter(scheduledMedia => scheduledMedia.time !== time))
  }

  return (
    <>
      <StyledText size="lg">Welcome to WatchL</StyledText>
      <StyledText size="lg">Upcoming</StyledText>
      {upcoming.map((scheduledMedia) => (
        <Pressable
          key={scheduledMedia.time}
          onPress={() => router.push(`/media/${scheduledMedia.mediaId}`)}
          style={styles.scheduledMedia}
        >
          <Image
            source={scheduledMedia.media.image.url}
            style={styles.scheduledMediaImage}
          />
          <View style={styles.scheduledMediaContent}>
            <StyledText size="md" style={styles.scheduledMediaTitle}>
              {scheduledMedia.media.title}
            </StyledText>
            <StyledText size="sm" style={styles.scheduledMediaDetail}>
              {formatTime(new Date(scheduledMedia.time))}
            </StyledText>
            {scheduledMedia.location && (
              <StyledText size="sm" style={styles.scheduledMediaDetail}>
                Location: {scheduledMedia.location}
              </StyledText>
            )}
            {scheduledMedia.details && (
              <StyledText size="sm" style={styles.scheduledMediaDetail}>
                Details: {scheduledMedia.details}
              </StyledText>
            )}
            {scheduledMedia.invites && scheduledMedia.invites.length > 0 && (
              <StyledText size="sm" style={styles.scheduledMediaDetail}>
                Invites: {scheduledMedia.invites.join(', ')}
              </StyledText>
            )}
            <Pressable onPress={() => unschedule(scheduledMedia.time)} style={styles.deleteButton}>
              <MaterialIcons name="close" size={24} color={colors.white} />
              <Text style={styles.deleteButtonText}>Unschedule</Text>
            </Pressable>
          </View>
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  scheduledMedia: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  scheduledMediaContent: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  scheduledMediaImage: {
    width: 100,
    height: 200,
    marginRight: 10,
  },
  scheduledMediaTitle: {
    marginVertical: 0,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scheduledMediaDetail: {
    textAlign: 'left',
    marginVertical: 2,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#3d3d3d',
    padding: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonText: {
    paddingRight: 8,
    paddingLeft: 4,
    color: colors.white,
  },
});
