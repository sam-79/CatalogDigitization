import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, Pressable, Dimensions, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { HomeStyles as styles } from './styles';
import { Audio } from "expo-av";
import { useTranslation } from 'react-i18next';

const SCREENWIDTH = Dimensions.get("window").width;

//COMponent to scan product 
const VoiceAddProduct = ({ navigation }) => {
    const [permission, requestPermission] = Audio.usePermissions();
    // const [isRecording, setIsRecording] = useState(false);
    const [sound, setSound] = useState(null);
    const [soundURI, setSoundURI] = useState(null);

    const { t } = useTranslation();

    //console.log("audioUri:", sound)
    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        return navigation.addListener("focus", () => {
            setSound(null);
            setSoundURI(null)
        });
    }, [navigation])

    // if (!permission.granted) {
    //     // Audio permissions are not granted yet
    //     return (
    //         <View style={styles.container}>
    //             <Text style={{ textAlign: 'center' }}>{t("need_permission_for_audio")}</Text>
    //             <Button onPress={requestPermission} title={t("grant_permission")} />
    //         </View>
    //     );
    // }

    async function startRecording() {

        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: true,
        }); // <= important for IOS

        const newRecording = new Audio.Recording();
        setSound(newRecording);


        await newRecording.prepareToRecordAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        // newRecording.setOnRecordingStatusUpdate((status) => {
        //     //console.log("status", status)
        //     // setIsRecording(status.isRecording)
        // });

        // setIsRecording(true)
        await newRecording.startAsync();
    }

    async function stopRecording() {
        //console.log('Stopping recording..');

        if (!sound) {
            Alert.alert(t("error"), t("audio_not_recording"))
            return;
        }

        try {
            await sound.stopAndUnloadAsync();
            //console.log(`Recorded URI: ${sound.getURI()}`);
            setSoundURI(sound.getURI());
            // setIsRecording(false)
        } catch (error) {
            // Do nothing -- we are already unloaded.
            Alert.alert(t("error"), t("error_stop_audio"))
        }
    }

    async function playSound() {
        //console.log('Playing Sound');
        try {
            //console.log(sound)
            if (sound) {
                const SoundObj = await sound.createNewLoadedSoundAsync();
                await SoundObj.sound.playAsync();

                // await SoundObj.sound.unloadAsync();
            }
        } catch (error) {
            Alert.alert(t('error'), t("error_playing_audio"));
        }
    }

    const retakeAudio = () => {
        setSound(null);
        setSoundURI(null)
    };

    const handleAudioSubmit = () => {
        // You can pass the captured image URI to the next screen or perform any other action here
        // Navigate to the next screen
        navigation.navigate("AddProduct", { ean: '', audioUri: soundURI, source: "productAudio" });
    };

    return (
        <View style={[styles.container, { alignItems: 'center', padding: 0 }]}>

            {permission && permission.granted ? (
                <View style={[styles.container]}>
                    {soundURI ? (
                        <>
                            <View style={styles.optionsView}>
                                <Pressable onPress={retakeAudio} style={[styles.button, { backgroundColor: '#FF5733' }]}>
                                    <Text style={{ color: 'white' }}>{t("retake")}</Text>
                                </Pressable>
                                <Pressable onPress={handleAudioSubmit} style={[styles.button, { backgroundColor: '#32CD32' }]}>
                                    <Text style={{ color: 'white' }} >{t("proceed")}</Text>
                                </Pressable>
                            </View>

                            <Button title={sound ? t("play_audio") : t('playing')} onPress={playSound} />
                        </>
                    ) : (

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <Text style={styles.audio_instructions}>{t("press_n_hold_record")}</Text>
                            <Text style={styles.audio_instructions}>{t("speak_product_name")}</Text>
                            <Text style={styles.audio_instructions}>{t("loud_n_clear")}</Text>
                            <Pressable onPressIn={startRecording} onPressOut={stopRecording} style={[styles.audioRecordButton, {
                                backgroundColor: sound ? "#007FFF" : "#FF033E"
                            }]}>
                                {sound && <Text style={{ color: 'white', textAlign: 'center' }}>{t("recording")}</Text>}
                                <MaterialCommunityIcons name='microphone' size={40} color={"white"} />
                            </Pressable>


                        </View>
                    )}

                </View>
            ) : (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //     <Text>Please grant camera permission</Text>
                //     <Button title="Grant Permission" onPress={requestPermission} />
                // </View>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center' }}>{t("need_permission_for_mic")}</Text>
                    <Button onPress={requestPermission} title={t("grant_permission")} />
                </View>
            )}
        </View>
    );
};

export default VoiceAddProduct;
