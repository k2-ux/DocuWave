import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {theme} from './theme';

const CustomPicker = ({value, onValueChange, items}) => (
  <Picker
    selectedValue={value}
    onValueChange={onValueChange}
    style={{color: value ? theme.text : theme.textDim}}
    dropdownIconColor={theme.textMuted}>
    {items.map(item => (
      <Picker.Item
        key={String(item.value)}
        value={item.value}
        label={item.label}
        style={{
          fontSize: 15,
          color: theme.text,
          backgroundColor: theme.card,
        }}
      />
    ))}
  </Picker>
);

export default CustomPicker;
