import {View, Text, StyleSheet, Button, Platform} from 'react-native';
import React, {useEffect} from 'react';

import {NativeModules, NativeEventEmitter} from 'react-native';

const {CalendarModule} = NativeModules;

// this is how we can add listeners to app side from our native event emitter
// const eventEmitter = new NativeEventEmitter(CalendarModule);

// Platform.OS === 'android' && console.log(CalendarModule);

// console.log(NativeModules.Counter);
// NativeModules.Counter.increment((value: any) => {
//   console.log('the count is ', value);
// });

// console.log(NativeModules.Counter.getConstants());

const CounterEvents = new NativeEventEmitter(NativeModules.Counter);

export default function App() {
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   eventEmitter.addListener('EventCount', eventCount =>
    //     console.log(eventCount),
    //   );
    //   return () => {
    //     eventEmitter.removeAllListeners('EventCount');
    //   };
    // }

    if (Platform.OS === 'ios') {
      CounterEvents.addListener('onIncrement', res =>
        console.log('onIncrement received', res),
      );
      CounterEvents.addListener('onDecrement', res =>
        console.log('onDecrement received', res),
      );
      return () => {
        CounterEvents.removeAllListeners('onIncrement');
        CounterEvents.removeAllListeners('onIncrement');
      };
    }
  }, []);

  const createCalendarEventPromise = async () => {
    try {
      const result = await CalendarModule.createCalendarPromise();
      console.log('result===>: ' + result);
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async () => {
    // we have  called back not promis here
    NativeModules.Counter.increment((res: any) =>
      console.log('onIncrement received', res),
    );
    /**
     * Event emitter has call back not premises
     */
    // try {
    //   var result = await NativeModules.Counter.increment();
    //   console.log('result is ', result);
    // } catch (e: any) {
    //   console.log(e.message, e.code);
    // }
  };

  const decrement = async () => {
    try {
      var result = await NativeModules.Counter.decrement();
      console.log('result is ', result);
    } catch (e: any) {
      console.log(e.message, e.code);
    }
    // NativeModules.Counter.decrement()
    //   .then((result: any) => {
    //     console.log('the decrement result is ', result);
    //   })
    //   .catch((err: any) => {
    //     console.error(err.message, err.code);
    //   });
  };
  return (
    <View style={styles.container}>
      <Text>App</Text>
      {Platform.OS === 'android' && (
        <Button
          title="Calendar Event Promise"
          onPress={createCalendarEventPromise}
        />
      )}

      {Platform.OS === 'ios' && (
        <View>
          <Button title="Increase count" onPress={increment} />
          <Button title="Decrease count" onPress={decrement} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
