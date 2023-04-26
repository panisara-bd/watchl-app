import { StyleSheet } from 'react-native';

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export const authStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textLarge: {
    marginVertical: 15,
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  textMedium: {
    marginVertical: 10,
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  textSmall: {
    marginVertical: 10,
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#27282C',
    color: '#fff',
    borderRadius: 5,
  },
  pressableMain: {
    margin: 10,
    padding: 10,
    width: 280,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#9B59B6',
  },
  pressableMainText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600' as FontWeight,
  },
  pressableText: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#9B59B6',
    fontWeight: '600' as FontWeight,
  },
  google: {
    margin: 10,
    padding: 10,
    width: 280,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#4285F4',
  }
});
