import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { fetchMedia } from '../helpers/get-movies';
import { useState } from 'react';

type ItemData = {
  id: string;
  l: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.l}</Text>
  </TouchableOpacity>
);

export default function SearchMedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDdebounceTimeout] = useState<NodeJS.Timeout>();
  const [selectedId, setSelectedId] = useState<string>();

  const getResult = async () => {
    const res = await fetchMedia(searchQuery);
    setSearchResults(res.d);
    return;
  };

  const onSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(getResult, 500);
    setDdebounceTimeout(timeout);
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <>
      <TextInput
        onChangeText={onSearchChange}
        value={searchQuery}
        placeholder="Search here"
      ></TextInput>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '50%',
    height: '50%',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
