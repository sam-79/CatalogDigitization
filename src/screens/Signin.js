import { Text, TextInput, View, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import MyCustomButton from '../components/MyCustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../api/auth';
import { AuthStyles as styles } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next';
import LanguageSelectModal from '../components/LanguageSelectModal';

const Signin = ({ navigation }) => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // hooks
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const { value } = useSelector(state => state.hostname);
  const { t } = useTranslation();

  // functions
  const handleSignin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(t('error'), t('enter_credentials'));
      return;
    }
    const params = {
      username: email,
      password: password,
      hostname: value
    };
    //console.log('~ file: signinin.js:32 ~ signin ~ params:', params);
    dispatch(signin(params));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("signin")}</Text>
      <TextInput
        value={email}
        placeholder={t("enter_email")}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <View style={styles.input}>
        <TextInput
          value={password}
          placeholder={t("enter_password")}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          placeholderTextColor="grey"
        />
        <Pressable onPress={() => { setHidePassword(!hidePassword) }} style={{ justifyContent: 'center' }}>
          <MaterialCommunityIcons name={hidePassword ? "eye-off" : "eye"} color={"black"} size={26} />
        </Pressable>
      </View>
      <MyCustomButton isLoading={isLoading} title={t("signin")} onPress={handleSignin} BtnStyle={styles.BtnStyle} TextStyle={styles.TextStyle} />

      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text style={[styles.TextStyle,{color:'black'}]}>
          {t("not_have_account_Sign_Up")}
        </Text>
      </Pressable>

      <MyCustomButton
        title={t("change_language")}
        onPress={() => setModalVisible(true)}
        BtnStyle={styles.BtnStyle}
        TextStyle={styles.TextStyle}
      />
      <LanguageSelectModal visible={modalVisible} setVisible={setModalVisible} />

    </View>
  );
};

export default Signin;

