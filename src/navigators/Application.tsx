import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'

import {SafeAreaProvider} from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
  const {variant, colors} = useTheme()

  return (
    <Tab.Navigator
      key={variant}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName = ''

          switch (route.name) {
            case WATCHLIST:
              iconName = 'star-outline'
              break
            case GRAPH:
              iconName = 'show-chart'
              break
            case ALERT:
              iconName = 'notifications-none'
              break
            default:
              iconName = 'circle'
              break
          }

          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.purple500,
        tabBarInactiveTintColor: colors.gray400,
        tabBarLabel: (() => {
          switch (route.name) {
            case WATCHLIST:
              return 'WatchList'
            case GRAPH:
              return 'Graph'
            case ALERT:
              return 'Alert'
            default:
              return route.name
          }
        })(),
      })}>
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
