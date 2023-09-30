import { openDatabase } from 'react-native-sqlite-storage';

const dbase = openDatabase({ name: 'rn_lite' });

// Function to fetch data from the 'documentaries' table and store it in an array
const fetchDataFromTable = () => {
  return new Promise((resolve, reject) => {
    dbase.transaction((txn) => {
      txn.executeSql(
        'SELECT * FROM documentaries',
        [],
        (txn, results) => {
          const data = [];
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            data.push(row);
          }
          resolve(data);
          console.log(data)
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

export default fetchDataFromTable;
