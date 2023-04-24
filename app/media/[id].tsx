
import { useSearchParams } from 'expo-router';
import SelectedMedia from '../../src/media/screens/SelectedMedia';

export default function Media() {
    const { id } = useSearchParams();
  return (!id || Array.isArray(id) ? null : <SelectedMedia id={id} />)
}
