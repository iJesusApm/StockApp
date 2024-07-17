import React, {useState, useEffect} from 'react'
import {View, FlatList, ActivityIndicator} from 'react-native'

import {subscribe, unsubscribe, onMessage, onOpen} from '@/services/WebSocketService'

import {useTheme} from '@/theme'
import {Stock} from '@/types/schemas/stock'

import {SafeScreen} from '@/components/template'
import StockItem from './StockItem'
import Header from '@/components/Header/Header'
import {symbols} from '@/constants/symbols'

const WatchlistScreen = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([])
  const {gutters, layout} = useTheme()

  useEffect(() => {
    onOpen(() => {
      symbols.forEach(symbol => subscribe(symbol))
    })

    onMessage((data: Stock[]) => {
      setWatchlist(prevData => {
        const updatedData = [...prevData]
        data.forEach(trade => {
          const index = updatedData.findIndex(item => item.s === trade.s)
          if (index !== -1) {
            updatedData[index] = trade
          } else {
            updatedData.push(trade)
          }
        })
        return updatedData
      })
    })

    return () => {
      symbols.forEach(symbol => unsubscribe(symbol))
    }
  }, [])

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
