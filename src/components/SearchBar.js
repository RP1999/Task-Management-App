import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../styles/theme';
import styles from '../styles/SearchBar.styles';

const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textSecondary}
      />
      {value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;

