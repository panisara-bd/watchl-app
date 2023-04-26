import React, { FC, ComponentProps } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type Props = ComponentProps<typeof Pressable> & {
  text: string;
  isGoogle?: boolean;
};

export const StyledButton: FC<Props> = ({ text, isGoogle, ...props }) => (
  <Pressable
    style={[stylesheet.button, isGoogle ? stylesheet.google : null]}
    {...props}
  >
    <Text style={stylesheet.text}>{text}</Text>
  </Pressable>
);

const stylesheet = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    width: 280,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#9B59B6',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  google: {
    backgroundColor: '#4285F4',
  },
});
