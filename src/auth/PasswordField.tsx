import { Pressable, View, StyleSheet } from 'react-native';
import { StyledTextInput } from '../design-system/components/StyledTextInput';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export default function PasswordField({ password, setPassword }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={stylesheet.container}>
      <StyledTextInput
        style={stylesheet.textInput}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry={!isPasswordVisible}
      />
      <Pressable
        style={stylesheet.icon}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <MaterialIcons
          name={!isPasswordVisible ? 'visibility' : 'visibility-off'}
          size={24}
          color="white"
        />
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
    backgroundColor:'#27282C',
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
   }
});
