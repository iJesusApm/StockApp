import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {useTheme} from '@/theme'
import {formatPrice, formatSymbol} from '@/utils/formats'
import {Stock} from '@/types/schemas/stock'

type Props = {
  item: Stock
}

const StockItem = ({item}: Props) => {
  const {gutters, layout, borders, colors, fonts} = useTheme()

  const changeColor = item.v > 0 ? styles.positive : styles.negative
  return (
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
        <Text style={[fonts.bold, fonts.size_16, fonts.gray50]}>{formatSymbol(item.s)}</Text>
        <Text style={[fonts.size_12, fonts.gray50]}>{formatPrice(item.p)}</Text>
      </View>
      <Text style={[fonts.size_16, changeColor]}>
        {item.v > 0 ? '↑' : '↓'} {item.v.toFixed(2)}%
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
})

export default StockItem
