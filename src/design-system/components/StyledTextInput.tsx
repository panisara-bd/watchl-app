import React, { FC, ComponentProps } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../colors';

type Props = ComponentProps<typeof TextInput> & {
  isSearchBar?: boolean;
};

export const StyledTextInput: FC<Props> = ({ isSearchBar, style, ...props }) => (
  <TextInput
    style={[stylesheet.input, isSearchBar ? stylesheet.searchBar : null, style]}
    placeholderTextColor="#8B8B8B"
    {...props}
  />
);

const stylesheet = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: colors.darkGray,
    color: colors.white,
    borderRadius: 5,
  },
  searchBar: {
    backgroundColor: '#BDC3C7',
  },
});
