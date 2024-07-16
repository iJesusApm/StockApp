import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {Example, Startup, Alert, Graph, WatchList} from '@/screens'
import {useTheme} from '@/theme'
import {ALERT, GRAPH, WATCHLIST} from './routes'

type RootStackParamList = {
  alert: undefined
  watchlist: undefined
  graph: undefined
  Startup: undefined
  Example: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

function ApplicationNavigator() {
  const {variant, navigationTheme} = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{headerShown: false}}>
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Example" component={Example} />
          <Stack.Screen name={ALERT} component={Alert} />
          <Stack.Screen name={GRAPH} component={Graph} />
          <Stack.Screen name={WATCHLIST} component={WatchList} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
