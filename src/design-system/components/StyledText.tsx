import React, { FC, ComponentProps, PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Text> & {
  size: 'sm' | 'md' | 'lg';
};

export const StyledText: FC<PropsWithChildren<Props>> = ({
  children,
  size,
  ...props
}) => (
  <Text
    style={[
      stylesheet.textBase,
      size === 'sm' ? stylesheet.textSmall : null,
      size === 'md' ? stylesheet.textMedium : null,
      size === 'lg' ? stylesheet.textLarge : null,
    ]}
    {...props}
  >
    {children}
  </Text>
);

const stylesheet = StyleSheet.create({
  textBase: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  textSmall: {
    fontSize: 13,
  },
  textMedium: {
    fontSize: 15,
  },
  textLarge: {
    fontSize: 30,
  },
});
