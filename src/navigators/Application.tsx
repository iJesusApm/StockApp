import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {Example, Startup, Alert, Graph, WatchList} from '@/screens'
import {useTheme} from '@/theme'
import {ALERT, GRAPH, WATCHLIST} from './routes'

type RootStackParamList = {
  Startup: undefined
  Example: undefined
  Tabs: undefined
}

type RootTabParamList = {
  alert: undefined
  watchlist: undefined
  graph: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

function TabNavigator() {
  const {variant} = useTheme()

  return (
    <Tab.Navigator key={variant} screenOptions={{headerShown: false}}>
      <Tab.Screen name={WATCHLIST} component={WatchList} />
      <Tab.Screen name={GRAPH} component={Graph} />
      <Tab.Screen name={ALERT} component={Alert} />
    </Tab.Navigator>
  )
}

function ApplicationNavigator() {
  const {variant, navigationTheme} = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{headerShown: false}}>
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Example" component={Example} />
          <Stack.Screen name="Tabs" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
