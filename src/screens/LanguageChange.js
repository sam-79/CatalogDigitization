import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, RadioButton, TouchableRipple, useTheme } from 'react-native-paper'

import { languageResources } from "../../services/i18next"
import languagesList from "../../services/languagesList.json"
import { useTranslation } from 'react-i18next'
import { changeLng } from '../../redux/features/languageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CUSTOM_MARGIN } from '../constants'

const LanguageChange = () => {
    const language = useSelector(state => state.language)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const theme = useTheme();

    {/* /language selection menu */ }
    const changeLanguage = lng => {
        dispatch(changeLng({ lng }));
    };
    console.log(Object.keys(languageResources))

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(languageResources)}
                renderItem={({ item, index }) => (
                    <TouchableRipple rippleColor={theme.colors.primary} style={styles.radioBtnView}>
                        <>
                            <Text variant='titleLarge'>{languagesList[item].name}, {languageResources[item].language}</Text>
                            <RadioButton
                                key={item}
                                label={languagesList[item].name}
                                value={item}
                                status={item != language.language ? 'unchecked' : 'checked'}
                                onPress={() => { changeLanguage(item) }}
                                style={{ width: 100 }}
                            />
                        </>
                    </TouchableRipple>
                )}
                keyExtractor={item => item}
            />
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
        justifyContent:'space-between',
        padding:CUSTOM_MARGIN,
        borderRadius:20,
        
    }
})

export default LanguageChange