import React, {useState,useEffect} from 'react';
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
const {height, width} = Dimensions.get('screen');
const FormComponent = ({visible, onClose, onSave,initialData}) => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
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
        genre: '',
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
      genre: '',
      language: '',
      year: '',
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="none">
      <View style={{flex: 1, padding: 5,alignContent:'center',justifyContent:'center',backgroundColor:'#F9E995'}}>
       <View style={{backgroundColor:'#DA70D6',borderWidth:1,borderColor:'#7861AA',borderRadius:10}}>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'black',
              // textDecorationLine: 'underline',
              fontSize: 22,
            }}>
           {initialData?"Edit the documentary": "Add a Documentary"}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="name"
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
backgroundColor='white'
        />
        <TextInput
          placeholder="genre"
          value={formData.genre}
          onChangeText={text => setFormData({...formData, genre: text})}
          backgroundColor='#FAE6FA'

        />
        <TextInput
          placeholder="language"
          value={formData.language}
          onChangeText={text => setFormData({...formData, language: text})}
          backgroundColor='white'

        />
        <TextInput
          placeholder="year"
          value={formData.year}
          onChangeText={text => setFormData({...formData, year: text})}
          backgroundColor='#FAE6FA'

        />
        <Button title={initialData?'Update':"Save"} onPress={handleSave} color={'#7861AA'} />
        </View>
      </View>
    </Modal>
  );
};

export default FormComponent;
const styles = StyleSheet.create({
  closeButton: {
    borderWidth: 0.5,
  },
});
