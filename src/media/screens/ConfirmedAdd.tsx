import { ScrollView } from 'react-native';
import { getAllSchedule } from '../helpers/get-schedule';
import { useToken } from '../../auth/UserContext';
import { useEffect, useState } from 'react';
import { StyledText } from '../../design-system/components/StyledText';
import { Media } from '../types';

type Props ={
  timeScheduled: string;
}

type Schedule = {
  userId: string;
  media: { title: string; titleType: string; year: string };
  time: string;
  location?: string;
  details?: string;
  invites?: string[];
};

type ScheduledMedia = {
  userId: string;
  mediaId: string;
  media: Media;
  time: string;
  location?: string;
  details?: string;
  invites?: string[];
};

export default function ConfirmedAdd( {timeScheduled}: Props) {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const token = useToken();

  useEffect(() => {
    getAllSchedule(token)
      .then((result) => setSchedule(result))
      .catch((e) => console.log(e));
    console.log(schedule);
  }, []);

  const confirmedAdd = schedule.find(scheduledMedia => scheduledMedia.time === timeScheduled)

  return (
    <ScrollView>
     <StyledText size="md">{confirmedAdd?.media.title}</StyledText>
      <StyledText size="md">
        Hello jewp = {schedule.map((media) => media?.media?.title).join(', ')}
      </StyledText>
    </ScrollView>
  );
}
