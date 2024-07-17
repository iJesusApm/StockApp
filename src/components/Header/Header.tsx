import React from 'react'
import {View, Text} from 'react-native'

import {useTranslation} from 'react-i18next'

import {useTheme} from '@/theme'
import layout from '@/theme/layout'

const Header = () => {
  const {gutters, fonts} = useTheme()
  const {t} = useTranslation(['common'])

  return (
    <View style={[layout.row, layout.justifyBetween]}>
      <Text style={[fonts.gray400, fonts.bold, fonts.size_24, gutters.marginLeft_16, gutters.marginTop_12]}>
        {t('common:appName.full')}
      </Text>
    </View>
  )
}

export default Header
