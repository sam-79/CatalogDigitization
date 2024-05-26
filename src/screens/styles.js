import { StyleSheet, Dimensions } from "react-native";
import { CUSTOM_MARGIN } from "../constants";
const SCREENWIDTH = Dimensions.get("window").width;
const SCREENHEIGHT = Dimensions.get("window").height;


export const AuthStyles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        // paddingTop: 50,
        padding: CUSTOM_MARGIN,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    title: {
        fontSize: 36,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#2c2e3a",
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:"100%"
    },
    BtnStyle: {
        backgroundColor: '#2c2e3a',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        width:"100%"
    },
    TextStyle: {
        color: 'white',
        fontSize: 18,
        textAlign:'center'
    },
});

//not used
export const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingTop: 40,
        justifyContent: 'center',
        paddingHorizontal: '1%',
        //alignContent: 'center',

    },
    productList: {
        flex: 1,
        paddingTop: 16,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 16,
        marginBottom: 16,
    },
    productImage: {
        width: 70,
        height: 70,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
        marginRight: 16,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },
    productPriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
    },
    productAmount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountButton: {
        width: 30,
        height: 30,
        backgroundColor: '#ffa726',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
    continueButton: {
        bottom: 16,
        width: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREENHEIGHT,

    },
    cameraView: {
        // height: SCREENWIDTH - 30,
        width: SCREENWIDTH - 30,
        justifyContent: 'center',
        alignItems: "flex-end",
        padding: 10
    },
    cameraBtn: {
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',

    },
    scrollViewContainer: {
        //backgroundColor:'blue',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
        // paddingVertical: 10,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
        paddingHorizontal: 10,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
    },
    imagePreview: {
        height: (SCREENWIDTH - 30) / 2,
        width: (SCREENWIDTH - 30) / 2,
        resizeMode: 'cover',
        marginBottom: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        color: '#333',
        minHeight: 40
    },
    optionsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    audioRecordButton: {
        height: 150,
        width: 150,
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center'
    },
    audio_instructions:{
        fontSize:20,
        textAlign:'center',
        marginVertical:2

    }
});