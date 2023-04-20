import { Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { fetchMedia } from '../../auth/helpers/get-movies';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const getResult = async () => {
    const res = await fetchMedia('cleveland show');
    setName(res.results[0].title);
    setImage(res.results[0].image.url)
    return;
  };

  useEffect(() => {
    getResult();
  }, []);

  console.log(name);

  return (
    <>
      <Text>Movie {name}</Text>
      <Image
        style={styles.image}
        source={image}        
      />
    </>
  );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: '50%',
      height: '50%',
    },
  });