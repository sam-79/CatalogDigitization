import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { APP_SCREENS, CUSTOM_MARGIN } from '../constants'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getProductStats } from '../api/retailproduct';

const ProductSummary = ({ navigation }) => {
    const { t } = useTranslation();
    const { productStats, isLoading } = useSelector(state => state.retailproduct);
    const { value } = useSelector(state => state.hostname);
    const { userData } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        // used to fetch product list 
        return navigation.addListener("focus", () => {
            dispatch(getProductStats({ hostname: value, userData }))
        });
    }, [navigation])


    return (
        <View style={StyleSheet.container}>
            <ScrollView>

                <TouchableRipple style={[styles.statsView, { backgroundColor: "#dfede4", borderColor: "#7aad8d" }]}
                    onPress={() => navigation.navigate(APP_SCREENS.PRODUCTS_LIST, { source: APP_SCREENS.PRODUCTS_SUMMARY })}
                >
                    <View>
                        <Text variant='headlineSmall' style={styles.headlineText}>{t('total_products')}</Text>
                        <Text variant='displaySmall'>{productStats ? productStats.product_total_count : isLoading ? t("loading") : "NA"}</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple style={[styles.statsView, { backgroundColor: '#fff', borderColor: '#d5d5d5' }]}>
                    <View>
                        <Text variant='headlineSmall' style={styles.headlineText}>{t('total_categories')}</Text>
                        <Text variant='displaySmall'>{productStats ? productStats.product_category_count : isLoading ? t("loading") : "NA"}</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple style={[styles.statsView, { backgroundColor: '#fff', borderColor: '#d5d5d5' }]}>
                    <View>
                        <Text variant='headlineSmall' style={styles.headlineText}>{t('total_brand')}</Text>
                        <Text variant='displaySmall'>{productStats ? productStats.total_brands : isLoading ? "Loading" : "NA"}</Text>
                    </View>
                </TouchableRipple>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    statsView: {
        margin: CUSTOM_MARGIN,
        marginVertical: CUSTOM_MARGIN / 2,
        borderRadius: CUSTOM_MARGIN / 2,
        padding: CUSTOM_MARGIN,
        borderWidth: 1
    },
    headlineText: {
        color: "#677270",
        marginBottom: 10
    }

})

export default ProductSummary