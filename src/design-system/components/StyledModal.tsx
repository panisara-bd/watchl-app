import { Modal, View, StyleSheet, Dimensions } from 'react-native';
import { PropsWithChildren } from 'react';
import { colors } from '../../design-system/colors';

type Props = {
  isVisible: boolean;
};

export default function StyledModal({
  isVisible,
  children,
}: PropsWithChildren<Props>) {
  const dimensions = Dimensions.get('window');
  const maxHeight = dimensions.height * 0.9;

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <View style={styles.overlay}>
        <View style={[styles.content, { maxHeight }]}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.dark,
    paddingTop: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});
