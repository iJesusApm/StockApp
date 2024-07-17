import React, {useEffect} from 'react'
import {ActivityIndicator, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {CommonActions} from '@react-navigation/native'

import {useTheme} from '@/theme'
import {SafeScreen} from '@/components/template'

import type {RootScreenProps} from '@/types/navigation'

function Startup({navigation}: RootScreenProps<'Startup'>) {
  const {layout, gutters, fonts, variant, changeTheme} = useTheme()
  const {t} = useTranslation(['welcome'])

  const handleInit = () => {
    if (variant === 'default') {
      changeTheme('dark')
    }

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        })
      )
    }, 2000)
  }

  useEffect(() => {
    handleInit()
  }, [])

  return (
    <SafeScreen>
      <View style={[layout.flex_1, layout.col, layout.itemsCenter, layout.justifyCenter]}>
        <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>{t('welcome:title')}</Text>
        <Text style={[fonts.gray400, fonts.bold, fonts.size_24, gutters.marginBottom_32]}>{t('welcome:subtitle')}</Text>
        <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
      </View>
    </SafeScreen>
  )
}

export default Startup
