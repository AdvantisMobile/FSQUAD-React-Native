import { Platform } from "react-native";
import axios from "axios";
import moment from "moment";
// import store from "../utils/store";
// import { colors, fonts, localImages } from '../utils/constant'
// import { actions } from "../reduxActionAndReducer/reducer";
import DeviceInfo from "react-native-device-info";

// import { SCREENS } from "../constants";
// import NavigationService from "../navigation";
// import { actions as uiActions } from "../modules/ui";
// import { actions as loggedInUserActions } from "../modules/logged-in-user";
// import Analytics from "../analytics";
// var URL = require('url');
 let API_BASE_URL = "http://18.220.123.51/api/"; /// what should be the baseapi now?????
//let API_BASE_URL = "http://localhost/fsquad/api/";
let CHAT_BASE_URL = "http://3.6.100.194:4000";
//let API_BASE_URL = "https://consumer.binbill.com";
let API_BASE_URL_SOCKET="http://3.6.100.194:4000";
if (!__DEV__) {
API_BASE_URL = "http://18.220.123.51/api/";
//  API_BASE_URL = "https://consumer.binbill.com";
}

let NEW_API_BASE_URL = "http://18.220.123.51/api/";
// test -> let CASHFREE_APP_ID = "1844ecd62445987b8152c2304481";
// test -> let CASHFREE_URL =
// ("http://binbillpaymentgateway.s3-website.ap-south-1.amazonaws.com/");

// let CASHFREE_APP_ID = "4266316b86143383be42108a6624";
// let CASHFREE_URL =
//   "https://s3.ap-south-1.amazonaws.com/binbillpaymentgateway-prod/index.html";

let CASHFREE_APP_ID = "4266316b86143383be42108a6624";
let CASHFREE_URL =
  "https://s3.ap-south-1.amazonaws.com/binbillpaymentgateway-prod/index.html";

export { API_BASE_URL, CASHFREE_APP_ID, CASHFREE_URL,API_BASE_URL_SOCKET };

const APP_VERSION_FOR_API = 201032;

const platform = Platform.OS

const CancelToken = axios.CancelToken;
const apiRequest = async ({
  newurl,
  token,
  method,
  url,
  queryParams={},
  data = null,
  headers = {},
  onUploadProgress,
  onDownloadProgress,
  responseType = "json",
  timeout,
  requestType,
}) => {
 //debugger
  try {
    // console.log(store.getState().localStates.loginuserToken)
    // const token = store.getState().localStates.loginuserToken;
    // console.log(token)
    
    if (typeof token == "string" ) {
      // headers.Authorization = token;
    }

    // const language = store.getState().ui.language;
    // if (language) {
    //   headers.language = language.code;
    // }

    if (Platform.OS == "ios") {
      headers.ios_app_version = APP_VERSION_FOR_API; //DeviceInfo.getBuildNumber();
    } else {
      headers["app-version"] = APP_VERSION_FOR_API; //android app version
    }
    // headers['Content-Type']='application/x-www-form-urlencoded'
    if(data){
        data.deviceType=platform
        data.systemVersion = DeviceInfo.getSystemVersion();
        data.buildNumber = DeviceInfo.getBuildNumber();
    }else{
        //let custome={}
        queryParams.deviceType=platform
        queryParams.systemVersion = DeviceInfo.getSystemVersion();
        queryParams.buildNumber = DeviceInfo.getBuildNumber();
        //data=custome

    }
    
    if (__DEV__) {
      var apiRequestTime = moment();
      console.log(
        "API Request: ", method, API_BASE_URL + url,
        "\nheaders: ", headers,
        "\ndata:\n", data,
        "\nqueryParams: ", queryParams
      );
    }


    
  ////////////axios ///////////////
    const r = await axios.request({
      baseURL: API_BASE_URL, method, url,
      params: queryParams, data, headers,
      onUploadProgress,
      onDownloadProgress,
      timeout: timeout || 100000, //300 seconds
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
       // cancel = c;
      })
    });
  ////////////////////////////fetch library ///////////////////



//   let response
//   let finalurl=(newurl=='yes'?NEW_API_BASE_URL:API_BASE_URL) + url
//   // var finalurl2 = finalurl
//   //var da=new URLSearchParams()
//   let queryString = new URLSearchParams()
//   for(let key in queryParams){
//     // if(!queryParams.hasOwnkey())continue
//     if(queryParams[key]){
//       queryString.append(key, queryParams[key])
//     }
    
//   }
//   console.log(queryString)
  
//   var finalQueryStaring=queryString.toString()
//   console.log(finalQueryStaring)
//   var da =finalQueryStaring?`?${finalQueryStaring}`:''
//   console.log(da)
//   //debugger
//   var finalurl2=finalurl+da
//   console.log('finalurl2',finalurl2)
//   //
//       if(method=='delete' || method=='get'){
//         response = await fetch(
//           finalurl2,{ 
//             method, headers,
//           }
//         );
//       }else{
//         response = await fetch(
//           finalurl2,{ 
//             method, body:requestType?data:JSON.stringify(data), headers,
//             onUploadProgress,
//             onDownloadProgress
//           }
//         );
//       }
     
