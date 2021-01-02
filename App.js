import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import vibrate from "./utils/vibrate"
import Constants from "expo-constants";


export default function App() {
  const [workLength, setWorkLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState('Work');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  var minutes = Math.floor(secondsLeft / 60);
  var seconds = secondsLeft % 60;

  useEffect(() => {
    const handleSwitch = () => {
      if (timerLabel === 'Work') {
        setTimerLabel('Break');
        setSecondsLeft(breakLength * 60);
        vibrate()

      } else if (timerLabel === 'Break') {
        setTimerLabel('Work');
        setSecondsLeft(workLength * 60);
        vibrate()
      }
    }
    let countdown = null;
    if (timerRunning && secondsLeft > 0) {
      countdown = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (timerRunning && secondsLeft === 0) {
      countdown = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      handleSwitch();
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);

  }, [timerRunning, secondsLeft, timerLabel, breakLength, workLength])


  const handleStart = () => {
    setTimerRunning(true);
    setSecondsLeft((workLength) * 60);
  }

  const handleStop = () => {
    setTimerRunning(false);

  }

  const handleReset = () => {
    setWorkLength(25);
    setBreakLength(5);
    setSecondsLeft(25 * 60);
    setTimerLabel('Work');
    setTimerRunning(false);

  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()
    }>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{timerLabel} Timer</Text>
        </View>
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>{minutes < 10 ? ("0" + minutes).slice(-2) : minutes}:{seconds < 10 ? ("0" + seconds).slice(-2) : seconds}</Text>
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity style={styles.button} onPress={!timerRunning ? handleStart : handleStop
          } ><Text style={styles.buttonText}>{timerRunning ? 'STOP' : 'START'}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset} ><Text style={styles.buttonText} >RESET</Text></TouchableOpacity>
        </View>
        <View style={styles.wrapperChangeTimer}>
          <View style={styles.wrapperWorkingTimer}>
            <Text style={styles.text}>Work Timer in Minutes</Text>
            <TextInput style={styles.input} keyboardType='numeric' placeholder='00' onChangeText={(value) => setWorkLength(value)} />
          </View>
          <View style={styles.wrapperBreakingTimer} >
            <Text style={styles.text}>Break Timer in Minutes</Text>
            <TextInput style={styles.input} keyboardType='numeric' placeholder='00' onChangeText={(value) => setBreakLength(value)} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 26,
    margin: 30,
    color: "#ffffff"
  },
  titleContainer: {
    backgroundColor: "#001970"
  }, clockContainer: {
    backgroundColor: "#303f9f",
    paddingVertical: 20,
  },
  clockText: {
    fontSize: 72,
    textAlign: "center",
    color: "#ffffff"
  }, wrapperButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#666ad1"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: "#001970"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18
  }, wrapperWorkingTimer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    alignItems: 'center'

  },
  wrapperBreakingTimer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    alignItems: 'center'

  },
  text: {
    fontSize: 18,
    color: "#011627"
  },
  input: {
    height: "100%",
    borderColor: "#001970",
    width: 30,
    textAlign: "center",
    borderBottomWidth: 1
  }
});
