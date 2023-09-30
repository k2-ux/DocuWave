import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useLayoutEffect} from 'react';
import {StackActions} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import FormComponent from '../components/FormComponent';
import fetchDataFromTable from '../components/fetchDataFromTable';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
const dbase = openDatabase({name: 'rn_lite'});
const HomeScreen = ({route, navigation}) => {
  console.log('WWWWWWWWWWWWWWWWWWW', route);
  const [documentary, setDocumentary] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTrue, setshowTrue] = useState(false);
  const isFocused = useIsFocused();
  const addDocumentary = () => {
    setshowTrue(true);
  };
  const handleCloseForm = () => {
    setshowTrue(false);
  };
  // useLayoutEffect(() => {

  //   return () => {

  //   }
  // }, [])

  const handleSaveData = data => {
    console.log(data);
    dbase.transaction(tx => {
      tx.executeSql(
        'INSERT INTO documentaries (name, genre, language, year) VALUES (?, ?, ?, ?)',
        [data.name, data.genre, data.language, data.year],
        (_, results) => {
          console.log('Data saved successfully', results);
        },
        error => {
          console.error('Error saving data:', error);
        },
      );
    });
  };

  useEffect(() => {
    // Fetch data from the table when the component mounts
    fetchDataFromTable()
      .then(result => {
        setDocumentary(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [isFocused, showTrue]);
  const handleDelete = itemId => {
    Alert.alert('Hey', 'Do you want to delete?', [
      {
        text: 'Yes',
        onPress: () => {
          dbase.transaction(tx => {
            tx.executeSql(
              'DELETE FROM documentaries WHERE id = ?',
              [itemId],
              (_, result) => {
                console.log(`Deleted item with id ${itemId}`);
                // After successful deletion, you can update the state to reflect the changes
                // For example, you can refetch the data from the database and update the state
                fetchDataFromTable()
                  .then(result => {
                    setDocumentary(result);
                  })
                  .catch(error => {
                    console.error('Error fetching data:', error);
                  });
              },
              error => {
                console.error(`Error deleting item with id ${itemId}:`, error);
              },
            );
          });
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          console.log('DELETING CANCELLED');
        },
      },
    ]);
  };
  const handleLogout = () => {
    Alert.alert('Hey', 'Do you want to log out?', [
      {
        text: 'Yes',
        onPress: () => {
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!');
              navigation.dispatch(StackActions.replace('Login'));
            });
        },
      },
      {
        text: 'cancel',
        onPress: () => {
          console.log('logout cancelled');
        },
      },
    ]);
  };

  const handleEditdata = itemId => {
    Alert.alert('Hey', 'Do you want to edit the data?', [
      {
        text: 'Yes',
        onPress: () => {
          dbase.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM documentaries WHERE id = ?',
              [itemId],
              (_, result) => {
                if (result.rows.length > 0) {
                  const itemData = result.rows.item(0);
                  setSelectedItem(itemData);
                  setshowTrue(true);
                } else {
                  console.error(`Item with id ${itemId} not found`);
                }
              },
              error => {
                console.error(`Error fetching item with id ${itemId}:`, error);
              },
            );
          });
        },
      },
      {
        text: 'cancel',
        onPress: () => {
          console.log('editing cancelled');
        },
      },
    ]);
  };
  const handleEdit = data => {
    dbase.transaction(tx => {
      tx.executeSql(
        'UPDATE documentaries SET name =?,genre = ?, language = ?, year = ? WHERE id= ?',
        [data.name, data.genre, data.language, data.year, selectedItem.id],
        (_, results) => {
          console.log('Data updated successfully', results);
          // successCallback(results);
        },
        error => {
          console.error('Error updating data:', error);
          // errorCallback(error);
        },
      );
    });
  };
  return (
    <View
      style={{
        flex: 1,
        // alignSelf: 'flex-end',
        // justifyContent: 'flex-end',
        // backgroundColor:'gray',

        margin: 15,
      }}>
      <FlatList
        data={documentary}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>{navigation.navigate('Utelly')}} onLongPress={() => handleEditdata(item.id)}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                marginBottom: 5,
                borderColor: 'black',
                backgroundColor: '#F9E995',
                borderRadius: 5,
              }}>
              {/* Add the delete icon */}
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={{position: 'absolute', top: 5, right: 5}}>
                <Icon name="trash-outline" size={24} color="black" />
              </TouchableOpacity>

              <View style={{}}>
                <Text style={styles.Text}>Name: </Text>
                <Text style={styles.Text}>Genre: </Text>
                <Text style={styles.Text}>Language: </Text>
                <Text style={styles.Text}>Year: </Text>
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={styles.Text2}> {item.name}</Text>
                <Text style={styles.Text2}> {item.genre}</Text>
                <Text style={styles.Text2}> {item.language}</Text>
                <Text style={styles.Text2}> {item.year}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={styles.plus} onPress={() => addDocumentary()}>
          <Text style={{fontSize: 24, color: 'white'}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => {
            handleLogout();
            // auth()
            //   .signOut()
            //   .then(() => {console.log('User signed out!')
            //   navigation.dispatch(StackActions.replace("Login"))
            // }
            //   );
          }}>
          <Icon name="log-out" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <FormComponent
        visible={showTrue}
        onSave={selectedItem ? handleEdit : handleSaveData}
        onClose={handleCloseForm}
        initialData={selectedItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  plus: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7861AA',
  },
  Text2: {
    fontSize: 18,
    color: 'gray',
  },
});