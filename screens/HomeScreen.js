import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressCircle from 'react-native-progress-circle'
import { BarChart, Grid } from 'react-native-svg-charts'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const fill = '#33D5B8'
const data = [50, 10, 40, 95, null, 85, undefined, 0, 35, 53, ]
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.titleText}>Your Progress Today</Text>
          <ProgressCircle
            percent={70}
            radius={120}
            borderWidth={12}
            color="#33D5B8"
            shadowColor="#efefef"
            bgColor="#fff"
          >
            <FontAwesome5 name="shoe-prints" size={24} color="black" />
            <Text style={{ fontSize: 18, paddingTop: 8 }}>600 Steps to go</Text>
          </ProgressCircle>
        </View>
        <View style={styles.stepsContainer}>
          <Text style={styles.titleText}>Steps by hour</Text>
          <BarChart style={{ height: 200, width:'80%' }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
          <Grid />
          </BarChart>
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
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 24
  },
  stepsContainer: {
    marginTop: 8,
    marginBottom:16,
    display: 'flex',
    alignItems: 'center'
  }
});
