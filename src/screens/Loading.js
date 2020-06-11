/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const Loading  = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style={{color: '#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color="#e93766" size="large" />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;


