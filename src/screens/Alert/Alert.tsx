import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Alert = () => {
  return (
    <View style={styles.container}>
      <Text>-Alert-</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
export default Alert
