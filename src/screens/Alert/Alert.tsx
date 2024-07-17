import React, {useState, useEffect} from 'react'
import {View, Text, FlatList} from 'react-native'
import {useTranslation} from 'react-i18next'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {subscribe, unsubscribe, onMessage, onOpen} from '@/services/WebSocketService'
import {symbols} from '@/constants/symbols'
import {useTheme} from '@/theme'

import Header from '@/components/Header/Header'
import ModalAlert from './ModalAlert'
import {formatPrice, formatSymbol} from '@/utils/formats'
import {SafeScreen} from '@/components/template'

type Alert = {
  id: number
  symbol: string
  price: number
}

const AlertScreen = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isModalVisible, setModalVisible] = useState(false)
  const {colors, layout, fonts, gutters, borders} = useTheme()
  const {t} = useTranslation(['common'])


  useEffect(() => {
    onOpen(() => {
      alerts.forEach(alert => subscribe(alert.symbol))
    })

    onMessage((data: any[]) => {
      data.forEach(trade => {
        const alert = alerts.find(alert => alert.symbol === trade.s && trade.p >= alert.price)
        if (alert) {
          alertUser(alert)
        }
      })
    })

    return () => {
      alerts.forEach(alert => unsubscribe(alert.symbol))
    }
  }, [alerts])

  const alertUser = (alert: Alert) => {
    console.log(`Alert triggered for ${alert.symbol} at price ${alert.price}`)
    unsubscribe(alert.symbol)
  }

  const addAlert = (symbol: string, price: number) => {
    const newAlert = {id: alerts.length + 1, symbol, price}
    setAlerts([...alerts, newAlert])
  }

  return (
    <SafeScreen>
      <Header onActionPress={() => setModalVisible(true)} iconName="add-circle" />
      <View style={[layout.flex_1, gutters.paddingHorizontal_24]}>
        <FlatList
          data={alerts}
          ListEmptyComponent={
            <View style={[gutters.marginTop_80]}>
              <Text style={[fonts.size_16, fonts.alignCenter, {color: colors.red500}]}>{t('common:appName.noAlerts')}</Text>
            </View>
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={[
                gutters.padding_16,
                gutters.marginVertical_16,
                borders.rounded_16,
                layout.itemsCenter,
                layout.justifyBetween,
                layout.row,
                {backgroundColor: colors.black},
              ]}>
              <View style={[layout.col]}>
                <Text style={[fonts.bold, fonts.size_16, fonts.gray50]}>{formatSymbol(item.symbol)}</Text>
                <Text style={[fonts.size_12, fonts.gray50]}>{formatPrice(item.price)}</Text>
              </View>
              <MaterialIcons name={'notifications'} size={25} color={colors.red500} />
            </View>
          )}
        />
      </View>
      <ModalAlert
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAddAlert={addAlert}
        symbols={symbols}
      />
    </SafeScreen>
  )
}

export default AlertScreen
