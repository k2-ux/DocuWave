import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToList, removeItemFromList} from '../Redux/WatchListSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../components/theme';

const {width, height} = Dimensions.get('window');
const HERO_HEIGHT = height * 0.4;

const MetaItem = ({icon, label, value}) => (
  <View style={styles.metaItem}>
    <Icon name={icon} size={15} color={theme.primary} />
    <Text style={styles.metaLabel}>{label}</Text>
    <Text style={styles.metaValue}>{value}</Text>
  </View>
);

const DocumentaryDetail = ({route}) => {
  const watchlist = useSelector(state => state.watchlist.data);
  const movie = route.params;
  const dispatch = useDispatch();
  const inList = watchlist.some(item => item.id === movie.id);

  const handleAddList = () => {
    Alert.alert(
      'Add to Watchlist',
      `Add "${movie.title}" to your watchlist?`,
      [
        {text: 'Add', onPress: () => dispatch(addItemToList(movie))},
        {text: 'Cancel'},
      ],
    );
  };

  const handleRemoveList = () => {
    Alert.alert(
      'Remove',
      `Remove "${movie.title}" from your watchlist?`,
      [
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeItemFromList(movie.id)),
        },
        {text: 'Cancel'},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroContainer}>
          <Image
            style={styles.backdropImg}
            source={{
              uri: `https://image.tmdb.org/t/p/w780${
                movie.backdrop_path || movie.poster_path
              }`,
            }}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.posterContainer}>
            <Image
              style={styles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
              }}
            />
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.title}>{movie.title}</Text>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <MetaItem
              icon="calendar-outline"
              label="Year"
              value={movie.release_date?.split('-')[0] ?? '—'}
            />
            <View style={styles.metaDivider} />
            <MetaItem
              icon="language-outline"
              label="Language"
              value={movie.original_language?.toUpperCase() ?? '—'}
            />
            <View style={styles.metaDivider} />
            <MetaItem
              icon="star"
              label="Rating"
              value={
                movie.vote_average ? movie.vote_average.toFixed(1) : '—'
              }
            />
          </View>

          <Text style={styles.sectionLabel}>Overview</Text>
          <Text style={styles.overview}>{movie.overview}</Text>

          <TouchableOpacity
            style={[styles.watchlistBtn, inList && styles.watchlistBtnActive]}
            onPress={inList ? handleRemoveList : handleAddList}
            activeOpacity={0.85}>
            <Icon
              name={inList ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={inList ? theme.primary : '#fff'}
            />
            <Text
              style={[
                styles.watchlistBtnText,
                inList && {color: theme.primary},
              ]}>
              {inList ? 'In Watchlist' : 'Add to Watchlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DocumentaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  heroContainer: {
    height: HERO_HEIGHT,
    backgroundColor: theme.card,
  },
  backdropImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,14,23,0.5)',
  },
  posterContainer: {
    position: 'absolute',
    bottom: -52,
    left: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  poster: {
    width: 92,
    height: 138,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.border,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 68,
    paddingBottom: 40,
  },
  title: {
    color: theme.text,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 18,
    paddingRight: width * 0.25,
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: theme.border,
  },
  metaItem: {
    alignItems: 'center',
    gap: 4,
  },
  metaLabel: {
    color: theme.textDim,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  metaValue: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '700',
  },
  metaDivider: {
    width: 1,
    height: 36,
    backgroundColor: theme.border,
  },
  sectionLabel: {
    color: theme.textDim,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  overview: {
    color: theme.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 32,
  },
  watchlistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 54,
    borderRadius: 14,
    backgroundColor: theme.primary,
  },
  watchlistBtnActive: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  watchlistBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
