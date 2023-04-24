import { Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { fetchById } from '../helpers/get-movies';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

type Props = {
  id: string;
};

type Media = {
  title: string
  titleType: string
  year: string
  image: {
    url: string
  }
}

export default function SelectedMedia({ id }: Props) {
  const [mediaResult, setMediaResult] = useState<Media>();

  const router = useRouter();

  const getMedia = async () => {
    try {
      const result = await fetchById(id);
      setMediaResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <Text>{mediaResult?.title}</Text>
      <Text>
        {mediaResult?.titleType} ({mediaResult?.year})
      </Text>
      <Image
        style={styles.image}
        source={mediaResult?.image?.url}
        placeholder={mediaResult?.title}
        contentFit="contain"
      />
      <Text
        onPress={() => {
          router.push('/index');
        }}
      >
        back
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 250,
  },
});
