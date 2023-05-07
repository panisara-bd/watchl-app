import { ActivityIndicator, View, StyleSheet, ScrollView, Text } from 'react-native';
import { StyledTextInput } from '../../design-system/components/StyledTextInput';
import { useState } from 'react';
import { StyledButton } from '../../design-system/components/StyledButton';
import { StyledText } from '../../design-system/components/StyledText';
import { scheduleMedia } from '../helpers/post-media';
import { useToken } from '../../auth/UserContext';
import { useRouter } from 'expo-router';
import { colors } from '../../design-system/colors';
import InvitePill from '../InvitePill';
import InviteField from '../InviteField';
import { useAsyncOperation } from '../useAsyncOperation';
import { MaterialIcons } from '@expo/vector-icons';
import { Media } from '../types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime } from '../helpers/format-time';

type Props = {
  id: string;
  media: Media | undefined;
  closeModal: () => void;
};

export default function ScheduleMedia({ id, closeModal, media }: Props) {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [invites, setInvites] = useState<string[]>([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const token = useToken();
  const {
    isLoading,
    error,
    handle: schedule,
  } = useAsyncOperation(async () => {
    await scheduleMedia(token, {
      mediaId: id,
      time: time.toISOString(),
      location,
      details,
      invites,
    });
    setIsSuccess(true);
  });

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loading} />
  }

  if (isSuccess) {
    return <View style={styles.success}>
      <StyledText size="lg">Scheduled!</StyledText>
      <MaterialIcons name="check" size={64} color={colors.white} />
      <Text style={styles.successDescription}>
        <StyledText size="md" style={{ fontWeight: 'bold' }}>{media?.title}</StyledText>
        <StyledText size="md"> was successfully scheduled for {formatTime(time)}.</StyledText>
      </Text>
      <StyledButton onPress={() => router.push('/')} text="Done" />
    </View>
  }

  return (
    <ScrollView>
      <DateTimePicker mode="datetime" onChange={(event, date) => { if (date) { setTime(date); }}} value={time} display="spinner" themeVariant='dark' />
      <StyledTextInput
        onChangeText={setLocation}
        value={location}
        placeholder="Location"
      />
      <StyledTextInput
        onChangeText={setDetails}
        value={details}
        placeholder="Details"
      />
      <InviteField
        addInvite={(newInvite) => {
          if (newInvite && !invites.includes(newInvite)) {
            setInvites([...invites, newInvite]);
          }
        }}
      />
      <View style={styles.invites}>
        {invites.map((invite) => (
          <InvitePill
            key={invite}
            invite={invite}
            removeInvite={() =>
              setInvites(invites.filter((prevInvite) => prevInvite !== invite))
            }
          />
        ))}
      </View>
      {error && (
        <StyledText size="md" style={styles.error}>
          There was an error trying to schedule this. Please try again.
        </StyledText>
      )}
      <StyledButton
        onPress={schedule}
        text="Schedule"
        disabled={isLoading}
      />
      <StyledButton type="secondary" onPress={closeModal} text="Cancel" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginVertical: 24,
  },
  success: {
    alignItems: 'center',
    marginHorizontal: 12
  },
  successDescription: {
    marginVertical: 10,
  },
  invites: {
    margin: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  error: {
    color: colors.error,
    marginVertical: 0,
    marginHorizontal: 12,
  },
});
