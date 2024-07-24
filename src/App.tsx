import 'react-native-gesture-handler'
import {MMKV} from 'react-native-mmkv'

import {ThemeProvider} from '@/theme'

import ApplicationNavigator from './navigators/Application'
import {WebSocketProvider} from './context/socket'
import './translations'

export const storage = new MMKV()

function App() {
  return (
    <ThemeProvider storage={storage}>
      <WebSocketProvider>
        <ApplicationNavigator />
      </WebSocketProvider>
    </ThemeProvider>
  )
}

export default App
