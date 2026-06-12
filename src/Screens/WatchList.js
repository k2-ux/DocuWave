import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../components/theme';

const {width} = Dimensions.get('window');
const COLUMNS = 2;
const GAP = 12;
const H_PAD = 16;
const CARD_WIDTH = (width - H_PAD * 2 - GAP) / COLUMNS;

const WatchList = ({navigation}) => {
  const data = useSelector(state => state.watchlist.data);

  const renderItem = useCallback(({item}) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => navigation.navigate('DocumentaryDetail', item)}>
      <Image
        style={styles.poster}
        source={{uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`}}
      />
      <View style={styles.titleBar}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Icon name="bookmark-outline" size={64} color={theme.textDim} />
      <Text style={styles.emptyTitle}>Watchlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add films from the Explore tab
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <View style={styles.headerWrapper}>
        <Header
          title="Watchlist"
          onClickLeftIcon={() => navigation.toggleDrawer()}
        />
      </View>
      <FlatList
        data={data}
        numColumns={COLUMNS}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          data.length === 0 ? styles.listEmpty : styles.list
        }
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  headerWrapper: {
    paddingHorizontal: H_PAD,
  },
  list: {
    paddingHorizontal: H_PAD,
    paddingBottom: 24,
  },
  listEmpty: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: theme.card,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  titleBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.72)',
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: theme.textMuted,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: theme.textDim,
    fontSize: 14,
    marginTop: 6,
  },
});
