import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.titleText}>Hi, John!</Text>
          <View style={styles.stepsContainer}>
            <Text>Steps Taken Today</Text>
          </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 30,
  },
  titleText:{
    fontWeight:'bold',
    fontSize:24,
  },
  stepsContainer:{
    marginVertical:8,
    padding:8,
    borderRadius:8,
    shadowColor:'#000',
    elevation:1
  }
});
