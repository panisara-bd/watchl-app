export type Media = {
  id: string;
  title: string;
  titleType: 'movie' | 'tvSeries';
  image: {
    height: number;
    url: string;
    width: number;
  };
  runningTimeInMinutes?: number;
  year?: string;
  numberOfEpisodes?: string;
  rating?: string;
  genres?: string;
  summary?: string;
};

export type ScheduledMedia = {
  userId: string;
  mediaId: string;
  media: Media;
  time: string;
  location?: string;
  details?: string;
  invites?: string[];
};