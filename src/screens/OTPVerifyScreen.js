import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SendOTP, VerifyOTP } from '../api/auth';
import { useSelector } from 'react-redux'
import { APP_SCREENS } from '../constants';
import { useTranslation } from 'react-i18next';




const OTPVerifyScreen = ({ navigation, route }) => {

  //const { userData, userVerified } = useSelector(state => state.auth);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const theme = useTheme();
  const [generatingOTP, setGeneratingOTP] = useState(false)
  const [generatedOTP, setGeneratedOTP] = useState(false);
  const [timer, setTimer] = useState(0);
  const { value } = useSelector(state => state.hostname);//hostname
  const { t } = useTranslation();

  console.log("Line 23, OTP verify,\n", "userData:", route.params)


  //use for preventing going back
  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {

  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();
  //     }),
  //   [navigation]
  // );

  useEffect(() => {
    //use for timer of resend otp button
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, navigation]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // If deleting, focus previous input
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 6) {
      //alert(`OTP Verified: ${otp.join('')}`);
      VerifyOTP({ username: route.params.email, otp: otp.join(''), hostname: value })
        .then((response) => {
          if (response.detail.is_verified) {
            Alert.alert(t("otp_verified"));
            // changeVerifiedStatus({ is_verified: true })
            navigation.navigate(APP_SCREENS.SIGNIN);
          } else {
            Alert.alert(response.detail.msg)
          }
        }).catch(
          Alert.alert(t('fail'),t('fail_otp'))
        )
    } else {
      Alert.alert(t('error'),t('invalid_otp'));
    }

  };

  const handleSendOTP = () => {

    setGeneratingOTP(true)
    SendOTP({ username: route.params.email, hostname: value })
      .then((response) => {
        console.log("OTP screen 83:", response)
        setGeneratingOTP(false)
        setGeneratedOTP(true)
        Alert.alert(response.msg);
      })
      .catch(() => {
        setGeneratingOTP(false)
        setTimer(0)
        Alert.alert(t("fail_to_send_otp"))
      })

    setTimer(60); // Start the timer for 60 seconds

    // Simulate OTP generation

  }

  return (
    <View style={styles.container}>
      {
        generatedOTP ?
          <View>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{t("enter_otp")}</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[styles.otpBox, { borderColor: theme.colors.primary }]}
                  value={digit}
                  onChangeText={text => handleChangeText(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={ref => inputs.current[index] = ref}
                />
              ))}
            </View>
            <Text variant='bodyMedium'>{t('otp_send_to')} {route.params ? route.params.email : ""}</Text>
            <Button
              mode="contained"
              onPress={handleVerify}
              style={styles.verifyButton}
              contentStyle={styles.verifyButtonContent}
            >
              {t('verify')}
            </Button>
            <Button
              mode="outlined"
              onPress={handleSendOTP}
              style={styles.verifyButton}
              contentStyle={styles.verifyButtonContent}
              disabled={timer > 0}
            >
              {timer > 0 ? `${t('resend_otp_in')} ${timer}s` : t('resend_otp')}
            </Button>
          </View>
          :
          <View>
            <Text variant='displayLarge' style={{}} >{t('verify_otp')}</Text>
            <Text variant='bodyMedium'> {t('send_otp_to')} {route.params ? route.params.email : ""}</Text>
            <Button
              mode="contained"
              onPress={handleSendOTP}
              style={styles.verifyButton}
              contentStyle={styles.verifyButtonContent}
            >
              {generatingOTP ? <ActivityIndicator animating={generatingOTP} /> : t('send_otp')}
            </Button>
          </View>
      }

      <Button mode='outlined' onPress={() => navigation.navigate(APP_SCREENS.SIGNIN)}>
        {t('signin')}
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '80%',
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  verifyButton: {
    marginTop: 20,
  },
  verifyButtonContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default OTPVerifyScreen;
