import { Text, TextInput, View, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyCustomButton from '../components/MyCustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../api/auth';
import { AuthStyles as styles } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next';
import LanguageSelectModal from '../components/LanguageSelectModal';
import { resetTempValues } from '../../redux/features/authSlice';
import { LogInPerson } from './Signin';
import { APP_SCREENS } from '../constants';

const Signup = ({ navigation }) => {



  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // hooks
  const dispatch = useDispatch();
  const { isLoading, isSuccess, userVerified } = useSelector(state => state.auth);
  const { value } = useSelector(state => state.hostname);
  const { t } = useTranslation();


  useEffect(() => {
    navigation.addListener('focus', (e) => {
      dispatch(resetTempValues())
    }
    )
  }, [navigation])

  useEffect(() => {
    if ( isSuccess && !userVerified) {
      // Alert.alert("Signup success verify OTP")
      navigation.navigate(APP_SCREENS.OTPVERIFY, { source: APP_SCREENS.SIGNUP, email: email });
    }
  }, [isSuccess])

  // functions
  const handleSignup = () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      Alert.alert(t('error'), t('enter_credentials'));
      return;
    }

    const params = {
      name: name,
      username: email,
      password: password,
      hostname: value
    };
    //console.log('~ file: signup.js:27 ~ signup ~ params:', params);
    dispatch(signup(params));


  };

  return (
    <View style={styles.container}>
      <LogInPerson />
      <Text style={styles.title}>{t("signup")}</Text>
      <TextInput
        value={name}
        placeholder={t("enter_name")}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="grey"
        autoCapitalize="words"
      />
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
          style={{width:'90%'}}
        />
        <Pressable onPress={() => { setHidePassword(!hidePassword) }} style={{ justifyContent: 'center' }}>
          <MaterialCommunityIcons name={hidePassword ? "eye-off" : "eye"} color={"black"} size={26} />
        </Pressable>
      </View>
      <MyCustomButton isLoading={isLoading} title={t("signup")} onPress={handleSignup} BtnStyle={styles.BtnStyle} TextStyle={styles.TextStyle} />

      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text style={[styles.TextStyle, { color: 'black' }]}>
          {t("already_have_account")}
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

export default Signup;

