import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [startTime, setStartTime] = useState(false)
  const [count, setCount] = useState('00:00')

  const handlerSubmitStart = () => {
    console.log('hjh')
    setStartTime(!startTime)

  }

  const handlerChangeWorkTime = (e) => {
    setCount(e.target.value);
    console.log(count)
  }

  const handlerChangeBreakTime = (e) => {
    setCount(e.target.value);

  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Project 1: Timer App</Text>
      <Text style={{ paddingTop: 50 }} >{startTime ? { count } : '00:00'}</Text>
      <View style={styles.viewBtn}>
        <Button title={startTime ? 'Start' : 'Stop'} onPress={handlerSubmitStart} />
        <Button title='RESET' />
      </View>
      <View style={styles.viewText}>
        <Text>Work Time in Minutes</Text>
        <TextInput keyboardType='numeric' placeholder='Enter number only' onChange={handlerChangeWorkTime} value={count} />
      </View>
      <View style={styles.viewText} >
        <Text>Break Time in Minutes</Text>
        <TextInput keyboardType='numeric' placeholder='Enter number only' onChange={() => handlerChangeBreakTime} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, viewBtn: {
    paddingTop: 50,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%'
  }, viewText: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignItems: 'center'
  }
});
