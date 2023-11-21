import React from 'react';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({ label, value, onValueChange, items }) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={onValueChange}
      style={{ backgroundColor:"#FAE6FA"}}
    >
      {items.map((item) => (
        <Picker.Item key={item.value} value={item.value} label={item.label} style={{ fontSize:14,textAlign: 'left',color:!value?'gray':'black' }} />
      ))}
    </Picker>
  );
};

export default CustomPicker;