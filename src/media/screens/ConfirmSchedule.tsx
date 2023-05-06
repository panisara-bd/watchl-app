import { ScrollView } from 'react-native';
import { getAllSchedule } from '../helpers/get-schedule';
import { useToken } from '../../auth/UserContext';
import { useEffect, useState } from 'react';
import { StyledText } from '../../design-system/components/StyledText';

type Media = {
  id: string;
  image: {
    height: number;
    url: string;
    width: number;
  };
  runningTimeInMinutes: number;
  nextEpisode?: string;
  numberOfEpisodes?: string;
  title: string;
  titleType: string;
  year: string;
  rating: string;
  genres: string;
  summary: string;
};

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

export default function ConfirmSchedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const token = useToken();

  useEffect(() => {
    getAllSchedule(token)
      .then((result) => setSchedule(result))
      .catch((e) => console.log(e));
    console.log(schedule);
  }, []);

  return (
    <ScrollView>
      <StyledText size="md">
        Hello jewp = {schedule.map((media) => media?.media?.title)}
      </StyledText>
    </ScrollView>
  );
}
