import { useSearchParams } from 'expo-router';
import ConfirmedAdd from '../../src/media/screens/ConfirmedAdd';

export default function ConfirmedAddScreen() {
  const { time } = useSearchParams();
  return !time || Array.isArray(time) ? null : (
    <ConfirmedAdd timeScheduled={time} />
  );
}
