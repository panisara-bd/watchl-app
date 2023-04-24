import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import { fetchMedia } from '../helpers/get-movies';
import { useState } from 'react';
import { Link } from 'expo-router';

type ItemData = {
  id: string;
  l: string;
  q: string;
  y: string;
};

type ItemProps = {
  item: ItemData;
};

const Item = ({ item }: ItemProps) => (
  <Link href={`/media/${item.id}`} asChild>
    <Pressable>
      {() => (
        <>
          <Text style={[styles.title]}>{item.l}</Text>
          <Text>
            {item.q} ({item.y})
          </Text>
        </>
      )}
    </Pressable>
  </Link>
);

export default function SearchMedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const getResult = async () => {
    try {
      const res = await fetchMedia(searchQuery);
      setSearchResults(res.d);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(getResult, 500);
    setDebounceTimeout(timeout);
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    return <Item item={item} />;
  };

  return (
    <>
      <TextInput
        onChangeText={onSearchChange}
        value={searchQuery}
        placeholder="Search here"
      ></TextInput>
      <SafeAreaView>
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 30,
    padding: 20,
  },
  title: {
        fontSize: 14,
  },
});
