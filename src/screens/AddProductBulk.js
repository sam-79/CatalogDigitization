import { ActivityIndicator, Alert, Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useTheme, Text, Button, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants';
import { addBulkProduct, getProductsByAudioText } from '../api/retailproduct';
import ProductInfo from '../components/ProductInfo';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;


const AddProductBulk = ({ navigation, route }) => {

    const { t } = useTranslation();
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const flatListRef = useRef();          // a reference of flatList to call its scrollToIndex function
    const indexRef = useRef(0);

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {

        return navigation.addListener("focus", () => {
            if (route.params.source == APP_SCREENS.ADD_BY_VOICE) {
                setIsLoading(true);
                console.log("AddProductBulk file")

                getProductsByAudioText({ resultText: route.params.resultText, userData: userData, hostname: value })
                    .then((response) => {
                        setIsLoading(false);
                        if (response.product_details) {
                            setProductsList(response.product_details)
                        } else {
                            throw new Error(`${t('unknow_error')}`);
                        }
                    }).catch(error => {
                        setIsLoading(false);
                        Alert.alert(t('error'), "erro")
                    })
            } else if (route.params.source == APP_SCREENS.ENTER_MANUALLY) {
                if (route.params?.product) {
                    // Post updated, do something with `route.params.post`
                    // For example, send the post to the server
                    const product = route.params?.product;
                    console.log("onDataModify:", product)
                    const updated = productsList.map((item) => {
                        if (item.id === product.id) {
                            // Increment the clicked counter
                            return product;
                        } else {
                            // The rest haven't changed
                            return item;
                        }
                    });
                    console.log("updated", updated)
                    setProductsList(updated);
                }
            }
        })
    }, [navigation, route.params?.product])




    const removeProduct = (params) => {
        Alert.alert(`${t('delete')}`, `Deleting ${params.name} `, [
            {
                text: t('cancel'),
                style: 'cancel',
            },
            {
                text: t('delete'), onPress: () => setProductsList(productsList.filter(
                    p => p.id !== params.id
                ))
            },
        ]);

    }

    const handleAddBulkProduct = () => {
        setIsLoading(true);
        console.log("handleAddBulkProduct", productsList)
        addBulkProduct({ hostname: value,access_token: userData.access_token, productsList:productsList })
            .then((response) => {
                setIsLoading(false);
                if (response.status === "Products processed") {
                    let total_added = response.added_products.length
                    let total_not_added = response.errors.length
                    Alert.alert(t("result"), t("product_added_success") + "\n" + t("success:") + total_added + "\n" + t("fail"), total_not_added)
                } else {
                    Alert.alert(t("fail"), response.message)
                }
                navigation.navigate(APP_SCREENS.HOME)
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert(t("error"), t("fail_to_save") + `${error.message}`)
            })

    }



    const renderItems = ({ index, item }) => {
        console.log(item)
        return (
            <TouchableRipple style={[styles.statsView, { backgroundColor: '#fff', borderColor: '#d5d5d5' }]}>
                <View>
                    <Text variant='headlineSmall' style={styles.headlineText}>{item.name}</Text>
                    <Text variant='titleMedium' style={styles.headlineText}>{item.brand}</Text>
                    <Text variant='labelLarge' style={styles.headlineText}>Price: {item.price}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: CUSTOM_MARGIN, marginVertical: CUSTOM_MARGIN / 2 }}>
                        <Button mode='contained' buttonColor='#ee636d' contentStyle={styles.itemBtn}
                            onPress={() => removeProduct(item)}>{t('remove')}</Button>
                        <Button mode='outlined' contentStyle={styles.itemBtn}
                            onPress={() => navigation.navigate(APP_SCREENS.ENTER_MANUALLY, { source: APP_SCREENS.ADDPRODUCTBULK, item: item })}>{t('review')}</Button>
                    </View>
                </View>

            </TouchableRipple>
        )
    }

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <View>
                        <ActivityIndicator animating={isLoading} size={'large'} />
                        <Text >{t('please_wait')} </Text>
                    </View>
                    :
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={productsList}
                            keyExtractor={item => item.id}
                            renderItem={renderItems}
                            ref={flatListRef}
                        // scrollEnabled={false}
                        // onScroll={onScroll}
                        // initialNumToRender={0}
                        />
                        <Button mode='contained' onPress={handleAddBulkProduct} style={{ margin: CUSTOM_MARGIN }}>
                            {t('add_product')}
                        </Button>

                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'blue'
    },
    flatListContainer: {
        // backgroundColor: 'yellow'
    },
    statsView: {
        margin: CUSTOM_MARGIN,
        marginVertical: CUSTOM_MARGIN / 2,
        borderRadius: CUSTOM_MARGIN / 2,
        padding: CUSTOM_MARGIN,
        borderWidth: 1,
        width: WIDTH - CUSTOM_MARGIN * 2
    },
    itemBtn: {
        // height:20,

    }
})

export default AddProductBulk