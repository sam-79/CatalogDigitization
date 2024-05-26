import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Text, TextInput, Paragraph } from 'react-native-paper'

import { useSelector } from 'react-redux'
import { getProductsByAudioText } from '../api/retailproduct'
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants'
import { useTranslation } from 'react-i18next'

const WIDTH = Dimensions.get('screen').width
const TestScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { value } = useSelector(state => state.hostname);
  const { userData } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");



  const handleAudioTextSubmit = () => {

    // getProductsByAudioText({ resultText: result, hostname: value })
    //   .then((response) => {

    //   }).catch((response) => {
    //     Alert.alert("Error", response)
    //   })
  }


  return (
    <View style={styles.container}>
      <Paragraph style={styles.description}>
        {t('voice_reg_para')}
      </Paragraph>
      {/* <Text variant='bodyLarge'>
        Enter data here{'\n'}{result}
      </Text> */}
      <TextInput
        mode='outlined'
        label={t("input_data")}
        value={result}
        onChangeText={text => setResult(text)}
        style={styles.textField}
        multiline={true}
      />
      <Button mode='contained' onPress={() => navigation.navigate(APP_SCREENS.ADDPRODUCTBULK, { source: APP_SCREENS.ADD_BY_VOICE, resultText: result })}>
        {t("proceed")}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    margin: CUSTOM_MARGIN,
    width: WIDTH - CUSTOM_MARGIN * 2,
    height: 100

  },
  description:{
    textAlign: 'center',
    marginVertical: CUSTOM_MARGIN,
  }
})
export default TestScreen