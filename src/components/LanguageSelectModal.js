import { View, Text, Modal, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

import { languageResources } from "../../services/i18next"
import languagesList from "../../services/languagesList.json"
import { useTranslation } from 'react-i18next'
import { changeLng } from '../../redux/features/languageSlice'
import { useDispatch, useSelector } from 'react-redux'


const LanguageSelectModal = ({ visible, setVisible }) => {

    const language = useSelector(state => state.language)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    {/* /language selection menu */ }
    const changeLanguage = lng => {
        dispatch(changeLng({ lng }))
        setVisible(false);
    };

    return (
        < Modal visible={visible} onRequestClose={() => setVisible(false)} transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.heading}>{t("select_language")}</Text>

                    <FlatList
                        style={{ width: '100%' }}
                        data={Object.keys(languageResources)}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.button}
                                onPress={() => changeLanguage(item)}>
                                <Text style={styles.textStyle}>
                                    {languagesList[item].name}
                                </Text>
                            </Pressable>

                        )}

                    />

                    <Pressable
                        style={styles.closebutton}
                        onPress={() => setVisible(false)}>
                        <Text style={{ color: 'white', fontSize:15 , textAlign:'center'}}>
                            {t("close")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal >
    )
}
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    heading: {
        fontSize: 30,
        marginVertical: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: 'black',
        width: "100%",
        marginVertical: 5
    },
    closebutton: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#2196F3',
        width: "70%",
        marginTop:20
    },
})
export default LanguageSelectModal