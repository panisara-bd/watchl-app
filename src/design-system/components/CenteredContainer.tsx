import React, { FC, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

export const CenteredContainer: FC<PropsWithChildren> = ({ children }) => (
  <View style={stylesheet.container}>{children}</View>
);

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
