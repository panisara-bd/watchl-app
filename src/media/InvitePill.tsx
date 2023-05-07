import { Pressable, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyledText } from '../design-system/components/StyledText';
import { colors } from '../design-system/colors';

type Props = {
  invite: string;
  removeInvite: () => void;
};

export default function InvitePill({ invite, removeInvite }: Props) {
  return (
    <View style={stylesheet.container}>
      <StyledText size="md" style={stylesheet.inviteText}>
        {invite}
      </StyledText>
      <Pressable style={stylesheet.icon} onPress={removeInvite}>
        <MaterialIcons name="remove" size={20} color="white" />
      </Pressable>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  inviteText: {
    paddingLeft: 10,
  },
  icon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
