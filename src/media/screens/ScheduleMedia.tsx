import { FlatList, Modal, View } from 'react-native';
import { StyledTextInput } from '../../design-system/components/StyledTextInput';
import { useState } from 'react';
import { StyledButton } from '../../design-system/components/StyledButton';
import { StyledText } from '../../design-system/components/StyledText';
import { scheduleMedia } from '../helpers/post-media';
import { useToken } from '../../auth/UserContext';

type Props = {
    id: string;
    isVisible: boolean;
  };

export default function ScheduleMedia({ id, isVisible }: Props) {
  const mediaId = id;
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [friend, setFriend] = useState('');
  const [invites, setInvites] = useState<string[]>([]);

  const token = useToken();

  const renderItem = ({ item: invite }: { item: string }) => {
    return <StyledText size="md">{invite}</StyledText>;
  };

  const onSubmit = async () => {
    try {
      await scheduleMedia(token, {
        mediaId,
        time,
        location,
        details,
        invites,
      });
    } catch {
      alert('Please fill in the required details');
    }
  };
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View>
        <StyledTextInput
          onChangeText={setTime}
          value={time}
          placeholder="Time"
        />
        <StyledTextInput
          onChangeText={setLocation}
          value={location}
          placeholder="Location"
        />
        <StyledTextInput
          onChangeText={setDetails}
          value={details}
          placeholder="details"
        />
        <StyledTextInput
          onChangeText={setFriend}
          value={friend}
          placeholder="Invite a friend"
        />
        
        <StyledButton
          onPress={() => setInvites([...invites, friend])}
          text={'+'}
        />
        <FlatList
          data={invites}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
        <StyledButton onPress={onSubmit} text="Schedule this" />
      </View>
    </Modal>
  );
}
