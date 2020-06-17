import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressCircle from 'react-native-progress-circle'
import { BarChart, Grid } from 'react-native-svg-charts'
import { FontAwesome5 } from '@expo/vector-icons';
import { Pedometer } from 'expo-sensors';


const fill = '#33D5B8'
const data = [50, 10, 40, 95, null, 85, undefined, 0, 35, 53,]
export default class HomeScreen extends React.Component {
  state = {
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    console.log(start,end)
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        console.log(error)
        this.setState({
          pastStepCount: 0,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.stepsContainer}>
            <Text style={styles.titleText}>Your Progress Today</Text>
            <ProgressCircle
              percent={this.state.pastStepCount/1000} //assuming the daily goal is 1000, to set in chat
              radius={120}
              borderWidth={12}
              color={fill}
              shadowColor="#efefef"
              bgColor="#fff"
            >
              <FontAwesome5 name="shoe-prints" size={24} color="black" />
              <Text style={{ fontSize: 18, paddingTop: 8 }}>{this.state.pastStepCount} Steps</Text>
            </ProgressCircle>
          </View>
          <View style={styles.stepsContainer}>
            <Text style={styles.titleText}>Steps by hour</Text>
            <BarChart style={{ height: 200, width: '80%' }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
              <Grid />
            </BarChart>
          </View>
        </ScrollView>
      </View>
    );
  }
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
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center'
  }
});
