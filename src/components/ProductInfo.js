import React from 'react';
import { TextInput, View, ScrollView, Image, Alert } from 'react-native';
import { HomeStyles as styles } from '../screens/styles';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useTranslation } from 'react-i18next';

const ProductInfo = ({ editable, productDetails, updateProductInfo }) => {

    const { t } = useTranslation();

    //   const [editable, setEditable] = useState(false)
    //   const [productDetails, setProductDetails] = useState({
    //     name: '',
    //     brand: '',
    //     image_url: '',
    //     category: '',
    //     ean: ean,
    //     description: '',
    //     price: '',
    //   });

    const handleInputChange = (key, value) => {
        updateProductInfo({ ...productDetails, [key]: value });
    };

    return (
        <ScrollView keyboardDismissMode={"interactive"} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>

            {
                productDetails.image_url != "" &&
                <Image
                    style={styles.imagePreview}
                    source={{ uri: productDetails.image_url }}
                    onError={() => Alert.alert(t("invalid_image_url"))}
                />
            }

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="tag" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t("product_title")}
                    value={productDetails.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    editable={editable}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="barcode" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t("ean")}
                    value={productDetails.ean}
                    onChangeText={(text) => handleInputChange('ean', text)}
                    editable={editable}
                    keyboardType='numeric'
                    maxLength={13}

                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="comment" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t("brand")}
                    value={productDetails.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}
                    editable={editable}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="image" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t("image_URL")}
                    value={productDetails.image_url}
                    onChangeText={(text) => handleInputChange('image_url', text)}
                    editable={editable}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="view-headline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t("category")}
                    value={productDetails.category}
                    onChangeText={(text) => handleInputChange('category', text)}
                    editable={editable}
                />
            </View>


            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="information" size={20} color="#555" style={styles.icon} />
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    style={styles.input}
                    placeholder={t("description")}
                    value={productDetails.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    editable={editable}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="currency-rupee" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t("price")}
                    value={productDetails.price}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange('price', text)}
                    editable={editable}
                />
            </View>

        </ScrollView>
    )
}

export default ProductInfo