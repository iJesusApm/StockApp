import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import {LineChart} from 'react-native-chart-kit'

import {subscribe, unsubscribe, onMessage, onOpen} from '@/services/WebSocketService'

import {useTheme} from '@/theme'
import {Stock} from '@/types/schemas/stock'
import {symbols} from '@/constants/symbols'

import Header from '@/components/Header/Header'
import {SafeScreen} from '@/components/template'

interface ChartData {
  labels: string[]
  datasets: {data: number[]}[]
}

const GraphScreen = () => {
  const [chartData, setChartData] = useState<ChartData>({labels: [], datasets: []})
  const {colors, layout, gutters} = useTheme()

  useEffect(() => {
    onOpen(() => {
      symbols.forEach(symbol => subscribe(symbol))
    })

    onMessage((data: Stock[]) => {
      const formattedData = formatChartData(data)
      setChartData(formattedData)
      symbols.forEach(symbol => unsubscribe(symbol))
    })

    return () => {
      symbols.forEach(symbol => unsubscribe(symbol))
    }
  }, [])

  const formatChartData = (data: Stock[]): ChartData => {
    const labels = data.map(item => item.s.replace('BINANCE:', ''))
    const prices = data.map(item => item.p)
    return {labels, datasets: [{data: prices}]}
  }

  if (!Boolean(chartData.labels.length)) {
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
      <View style={styles.container}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: colors.purple50,
            backgroundGradientFrom: colors.purple50,
            backgroundGradientTo: colors.purple100,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => colors.gray800,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.purple500,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
})

export default GraphScreen
