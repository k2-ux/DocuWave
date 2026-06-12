import { StyleSheet, Text, View } from 'react-native'
import {openDatabase} from 'react-native-sqlite-storage'

const dbase = openDatabase({name: 'rn_lite'});

const createTables = () => {
    dbase.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS documentaries(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20),watchState VARCHAR(55),language VARCHAR(20),year VARCHAR(20))',
        [],
        () => {},
        error => {
          console.error('Error creating table:', error.message);
        },
      );
    });
  };
  

export default createTables

const styles = StyleSheet.create({})