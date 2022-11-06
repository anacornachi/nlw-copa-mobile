import {NativeBaseProvider, StatusBar} from 'native-base';

import {THEME} from './src/styles/theme';
import {AuthContextProvider} from './src/contexts/AuthContext';
import {Routes} from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
