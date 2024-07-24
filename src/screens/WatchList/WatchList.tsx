import React from 'react'
import {View, FlatList, ActivityIndicator} from 'react-native'

import {useTheme} from '@/theme'
import {Stock} from '@/types/schemas/stock'

import {SafeScreen} from '@/components/template'
import StockItem from './StockItem'
import Header from '@/components/Header/Header'
import {useWebSocketData} from '@/context/socket'

const WatchlistScreen = () => {
  const {gutters, layout} = useTheme()
  const watchlist = useWebSocketData()

  if (!Boolean(watchlist.length)) {
    return (
      <SafeScreen>
        <View style={[layout.flex_1, layout.col, layout.itemsCenter, layout.justifyCenter]}>
          <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        </View>
      </SafeScreen>
    )
  }

  return (
    <SafeScreen>
      <Header />
      <View style={[layout.flex_1, gutters.paddingHorizontal_24]}>
        <FlatList
          data={watchlist}
          keyExtractor={(item: Stock, index: number) => `${item.s}${index}`}
          renderItem={({item}: {item: Stock}) => <StockItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  )
}

export default WatchlistScreen
