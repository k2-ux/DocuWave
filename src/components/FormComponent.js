import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from './theme';
import CustomPicker from './CustomPicker';

const {height} = Dimensions.get('window');

const FormComponent = ({visible, onClose, onSave, initialData}) => {
  const [formData, setFormData] = useState({
    name: '',
    watchState: '',
    language: '',
    year: '',
  });

  useEffect(() => {
    setFormData(
      initialData || {name: '', watchState: '', language: '', year: ''},
    );
  }, [initialData]);

  const handleSave = () => {
    onSave(formData);
    setFormData({name: '', watchState: '', language: '', year: ''});
    onClose();
  };

  const set = key => val => setFormData(prev => ({...prev, [key]: val}));
  const isEditing = !!initialData;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
              {isEditing ? 'Edit Documentary' : 'Add Documentary'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={16} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Documentary name"
            placeholderTextColor={theme.textDim}
            value={formData.name}
            onChangeText={set('name')}
          />

          <Text style={styles.label}>Watch Status</Text>
          <View style={styles.pickerWrapper}>
            <CustomPicker
              value={formData.watchState}
              onValueChange={set('watchState')}
              items={[
                {value: null, label: 'Select status…'},
                {value: 'watched', label: 'Watched'},
                {value: 'will watch', label: 'Will Watch'},
              ]}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Language</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. English"
                placeholderTextColor={theme.textDim}
                value={formData.language}
                onChangeText={set('language')}
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2024"
                placeholderTextColor={theme.textDim}
                value={formData.year}
                onChangeText={set('year')}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}>
            <Text style={styles.saveBtnText}>
              {isEditing ? 'Update' : 'Save Documentary'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  sheet: {
    backgroundColor: theme.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 42 : 28,
    minHeight: height * 0.58,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.border,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  sheetTitle: {
    color: theme.text,
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: theme.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: theme.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    color: theme.text,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  pickerWrapper: {
    backgroundColor: theme.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  saveBtn: {
    height: 52,
    backgroundColor: theme.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
