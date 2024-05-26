import { View, Alert, Pressable, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import ProductInfo from '../components/ProductInfo';
import { HomeStyles, AuthStyles } from './styles';
import MyCustomButton from '../components/MyCustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, getProductByAudio, getProductByEAN, getProductByImage } from '../api/retailproduct';
import { useTranslation } from 'react-i18next';
import { APP_SCREENS } from '../constants';
const CUSTOM_MARGIN = 20;


const AddProduct = ({ navigation, route }) => {
    const { t } = useTranslation();
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const [product, setProduct] = useState({
        name: '',
        brand: '',
        image_url: '',
        category: '',
        ean: '', //route.params.ean
        description: '',
        price: '',
    });

    //console.log("userdata @27 AddProduct", userData)
    useEffect(() => {
        return navigation.addListener("focus", () => {
            if (route.params.source == 'barcodeImage') {
                setIsLoading(true);
                console.log("getbarcoeproduct started", userData)
                getProductByEAN({ ean: route.params.ean, userData, hostname: value })
                    .then((response) => {
                        setIsLoading(false)
                        for (const key in response) {
                            if (product.hasOwnProperty(key)) {
                                setProduct(prevData => ({
                                    ...prevData,  // Spread previous data to keep unchanged keys
                                    [key]: String(response[key])  // Update the specific key with the new value
                                }));
                            }
                        }

                    })
                    .catch((error) => {
                        setIsLoading(false)

                        //console.log(error)
                        Alert.alert(t("message"), t("not_able_to_get_product_details_please_enter_manually"))
                    })
            } else if (route.params.source == 'productImage') {
                setIsLoading(true);
                getProductByImage({ imageUri: route.params.imageUri, userData, hostname: value })
                    .then((response) => {
                        console.log("image", response)
                        setIsLoading(false)
                        for (const key in response) {
                            if (product.hasOwnProperty(key)) {
                                setProduct(prevData => ({
                                    ...prevData,  // Spread previous data to keep unchanged keys
                                    [key]: String(response[key])  // Update the specific key with the new value
                                }));
                            }
                        }

                    })
                    .catch((error) => {
                        setIsLoading(false)

                        //console.log(error)
                        Alert.alert(t("fail"), t("not_able_to_get_product_details_please_enter_manually"))
                    })
            } else if (route.params.source == 'productAudio') {
                setIsLoading(true);
                getProductByAudio({ audioUri: route.params.audioUri, userData, hostname: value })
                    .then((response) => {
                        setIsLoading(false)
                        //console.log("get by audio line 77", response)
                        for (const key in response) {
                            if (product.hasOwnProperty(key)) {
                                setProduct(prevData => ({
                                    ...prevData,  // Spread previous data to keep unchanged keys
                                    [key]: String(response[key])  // Update the specific key with the new value
                                }));
                            }
                        }

                    })
                    .catch((error) => {
                        setIsLoading(false)

                        //console.log(error)
                        Alert.alert(t("fail"), t("not_able_to_get_product_details_please_enter_manually"))
                    })
            } else if (route.params.source == APP_SCREENS.ADDPRODUCTBULK) {
                let item = route.params.item;
                for (const key in item) {
                    if (product.hasOwnProperty(key)) {
                        setProduct(prevData => ({
                            ...prevData,  // Spread previous data to keep unchanged keys
                            [key]: String(item[key])  // Update the specific key with the new value
                        }));
                    }
                }
            }
        })
    }, [navigation])

    // const GetProductDetails = () => {
    //     setIsLoading(true);
    //     getProductByEAN({ ean: route.params.ean, access_token: userData.access_token, hostname: value })
    //         .then((response) => {
    //             setIsLoading(false)
    //             for (const key in response) {
    //                 if (product.hasOwnProperty(key)) {
    //                     setProduct(prevData => ({
    //                         ...prevData,  // Spread previous data to keep unchanged keys
    //                         [key]: response[key]  // Update the specific key with the new value
    //                     }));
    //                 }
    //             }

    //         })
    //         .catch((error) => {
    //             setIsLoading(false)

    //             //console.log(error)
    //             Alert.alert("Message", "Not able to get Product Details, please enter details manually")
    //         })
    // }


    const handleSave = () => {
        //used specially for Bulk Add product
        // const { onDataModify } = route.params;
        // if (onDataModify) {
        //     onDataModify(product);
        // }
        // navigation.goBack();
        for (const key in product) {
            if (product.hasOwnProperty(key)) {
                if (product[key] === undefined || product[key] === null || product[key].trim() === '') {
                    Alert.alert(t("error"), t("please_fill_all_details"))
                    return;
                }
            }
        }

        console.log("handleSave, Addproduct.js")
        navigation.navigate({ name: APP_SCREENS.ADDPRODUCTBULK, params: { product: { ...product, id: route.params.item.id }, source: APP_SCREENS.ENTER_MANUALLY }, merge: true })
    };

    //for saving product to user catalog
    const handleSaveProduct = () => {

        //checks for field should not empty
        for (const key in product) {
            if (product.hasOwnProperty(key)) {
                if (product[key] === undefined || product[key] === null || product[key].trim() === '') {
                    Alert.alert(t("error"), t("please_fill_all_details"))
                    return;
                }
            }
        }


        //calling add product function
        setIsLoading(true);
        addProduct({ product, hostname: value, access_token: userData.access_token })
            .then((response) => {
                setIsLoading(false);
                if (response.status === "Product Details Added Successfully") {
                    Alert.alert(t("success"), t("product_added_success"))
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

    return (
        <ScrollView style={[styles.container, {}]}>

            {
                isLoading &&
                <Text variant='headlineMedium' style={{ margin: CUSTOM_MARGIN, textAlign: 'center' }}>{t("loading_product_details")}</Text>
            }


            {
                isLoading ?
                    <>
                        <ActivityIndicator animating={isLoading} size="large" />
                        <Text variant='bodyMedium' style={{ margin: CUSTOM_MARGIN, textAlign: 'center' }}>{t("please_wait")}</Text>
                    </> :
                    <ProductInfo editable={true} productDetails={product} updateProductInfo={setProduct} />
            }


            {
                route.params.source === APP_SCREENS.ADDPRODUCTBULK ?
                    <Button
                        mode='elevated'
                        // dark={true}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.background}
                        onPress={handleSave}
                        style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}
                    >
                        {t("save")}
                    </Button>
                    :
                    !isLoading && <Button icon='plus'
                        mode='elevated'
                        // dark={true}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.background}
                        onPress={handleSaveProduct}
                        style={{ height: 50, justifyContent: 'center', margin: CUSTOM_MARGIN }}
                    >
                        {t("add_product")}
                    </Button>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default AddProduct