import { View, Text, Alert, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProductInfo from '../components/ProductInfo';
import { HomeStyles as styles, AuthStyles } from './styles';
import MyCustomButton from '../components/MyCustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, getProductByAudio, getProductByEAN, getProductByImage } from '../api/retailproduct';
import { useTranslation } from 'react-i18next';


const AddProduct = ({ navigation, route }) => {
    const { t } = useTranslation();
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        brand: '',
        image_url: '',
        category: '',
        ean: route.params.ean,
        description: '',
        price: '',
    });

    //console.log("userdata @27 AddProduct", userData)
    useEffect(() => {
        return navigation.addListener("focus", () => {
            if (route.params.source == 'barcodeImage') {
                setIsLoading(true);
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
                        Alert.alert(t("message"), t("not_able_to_get_product_details_please_enter_manually"))
                    })
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
                    Alert.alert(t("fail"), t(response.message))
                }
                navigation.navigate("Home")
            })
            .catch((error) => {
                setIsLoading(false);
                Alert.alert(t("error"), t("fail_to_save") + `${error.message}`)
            })

    }

    return (
        <View style={[styles.container, { alignItems: 'center' }]}>
            <Text style={styles.heading}>
                {
                    isLoading ? t("loading_product_details") : t("enter_product_details")
                }
            </Text>

            {
                isLoading ?
                    <>
                        <ActivityIndicator animating={isLoading} size="large" />
                        <Text>{t("please_wait")}</Text>
                    </> :
                    <ProductInfo editable={true} productDetails={product} updateProductInfo={setProduct} />
            }


            {
                !isLoading && <Pressable style={styles.continueButton} onPress={handleSaveProduct}>
                    <Text style={styles.continueButtonText}>+ {t("add_product")}</Text>
                </Pressable>
            }

        </View>
    )
}

export default AddProduct