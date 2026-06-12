import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import FormComponent from '../components/FormComponent';
import fetchDataFromTable from '../components/fetchDataFromTable';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Header from '../components/Header';
import {theme} from '../components/theme';
import {useNetInfo} from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';

const dbase = openDatabase({name: 'rn_lite'});

const stateColor = watchState => {
  if (watchState === 'watched') return theme.success;
  if (watchState === 'will watch') return theme.warning;
  return theme.border;
};

const HomeScreen = ({navigation}) => {
  const [documentary, setDocumentary] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userID, setUserID] = useState('');
  const isFocused = useIsFocused();
  const {isConnected} = useNetInfo();

  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      if (user) setUserID(user.uid);
    });
  }, []);

  useEffect(() => {
    fetchDataFromTable()
      .then(result => setDocumentary(result))
      .catch(error => console.error('Error fetching data:', error));
  }, [isFocused, showForm]);

  useEffect(() => {
    if (!userID || !isConnected || documentary.length === 0) return;
    firestore()
      .collection('documentaries')
      .doc(userID)
      .set({watchlist: documentary})
      .catch(error =>
        console.error('Error syncing watchlist to Firestore:', error),
      );
  }, [documentary, userID, isConnected]);

  const handleSaveData = data => {
    dbase.transaction(tx => {
      tx.executeSql(
        'INSERT INTO documentaries (name, watchState, language, year) VALUES (?, ?, ?, ?)',
        [data.name, data.watchState, data.language, data.year],
        () => {},
        error => console.error('Error saving data:', error),
      );
    });
  };

  const handleEdit = useCallback(data => {
    dbase.transaction(tx => {
      tx.executeSql(
        'UPDATE documentaries SET name=?, watchState=?, language=?, year=? WHERE id=?',
        [data.name, data.watchState, data.language, data.year, selectedItem.id],
        () => setSelectedItem(null),
        error => console.error('Error updating data:', error),
      );
    });
  }, [selectedItem]);

  const handleDelete = useCallback(itemId => {
    Alert.alert('Delete', 'Remove this entry?', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dbase.transaction(tx => {
            tx.executeSql(
              'DELETE FROM documentaries WHERE id = ?',
              [itemId],
              () =>
                fetchDataFromTable()
                  .then(result => setDocumentary(result))
                  .catch(error => console.error('Error fetching data:', error)),
              error =>
                console.error(`Error deleting item ${itemId}:`, error),
            );
          });
        },
      },
      {text: 'Cancel'},
    ]);
  }, []);

  const handleEditPrompt = useCallback(itemId => {
    Alert.alert('Edit', 'Edit this entry?', [
      {
        text: 'Edit',
        onPress: () => {
          dbase.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM documentaries WHERE id = ?',
              [itemId],
              (_, result) => {
                if (result.rows.length > 0) {
                  setSelectedItem(result.rows.item(0));
                  setShowForm(true);
                } else {
                  console.error(`Item ${itemId} not found`);
                }
              },
              error => console.error(`Error fetching item ${itemId}:`, error),
            );
          });
        },
      },
      {text: 'Cancel'},
    ]);
  }, []);

  const renderItem = useCallback(({item}) => {
    const accent = stateColor(item.watchState);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => handleEditPrompt(item.id)}>
        <View style={styles.card}>
          <View style={[styles.cardAccent, {backgroundColor: accent}]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.cardMeta}>
              <View
                style={[
                  styles.badge,
                  {backgroundColor: accent + '28'},
                ]}>
                <Text style={[styles.badgeText, {color: accent}]}>
                  {item.watchState || 'unset'}
                </Text>
              </View>
              {!!item.language && (
                <View style={styles.metaPill}>
                  <Icon
                    name="language-outline"
                    size={11}
                    color={theme.textMuted}
                  />
                  <Text style={styles.metaText}>{item.language}</Text>
                </View>
              )}
              {!!item.year && (
                <View style={styles.metaPill}>
                  <Icon
                    name="calendar-outline"
                    size={11}
                    color={theme.textMuted}
                  />
                  <Text style={styles.metaText}>{item.year}</Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}>
            <Icon name="trash-outline" size={18} color={theme.textDim} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }, [handleDelete, handleEditPrompt]);

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Icon name="film-outline" size={64} color={theme.textDim} />
      <Text style={styles.emptyTitle}>No documentaries yet</Text>
      <Text style={styles.emptySubtitle}>Tap + to start tracking</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <View style={styles.headerWrapper}>
        <Header
          title="My Watchlog"
          onClickLeftIcon={() => navigation.toggleDrawer()}
        />
      </View>
      <FlatList
        data={documentary}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          documentary.length === 0 ? styles.listEmpty : styles.list
        }
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedItem(null);
          setShowForm(true);
        }}
        activeOpacity={0.85}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
      <FormComponent
        visible={showForm}
        onSave={selectedItem ? handleEdit : handleSaveData}
        onClose={() => setShowForm(false)}
        initialData={selectedItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  headerWrapper: {
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: theme.card,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    minHeight: 72,
    alignItems: 'center',
  },
  cardAccent: {
    width: 4,
    alignSelf: 'stretch',
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    color: theme.textMuted,
    fontSize: 12,
  },
  deleteBtn: {
    padding: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
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
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
