import { Link } from 'expo-router';
import React, { FC, ComponentProps, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Link>;

export const StyledLink: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => (
  <Link style={stylesheet.link} {...props}>
    {children}
  </Link>
);

const stylesheet = StyleSheet.create({
  link: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#9B59B6',
  },
});
