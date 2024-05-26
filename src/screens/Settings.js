import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList, useColorScheme } from 'react-native'
import { Text, useTheme, TouchableRipple, Portal, Dialog, RadioButton } from 'react-native-paper'
import { CUSTOM_MARGIN } from '../constants';

const Settings = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const themeOptions = ['applight', 'appdark', 'system_theme'];
  const [themeDialogVisible, setThemeDialogVisible] = useState(false);
  const [selectedTHeme, setSelectedTheme] = useState()
  const handleSelectTheme = (selectedTheme) => {
    console.log(selectedTheme)
  }

  return (
    <View style={styles.container}>
      <Text>{t("settings")}</Text>

      <TouchableRipple onPress={() => setThemeDialogVisible(true)} rippleColor={theme.colors.primary} style={styles.radioBtnView}>
        <>
          <Text variant='titleLarge'>{t('theme')}</Text>
          <Portal>
            <Dialog visible={themeDialogVisible} onDismiss={() => setThemeDialogVisible(false)}>
              <Dialog.Title>{t("choose_theme")}</Dialog.Title>
              <Dialog.Content>

                {/* //RadioButtons for theme selections */}
                <FlatList
                  data={themeOptions}
                  renderItem={({ item, index }) => (
                    <TouchableRipple rippleColor={theme.colors.primary} style={styles.radioBtnView}>
                      <>
                        <Text variant='titleLarge'>{t(item)}</Text>
                        <RadioButton
                          key={item}
                          label={item}
                          value={item}
                          status={item != language.language ? 'unchecked' : 'checked'}
                          onPress={() => { handleSelectTheme }}
                          style={{ width: 100 }}
                        />
                      </>
                    </TouchableRipple>
                  )}
                  keyExtractor={item => item}
                />
              </Dialog.Content>
            </Dialog>
          </Portal>
        </>
      </TouchableRipple>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: CUSTOM_MARGIN,
  },
  radioBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: CUSTOM_MARGIN,
    borderRadius: 20,

  }
})

export default Settings