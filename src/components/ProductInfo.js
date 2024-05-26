import React from 'react';
import { View, ScrollView, Image, Alert, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Divider, TextInput } from 'react-native-paper';
import { HomeStyles } from '../screens/styles';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useTranslation } from 'react-i18next';
const CUSTOM_MARGIN = 20;
const SCREENWIDTH = Dimensions.get('screen').width;

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
        <View keyboardDismissMode={"interactive"} showsVerticalScrollIndicator={false} contentContainerStyle={HomeStyles.scrollViewContainer}>

            {
                // productDetails.image_url != '' &&
                // <Image
                //     style={HomeStyles.imagePreview}
                //     source={{ uri: productDetails.image_url }}
                //     onError={() => Alert.alert(t("invalid_image_url"))}
                // />
            }

            {
                // [{ label: t("product_title"),placeholder: t("Dabur Gulabari Premium Rose Water 120Ml"), value: productDetails.name, id: 'name' },
                // { label: t("ean"),placeholder: t("8901207040795"), value: productDetails.ean, id: 'ean' },
                // { label: t("brand"),placeholder: t("Dabur"), value: productDetails.brand, id: 'brand' },
                // { label: t("image_URL"),placeholder: t("https://go-upc.s3.amazonaws.com/images/81278639.jpeg"), value: productDetails.image_url, id: 'image_url' },
                // { label: t("category"),placeholder: t("Cosmetics"), value: productDetails.category, id: 'category' },
                // { label: t("description"),placeholder: t("Dabur Gulabari rose water is a 100% Pure & natural with no added preservatives. It serves as a cleanser and moisturizing agent which is suitable for all skin types"), value: productDetails.description, id: 'description' },
                // { label: t("price"),placeholder: t("50"), value: productDetails.price, id: 'price' },
                // ].map((item) => {
                //     return (
                //         <View style={{margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2}} key={item.id}>
                //             <Text style={{marginBottom:5}}>{item.label}</Text>
                //             <TextInput
                //                 mode="outlined"
                //                 value={item.value}
                //                 onChange={(text) => handleInputChange(item.id, text)}
                //                 key={item.id}
                //                 style={{fontSize:20, fontWeight:"600"}}
                //                 placeholder={item.placeholder}
                //             />
                //         </View>
                //     )
                // })
            }
            {productDetails.image_url && <Image source={{ uri: productDetails.image_url }} style={{
                width: Dimensions.get('screen').width - CUSTOM_MARGIN*2,
                height: Dimensions.get('screen').width - CUSTOM_MARGIN*2,
                resizeMode: 'cover',
                alignSelf:'center'
            }} />}
            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("product_title")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    style={{ fontSize: 20, fontWeight: "600", backgroundColor: '#aed6f124' }}
                // activeOutlineColor={'#3498DB'}
                // selectionColor="red"

                // placeholder={'Dabur Gulabari Premium Rose Water 120Ml'}
                />
            </View>

            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("ean")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.ean}
                    keyboardType='numeric'
                    onChangeText={(text) => handleInputChange('ean', text)}
                    style={{ fontSize: 20, fontWeight: "600" }}
                // placeholder={'465465456465'}
                />
            </View>

            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("brand")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}

                    style={{ fontSize: 20, fontWeight: "600" }}
                // placeholder={'Dabur'}
                />
            </View>

            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("image_URL")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.image_url}
                    onChangeText={(text) => handleInputChange('image_url', text)}
                    style={{ fontSize: 20, fontWeight: "600" }}
                // placeholder={'https://go-upc.s3.amazonaws.com/images/81278639.jpeg'}
                />
            </View>

            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("category")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.category}
                    onChangeText={(text) => handleInputChange('category', text)}

                    style={{ fontSize: 20, fontWeight: "600" }}
                // placeholder={'Cosmetics'}
                />
            </View>

            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("description")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    style={{ fontSize: 20, fontWeight: "600" }}
                // placeholder={'Dabur Gulabari rose water is a 100% Pure & natural with no added preservatives. It serves as a cleanser and moisturizing agent which is suitable for all skin types'}
                />
            </View>

            <View style={{ margin: CUSTOM_MARGIN, width: SCREENWIDTH - CUSTOM_MARGIN * 2 }} >
                <Text style={{ marginBottom: 5 }}>{t("price")}</Text>
                <TextInput
                    mode="outlined"
                    value={productDetails.price}
                    onChangeText={(text) => handleInputChange('price', text)}
                    style={{ fontSize: 20, fontWeight: "600" }}
                // placeholder={'50'}
                />
            </View>
            {/* <Divider />

            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="tag" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    style={HomeStyles.input}
                    placeholder={t("product_title")}
                    value={productDetails.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    editable={editable}
                />
            </View>

            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="barcode" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    style={HomeStyles.input}
                    placeholder={t("ean")}
                    value={productDetails.ean}
                    onChangeText={(text) => handleInputChange('ean', text)}
                    editable={editable}
                    keyboardType='numeric'
                    maxLength={13}

                />
            </View>

            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="comment" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    style={HomeStyles.input}
                    placeholder={t("brand")}
                    value={productDetails.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}
                    editable={editable}
                />
            </View>

            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="image" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    style={HomeStyles.input}
                    placeholder={t("image_URL")}
                    value={productDetails.image_url}
                    onChangeText={(text) => handleInputChange('image_url', text)}
                    editable={editable}
                />
            </View>

            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="view-headline" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    style={HomeStyles.input}
                    placeholder={t("category")}
                    value={productDetails.category}
                    onChangeText={(text) => handleInputChange('category', text)}
                    editable={editable}
                />
            </View>


            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="information" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    style={HomeStyles.input}
                    placeholder={t("description")}
                    value={productDetails.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    editable={editable}
                />
            </View>

            <View style={HomeStyles.inputContainer}>
                <MaterialCommunityIcons name="currency-rupee" size={20} color="#555" style={HomeStyles.icon} />
                <TextInput
                    style={HomeStyles.input}
                    placeholder={t("price")}
                    value={productDetails.price}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange('price', text)}
                    editable={editable}
                />
            </View> */}


        </View>
    )
}

export default ProductInfo