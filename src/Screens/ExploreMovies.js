import React, {useEffect, useState, useMemo, useCallback, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import {fetchDocumentaryPage} from '../api/tmdb';
import {theme} from '../components/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {addItemToList, removeItemFromList} from '../Redux/WatchListSlice';

const {width} = Dimensions.get('window');
const ITEMS_PER_PAGE = 10;

// Extracted + memoised so it only re-renders when its own props change
const MovieCard = memo(({item, inWatchlist, onToggle, onPress}) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
    <Image
      source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
      style={styles.backdrop}
    />
    <View style={styles.cardOverlay}>
      <View style={styles.topRow}>
        <View style={styles.pills}>
          <View style={styles.pill}>
            <Icon name="language-outline" size={11} color="#fff" />
            <Text style={styles.pillText}>
              {item.original_language.toUpperCase()}
            </Text>
          </View>
          {item.vote_average > 0 && (
            <View style={[styles.pill, styles.ratingPill]}>
              <Icon name="star" size={11} color="#fff" />
              <Text style={styles.pillText}>
                {item.vote_average.toFixed(1)}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.bookmarkBtn, inWatchlist && styles.bookmarkBtnActive]}
          onPress={onToggle}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Icon
            name={inWatchlist ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={inWatchlist ? theme.primary : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBottom}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardOverview} numberOfLines={2}>
          {item.overview}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
));

const ExploreMovies = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [pgNum, setPgNum] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist.data);

  // O(1) lookup instead of O(n) .some() on every render
  const watchlistIds = useMemo(
    () => new Set(watchlist.map(i => i.id)),
    [watchlist],
  );

  const toggleWatchlist = useCallback(
    item => {
      if (watchlistIds.has(item.id)) {
        dispatch(removeItemFromList(item.id));
      } else {
        dispatch(addItemToList(item));
      }
    },
    [watchlistIds, dispatch],
  );

  useEffect(() => {
    setLoading(true);
    fetchDocumentaryPage(pgNum)
      .then(data => {
        setMovies(prev => [
          ...prev,
          ...data.results.filter(item => item.genre_ids?.includes(99)),
        ]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [pgNum]);

  const isSearching = searchQuery.trim().length > 0;

  const filteredMovies = useMemo(() => {
    if (!isSearching) return null;
    const q = searchQuery.toLowerCase();
    return movies.filter(m => m.title.toLowerCase().includes(q));
  }, [searchQuery, movies, isSearching]);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const paginatedMovies = useMemo(
    () =>
      movies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [movies, currentPage],
  );

  const visibleMovies = isSearching ? filteredMovies : paginatedMovies;

  const handlePageChange = useCallback(
    page => {
      setCurrentPage(page);
      if (page === totalPages) setPgNum(prev => prev + 1);
    },
    [totalPages],
  );

  const handleSearch = useCallback(text => {
    setSearchQuery(text);
    setCurrentPage(1);
  }, []);

  // Stable renderItem — only changes when watchlistIds or toggleWatchlist changes
  const renderItem = useCallback(
    ({item}) => (
      <MovieCard
        item={item}
        inWatchlist={watchlistIds.has(item.id)}
        onToggle={() => toggleWatchlist(item)}
        onPress={() => navigation.navigate('DocumentaryDetail', item)}
      />
    ),
    [watchlistIds, toggleWatchlist, navigation],
  );

  const renderEmpty = useCallback(
    () =>
      !loading ? (
        <View style={styles.emptySearch}>
          <Icon name="search-outline" size={48} color={theme.textDim} />
          <Text style={styles.emptyText}>No results for "{searchQuery}"</Text>
        </View>
      ) : null,
    [loading, searchQuery],
  );

  if (loading && movies.length === 0) {
    return (
      <View style={styles.centered}>
        <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={styles.loadingText}>Finding documentaries…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
        <Icon name="alert-circle-outline" size={52} color={theme.primary} />
        <Text style={styles.errorText}>Failed to load</Text>
        <Text style={styles.errorSub}>{error}</Text>
      </View>
    );
  }

  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, Math.max(1, totalPages - 4)),
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <View style={styles.headerWrapper}>
        <Header
          title="Discover"
          onClickLeftIcon={() => navigation.toggleDrawer()}
        />
        <View style={styles.searchBar}>
          <Icon
            name="search-outline"
            size={18}
            color={theme.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documentaries…"
            placeholderTextColor={theme.textDim}
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Icon name="close-circle" size={17} color={theme.textDim} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={visibleMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        initialNumToRender={4}
        windowSize={5}
      />

      {!isSearching && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageArrow, currentPage === 1 && styles.dimmed]}
            onPress={() =>
              currentPage > 1 && handlePageChange(currentPage - 1)
            }
            disabled={currentPage === 1}>
            <Icon
              name="chevron-back"
              size={18}
              color={currentPage === 1 ? theme.textDim : theme.text}
            />
          </TouchableOpacity>

          {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
            const page = startPage + i;
            if (page > totalPages) return null;
            const isActive = currentPage === page;
            return (
              <TouchableOpacity
                key={page}
                style={[styles.pageNum, isActive && styles.pageNumActive]}
                onPress={() => handlePageChange(page)}>
                <Text
                  style={[
                    styles.pageNumText,
                    isActive && styles.pageNumTextActive,
                  ]}>
                  {page}
                </Text>
              </TouchableOpacity>
            );
          })}

          {loading && (
            <ActivityIndicator
              size="small"
              color={theme.primary}
              style={styles.pageLoader}
            />
          )}

          <TouchableOpacity
            style={[
              styles.pageArrow,
              currentPage === totalPages && styles.dimmed,
            ]}
            onPress={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}>
            <Icon
              name="chevron-forward"
              size={18}
              color={currentPage === totalPages ? theme.textDim : theme.text}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExploreMovies;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.bg},
  headerWrapper: {paddingHorizontal: 16, paddingBottom: 8},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 4,
  },
  searchIcon: {marginRight: 8},
  searchInput: {flex: 1, color: theme.text, fontSize: 15, paddingVertical: 0},
  centered: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {color: theme.textMuted, marginTop: 12, fontSize: 14},
  errorText: {color: theme.text, fontSize: 18, fontWeight: '600', marginTop: 12},
  errorSub: {
    color: theme.textMuted,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  list: {paddingHorizontal: 16, paddingBottom: 12},
  card: {
    height: 210,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: theme.card,
  },
  backdrop: {width: '100%', height: '100%', position: 'absolute'},
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'space-between',
    padding: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pills: {flexDirection: 'row', gap: 6, flexShrink: 1},
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  ratingPill: {backgroundColor: 'rgba(237,106,94,0.85)'},
  pillText: {color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 0.4},
  bookmarkBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  bookmarkBtnActive: {
    backgroundColor: 'rgba(237,106,94,0.2)',
    borderWidth: 1,
    borderColor: theme.primary,
  },
  cardBottom: {gap: 4},
  cardTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  cardOverview: {color: 'rgba(255,255,255,0.72)', fontSize: 12, lineHeight: 17},
  emptySearch: {alignItems: 'center', paddingTop: 60, gap: 12},
  emptyText: {color: theme.textMuted, fontSize: 15},
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    gap: 6,
  },
  pageArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimmed: {opacity: 0.35},
  pageNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumActive: {backgroundColor: theme.primary},
  pageNumText: {color: theme.textMuted, fontSize: 14, fontWeight: '600'},
  pageNumTextActive: {color: '#fff'},
  pageLoader: {marginHorizontal: 4},
});
