import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from './theme';
// import {Picker }  from '@react-native-picker/picker';
import CustomPicker from './CustomPicker';
const {height, width} = Dimensions.get('screen');
const FormComponent = ({visible, onClose, onSave, initialData}) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [formData, setFormData] = useState({
    name: '',
    watchState: '',
    language: '',
    year: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Clear the form fields when not editing
      setFormData({
        name: '',
        watchState: '',
        language: '',
        year: '',
      });
    }
  }, [initialData]);

  const handleSave = () => {
    // Perform data validation here if needed
    // Save the data to the database
    onSave(formData);
    // Clear the form
    setFormData({
      name: '',
      watchState: '',
      language: '',
      year: '',
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      {/* <View style={{backgroundColor:'white',flex:1}}> */}
      <View
        style={{
          flex: 1,
          padding: 5,
          alignContent: 'center',
          justifyContent: 'center',
          // backgroundColor: 'white',
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            opacity: overlayOpacity,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            // alignItems:'center',
            borderWidth: 1,
            borderColor: '#7861AA',
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',backgroundColor:'#FF8E72'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'white',
                // textDecorationLine: 'underline',
                fontSize: 22,
                marginLeft:10
              }}>
              {initialData ? 'Edit the documentary' : 'Add a Documentary'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="name"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
            backgroundColor="white"
            style={{paddingLeft: 15}}
          />
          {/* <TextInput
            placeholder="genre"
            value={formData.genre}
            onChangeText={text => setFormData({...formData, genre: text})}
            backgroundColor="#FAE6FA"
          /> */}
          <CustomPicker
            label="Watch State"
            value={formData.watchState}
            onValueChange={itemValue =>
              setFormData({...formData, watchState: itemValue})
            }
            items={[
              {value: null, label: 'have you watched it?'},
              {value: 'watched', label: 'watched'},
              {value: 'will watch', label: 'will watch'},
            ]}
          />
          <TextInput
            placeholder="language"
            value={formData.language}
            onChangeText={text => setFormData({...formData, language: text})}
            backgroundColor="white"
            style={{paddingLeft: 15}}
          />
          <TextInput
            placeholder="year"
            style={{paddingLeft: 15}}
            value={formData.year}
            onChangeText={text => setFormData({...formData, year: text})}
            backgroundColor="#FAE6FA"
          />
            <View
          style={{
            width: '50%',
            alignSelf: 'center',
            elevation: 5,
            borderRadius: 30,
            backgroundColor: '#FF8E72',
            margin:10,
          }}>
          <Button
            title={initialData ? 'Update' : 'Save'}
            onPress={handleSave}
            color={'#FF8E72'}
          />
        </View>
        </View>
      
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default FormComponent;
const styles = StyleSheet.create({
  closeButton: {
    borderWidth: 0.5,
  },
});
