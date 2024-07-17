import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import {useTranslation} from 'react-i18next'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {useTheme} from '@/theme'

type Props = {
  onActionPress?: () => void
  iconName?: string
}

const Header = ({onActionPress, iconName = 'circle'}: Props) => {
  const {gutters, fonts, colors, layout} = useTheme()
  const {t} = useTranslation(['common'])

  return (
    <View style={[layout.row, layout.justifyBetween, gutters.marginTop_12, gutters.marginHorizontal_12]}>
      <Text style={[fonts.gray400, fonts.bold, fonts.size_24]}>{t('common:appName.full')}</Text>
      {Boolean(onActionPress) && (
        <TouchableOpacity testID="call-to-action-button" style={[layout.justifyCenter]} onPress={onActionPress}>
          <Icon name={iconName} size={28} color={colors.purple500} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Header
