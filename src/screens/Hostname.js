import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import MyCustomButton from '../components/MyCustomButton';

import { check_hostname } from '../../redux/features/hostnameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AuthStyles as styles } from './styles';
import LanguageSelectModal from '../components/LanguageSelectModal';

const Hostname = () => {
  const { isLoading, isError, error } = useSelector(state => state.hostname);
  const dispatch = useDispatch();
  const [hostURL, setHostURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();


  const handleSubmit = () => {
    if (hostURL.trim() === '') {
      Alert.alert(t('error'), t('penter_hostname'));
      return;
    }

    // Call your function with the place data
    dispatch(check_hostname({ value: hostURL }))
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("enter_hostname")}</Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setHostURL(text)}
        value={hostURL}
        placeholder={t("enter_host_url")}
      />
      <MyCustomButton
        title={t("submit")}
        onPress={handleSubmit}
        BtnStyle={styles.BtnStyle}
        TextStyle={styles.TextStyle}
        isLoading={isLoading}
      />

      <MyCustomButton
        title={t("change_language")}
        onPress={() => setModalVisible(true)}
        BtnStyle={styles.BtnStyle}
        TextStyle={styles.TextStyle}
      />



      {isError && <>
        <Text>{error}</Text>
        <Text>{t("tryagain")}</Text>
      </>}

      <LanguageSelectModal visible={modalVisible} setVisible={setModalVisible} />

    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     width: '80%',
//     borderRadius: 5,
//   },

// });

export default Hostname