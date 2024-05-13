import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, Pressable, Dimensions, Alert, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { HomeStyles as styles } from './styles';
import { useTranslation } from 'react-i18next';
import Voice from '@react-native-voice/voice'
const SCREENWIDTH = Dimensions.get("window").width;

//COMponent to scan product 
const AnalyzeVoice = ({ navigation }) => {

    const { t } = useTranslation();

    // const [pitch, setPitch] = useState(null);
    // const [error, setError] = useState(null);
    // const [end, setEnd] = useState(null);
    const [started, setStarted] = useState(false);
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);


    useEffect(() => {
        //Setting callbacks for the process status
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStart = (e) => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        setStarted('√');
    };

    const onSpeechEnd = (e) => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        // setEnd('√');
    };

    const onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e) => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        setResults(e.value);
    };

    const onSpeechPartialResults = (e) => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        setPartialResults(e.value);
    };

    // const onSpeechVolumeChanged = (e) => {
    //     //Invoked when pitch that is recognized changed
    //     console.log('onSpeechVolumeChanged: ', e);
    //     setPitch(e.value);
    // };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        try {
            await Voice.start('en-US');
            // setPitch('');
            setStarted(true);
            setResults([]);
            setPartialResults([]);
            // setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
            Alert.alert("Error", `${e}`)

        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
            Alert.alert("Error", `${e}`)
        }
    };

    const cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
            setStarted(false);
            setResults([]);
            setPartialResults([]);
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
            Alert.alert("Error", `${e}`)
        }
    };

    const destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
            await Voice.destroy();
            // setPitch('');
            setStarted(false);
            setResults([]);
            setPartialResults([]);
            // setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };


    return (
        <View style={[styles.container, { alignItems: 'center', padding: 0 }]}>

            {
                results.length > 0 ?
                    <>
                        <Text style={styles.amountText}>Result</Text>
                        <ScrollView style={{ maxHeight: 200 }}>
                            {results.map((result, index) => {
                                return (
                                    <Text
                                        key={`result-${index}`}
                                        style={styles.textStyle}>
                                        {result}
                                    </Text>
                                );
                            })}
                        </ScrollView>
                        <View style={styles.optionsView}>

                            <Pressable onPress={cancelRecognizing} style={[styles.button, { backgroundColor: '#FF5733' }]}>
                                <Text style={{ color: 'white' }}>{t("retake")}</Text>
                            </Pressable>
                            <Pressable onPress={() => { console.log("SUbmitting", results) }} style={[styles.button, { backgroundColor: '#32CD32' }]}>
                                <Text style={{ color: 'white' }} >{t("proceed")}</Text>
                            </Pressable>
                        </View>
                    </>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={styles.audio_instructions}>{t("press_n_hold_record")}</Text>
                        <Text style={styles.audio_instructions}>{t("speak_product_name")}</Text>
                        <Text style={styles.audio_instructions}>{t("loud_n_clear")}</Text>
                        <Pressable onPressIn={startRecognizing} onPressOut={stopRecognizing} style={[styles.audioRecordButton, {
                            backgroundColor: started ? "#007FFF" : "#FF033E"
                        }]}>
                            {started && <Text style={{ color: 'white', textAlign: 'center' }}>{t("recording")}</Text>}
                            <MaterialCommunityIcons name='microphone' size={40} color={"white"} />
                        </Pressable>
                        <ScrollView style={{maxHeight:200}}>
                            {partialResults.map((result, index) => {
                                return (
                                    <Text
                                        key={`partial-result-${index}`}
                                        style={styles.textStyle}>
                                        {result+" "}
                                    </Text>
                                );
                            })}
                        </ScrollView>


                    </View>
            }

        </View>
    );
};

export default AnalyzeVoice;
