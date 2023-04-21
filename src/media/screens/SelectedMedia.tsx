import { Text, StyleSheet, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { fetchMedia } from '../helpers/get-movies';
import { useEffect, useState } from 'react';

type Props = {
  id: string
}

export default function selectedMedia({id}: Props) {


  return (
    <>
     
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