import React, {useState} from 'react'
import {View, Text, Modal, TextInput, Button} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {useTranslation} from 'react-i18next'

import {SafeScreen} from '@/components/template'
import {useTheme} from '@/theme'

type ModalAlertProps = {
  isVisible: boolean
  onClose: () => void
  onAddAlert: (symbol: string, price: number) => void
  symbols: string[]
}

const ModalAlert = ({isVisible, onClose, onAddAlert, symbols}: ModalAlertProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0])
  const [alertPrice, setAlertPrice] = useState('')
  const {t} = useTranslation(['common'])
  const {colors, layout, fonts, gutters, borders} = useTheme()

  const handleAddAlert = () => {
    onAddAlert(selectedSymbol, parseFloat(alertPrice))
    onClose()
    setSelectedSymbol(symbols[0])
    setAlertPrice('')
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeScreen>
        <View style={[layout.flex_1, layout.justifyCenter, gutters.paddingHorizontal_24]}>
          <Text style={[fonts.gray400, fonts.bold, fonts.size_16]}>{t('common:appName.selectStock')}:</Text>
          <Picker
            selectedValue={selectedSymbol}
            onValueChange={(itemValue: string) => setSelectedSymbol(itemValue)}
            numberOfLines={1}
            style={[layout.fullWidth, gutters.marginVertical_12, borders.rounded_16, {backgroundColor: colors.gray400}]}
            itemStyle={[fonts.size_16, {height: 120}]}>
            {symbols.map(symbol => (
              <Picker.Item key={symbol} label={symbol} value={symbol} />
            ))}
          </Picker>
          <TextInput
            placeholder={t('common:appName.priceAlert')}
            value={alertPrice}
            onChangeText={text => setAlertPrice(text)}
            keyboardType="numeric"
            style={[
              layout.fullWidth,
              borders.rounded_16,
              fonts.size_16,
              gutters.paddingLeft_12,
              fonts.alignCenter,
              {height: 50, backgroundColor: colors.gray400},
            ]}
          />
          <View style={[layout.row, layout.justifyAround, gutters.marginVertical_16]}>
            <Button title={t('common:appName.cancel')} onPress={onClose} color={colors.red500} />
            <Button
              title={t('common:appName.addAlert')}
              disabled={!Boolean(alertPrice)}
              onPress={handleAddAlert}
              color={colors.green500}
            />
          </View>
        </View>
      </SafeScreen>
    </Modal>
  )
}

export default ModalAlert
