import React, { FC, ComponentProps } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../colors';

type Props = ComponentProps<typeof Pressable> & {
  text: string;
  isGoogle?: boolean;
  type?: 'primary' | 'secondary'
};

export const StyledButton: FC<Props> = ({ text, isGoogle, type='primary', ...props }) => (
  <Pressable
    style={[
      stylesheet.button,
      type === 'primary' ? stylesheet.primary : stylesheet.secondary,
      isGoogle ? stylesheet.google : null,
    ]}
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
  },
  primary: {
    backgroundColor: '#9B59B6',
  },
  secondary: {
    backgroundColor: colors.dark,
    color: colors.white,
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
