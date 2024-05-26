import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';


import { useSelector } from 'react-redux';

import Hostname from './src/screens/Hostname';
import AppNavigator from './src/Navigator/AppNavigator';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { LightScheme } from './src/theme/lightScheme';
import { DarkScheme } from './src/theme/darkScheme';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2c2e3a',
    secondary: '#5E73E8',
    background: '#F6F5F2',

  },
};

const lightTheme = {
  ...MD3LightTheme,
  colors: LightScheme
}

const darkTheme = {
  ...MD3DarkTheme,
  colors: DarkScheme
}

//Index for getting hostname
const Index = () => {
  const hostname = useSelector(state => state.hostname.value);

  // return (
  //   <View style={[styles.container, {backgroundColor:theme.colors.primary}]}>

  //     {
  //       "hostname" ?
  //         <AppNavigator />
  //         :
  //         <Hostname />
  //     }
  //     <StatusBar style="auto" />
  //   </View>
  // )
  if (hostname) {
    return <AppNavigator />
  }
  else {
    return <Hostname />
  }

}


export default function App() {

  const colorScheme = useColorScheme()

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={customTheme}>
          <Index />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
