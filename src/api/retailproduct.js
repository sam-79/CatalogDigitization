import { createAsyncThunk } from "@reduxjs/toolkit";

// signin
export const addProduct = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:6 ~ addProduct ~ params:', params);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)

        const { name, brand, image_url, category, ean, description, price } = params.product;
        var raw = JSON.stringify({ name, brand, image_url, category, ean: String(ean), description, price });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/products_add`, requestOptions);
            const jsonData = await response.json();

            //console.log("products Add", jsonData)
            if (response.status === 200) {
                resolve(jsonData); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unknown error' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};


// Get Product By ID
export const getProductById = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:45 ~ getproductId ~ params:', params);

        var myHeaders = new Headers();
        myHeaders.append("Accepts", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/products/${params.product.id}`, requestOptions);
            const jsonData = await response.json();

            //console.log("products detaisl get by id ", jsonData)
            if (response.status === 200) {
                resolve(jsonData); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unknown error' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};

// Get Product By ID
export const getProductByEAN = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:45 ~ getproductId ~ params:', params);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`);

        var raw = JSON.stringify({
            "ean": parseInt(params.ean)
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/search_ean`, requestOptions);
            const jsonData = await response.json();

            //console.log("products detaisl get ean ", jsonData)
            if (response.status === 200) {
                resolve(jsonData); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unable to find Product' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};



//update product
export const updateProduct = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:289 ~ updateproductId ~ params:', params);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`)

        const { name, brand, image_url, category, ean, description, price } = params.product;
        var raw = JSON.stringify({ name, brand, image_url, category, ean: String(ean), description, price });


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/product_update/${params.product.id}`, requestOptions);
            const jsonData = await response.json();

            //console.log("products updated", jsonData)
            if (response.status === 200) {
                resolve(jsonData); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unknown error' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};


//getALl product
export const getAllProduct = createAsyncThunk('getAllProduct', async (params, thunkApi) => {
    //console.log('🚀 ~ file: retailProduct.js:6 ~ getAllProduct ~ params:', params);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    // return thunkApi.fulfillWithValue([{
    //     name: "Lip balm",
    //     brand: 'Himalaya',
    //     image_url: 'https://rukminim2.flixcart.com/image/850/1000/k3q76a80/lip-balm/y/2/b/60-lip-balm-himalaya-original-imafm43pa4hdmpmm.jpeg?q=90&crop=false',
    //     category: 'Skin Care',
    //     ean: "12345678912345",
    //     description: '10G lip balm',
    //     price: '40',
    //     id: 123
    // }])
    try {
        const response = await fetch(`${params.hostname}/get_products`, requestOptions);
        jsonData = await response.json();
        if (response.status == 200 && jsonData.products) {
            return thunkApi.fulfillWithValue(jsonData)
        }
        else {
            return thunkApi.rejectWithValue({ detail: "Cannot get Product" })
        }


    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});


// Get Product By ID
export const getProductByImage = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:208 ~ getproductImage ~ params:', params);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`);

        var formdata = new FormData();
        formdata.append("image", {
            uri: params.imageUri,
            type: "image/jpg",
            name: `${Math.floor(Date.now() / 1000)}.jpg`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/product_search_by_image`, requestOptions);
            const jsonData = await response.json();

            //console.log("👌👌products detaisl by image ", jsonData)
            if (response.status === 200) {
                resolve(jsonData.product_details); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unable to find Product' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};


// delete productBy ID
export const deleteProduct = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:289 ~ deleteproductId ~ params:', params);


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`);



        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/products/${params.product.id}`, requestOptions);
            const jsonData = await response.json();

            //console.log("products delete   ", jsonData)
            if (response.status === 200) {
                resolve(jsonData); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unable to find Product' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};


//voice product get
// Get Product By ID
export const getProductByAudio = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:29 ~ getproductAudio ~ params:', params);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Authorization", `Bearer ${params.userData.access_token}`);

        var formdata = new FormData();
        formdata.append("audio", {
            uri: params.audioUri,
            type: "audio/wav",
            name: `${Math.floor(Date.now() / 1000)}.wav`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/product_voice_search`, requestOptions);
            const jsonData = await response.json();

            //console.log("👌👌products detaisl by audio 316 ", jsonData)
            if (response.status === 200) {
                resolve(jsonData.product_details); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unable to find Product' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};