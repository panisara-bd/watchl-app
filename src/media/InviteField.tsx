import { Pressable, View, StyleSheet } from 'react-native';
import { StyledTextInput } from '../design-system/components/StyledTextInput';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  addInvite: (newInvite: string) => void;
};

export default function InviteField({ addInvite }: Props) {
  const [newInvite, setNewInvite] = useState('');

  return (
    <View style={stylesheet.container}>
      <StyledTextInput
        style={stylesheet.textInput}
        onChangeText={setNewInvite}
        value={newInvite}
        placeholder="Invite a friend"
      />
      <Pressable
        style={stylesheet.icon}
        onPress={() => {
          addInvite(newInvite);
          setNewInvite('');
        }}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 12,
  },
  textInput: {
    flexGrow: 1,
    marginRight: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  icon: {
    marginVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27282C',
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});
