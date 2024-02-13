import { createAsyncThunk } from "@reduxjs/toolkit";

// signin
export const signin = createAsyncThunk('signin', async (params, thunkApi) => {

    //console.log('🚀😂 ~ file: auth.js:6 ~ signin ~ params:', params);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": params.username,
        "password": params.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${params.hostname}/api/token`, requestOptions);
        jsonData = await response.json();
        //console.log("sign in auth.js", jsonData)

        if (response.status == 200) {
            //console.log("loginfunction", jsonData)
            //return thunkApi.fulfillWithValue({ access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjN9.tZ8HUgpX9kH3jRCXVhporsM5wPfz4dfw9tyhK5LtLf8" });
            return thunkApi.fulfillWithValue(jsonData);
        } else {
            //console.log("loginfunction else", jsonData)
            return thunkApi.rejectWithValue(jsonData)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }

});

// signup
export const signup = createAsyncThunk('signup', async (params, thunkApi) => {
    //console.log('🚀 ~ file: auth.js:42 ~ signup ~ params:', params);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": params.username,
        "password": params.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${params.hostname}/api/users`, requestOptions);
        jsonData = await response.json();
        //console.log("signupfunction", jsonData)
        if (response.status == 200 && jsonData.access_token) {

            return thunkApi.fulfillWithValue(jsonData)

        } else {
            //console.log("signupfunction else", jsonData)
            return thunkApi.rejectWithValue(jsonData)

        }
    } catch (error) {
        //console.log(error)
        return thunkApi.rejectWithValue(error.message);
    }
});


// getUser details
// export const signup = createAsyncThunk('signup', async (params, thunkApi) => {
//     //console.log('🚀 ~ file: auth.js:42 ~ signup ~ params:', params);
//     const { value } = useSelector((state) => state.hostname);

//     const { email, password,  } = params
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     setLoading(true);
//     var raw = JSON.stringify({ email, name, password, password2, contact });

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     try {
//         const response = await fetch(`${value}/api/token`, requestOptions);
//         jsonData = await response.json();
//         if (response.status == 200) {
//             //console.log("signupfunction", jsonData)

//         } else {
//             //console.log("signupfunction else", jsonData)

//         }
//     } catch (error) {
//         return thunkApi.rejectWithValue(error.message);
//     }
// });