//       let r = {};
//       r.data=response.json()
     // //debugger
     ////////////////////////////fetch library end ///////////////////


     
// //debugger
    if (__DEV__) {
      console.log("API Response for ",method,  (newurl=='yes'?NEW_API_BASE_URL:API_BASE_URL) + url,
        " API call took : ", moment().diff(apiRequestTime),
        "milliseconds \n", r.data);
    }

    
    // NavigationService.navigate(SCREENS.FORCE_UPDATE_SCREEN, {
    //   allowSkip: true
    // });

    // const appUpdateAvailableScreenTimestamp = store.getState().ui
    //   .appUpdateAvailableScreenTimestamp;

    // if (r.data.forceUpdate === true) {
    //   NavigationService.navigate(SCREENS.FORCE_UPDATE_SCREEN);
    // } else if (
    //   r.data.forceUpdate === false &&
    //   (!appUpdateAvailableScreenTimestamp ||
    //     moment().diff(
    //       moment(appUpdateAvailableScreenTimestamp).startOf("day"),
    //       "days"
    //     ) > 7)
    // ) {
    //   store.dispatch(
    //     uiActions.setAppUpdateAvailableScreenTimestamp(new Date().toISOString())
    //   );
    //   NavigationService.navigate(SCREENS.FORCE_UPDATE_SCREEN, {
    //     allowSkip: true
    //   });
    // }

    // if (r.data.status == false) {
    //   let error = new Error(r.data.message);
    //   error.originalMessage = r.data.message;
    //   error.statusCode = 400;
    //   throw error;
    // }

    return r.data;
  } catch (e) {
    if (__DEV__) {
      console.log("API exception for ",method,  API_BASE_URL + url,
        " API call took : ", moment().diff(apiRequestTime),
        "milliseconds \n", e,e.statusCode,e.response.status);
    }
    let error = {
        message: e.originalMessage || "Something went wrong, please try again!"
    }
     
   /// );

    error.statusCode = e.response.status || 0;

    if (error.statusCode == 0) {
      error.message = "Please check internet connection";
    }

    if (e.response) {
      if (__DEV__) {
        console.log("e.response.data: ", e.response.data);
      }
      error.statusCode = e.response.status;
      error.data = e.response.data;
      error.message= e.response.data.message
      error.data.statusCode=error.statusCode
    }
    if (error.statusCode == 0) {
        error.data.message = "Please check internet connection";
      }

    // if (error.statusCode != 401 && error.statusCode != 402) {
      
    // }

    if (error.statusCode == 409) {
      
      

    }
    if (error.statusCode == 404) {
      
    //   showMessage({
    //     message:error.data.message,
    //    // description: "My message description",
    //     type: 'info',
    //     backgroundColor:colors.warning, // background color
    //     color: colors.inputTextColor// text color
      
    // });

    // store.dispatch(
    //       actions.setLoggedInUserStatus(null)
    //     );
    //     store.dispatch(
    //       actions.setLoggedInUserType(null)
    //     );
      
    //   return error.data;

    }
    console.log(error)
   return error.data;
  }
};




export const demoCall = async ({mcid,seller_id,offer_only}) => {
  ////debugger
  return await apiRequest({
    token:'no',
    method: "post",
    url: `/main/${mcid}/categories`,
    queryParams:{
      seller_id:seller_id,
      has_offers:offer_only
    }
  });
};

export const login_api = async (reqData) => {
  ////debugger
  return await apiRequest({
    token:'no',
    method: "post",
    url: `login`,
    data:reqData
  });
};


export const otp_api = async (reqData) => {
  ////debugger
  return await apiRequest({
    token:'no',
    method: "post",
    url: `sendotp`,
    data:reqData
  });
};
export const signup = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `/register`,
      data:reqData
    });
  };

  export const matchOtp_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `/matchotp`,
      data:reqData
    });
  };





  export const register_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `/register`,
      data:reqData
    });
  };

  export const put_comment_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `put-comment`,
      data:reqData
    });
  };
  
  export const put_like_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `put-like`,
      data:reqData
    });
  };

  export const post_details_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `post-details`,
      data:reqData
    });
  };

  export const get_post_home_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `get-post`,
      data:reqData
    });
  };


  export const send_friend_req_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `send-friend-request`,
      data:reqData
    });
  };


  export const user_pending_requests_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `user-pending-requests`,
      data:reqData
    });
  };


  export const delete_post_api = async (reqData) => {
    ////debugger
    return await apiRequest({
      token:'no',
      method: "post",
      url: `delete-post`,
      data:reqData
    });
  };




  