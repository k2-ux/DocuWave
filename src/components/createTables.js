import { StyleSheet, Text, View } from 'react-native'
import {openDatabase} from 'react-native-sqlite-storage'

const dbase = openDatabase({name: 'rn_lite'});

const createTables = () => {
    dbase.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS documentaries(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20),genre VARCHAR(55),language VARCHAR(20),year VARCHAR(20))',
        [],
        (_, results) => {
          console.log('table created successfully');
        },
        error => {
          console.log('error in creating table' + error.message);
        },
      );
    });
  };
  

export default createTables

const styles = StyleSheet.create({})