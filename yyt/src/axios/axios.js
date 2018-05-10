import axios from 'axios';
import store from '../vuex/store'
import routes from '../router'
import QS from 'qs'
import config from '@/config'
// let base1 = 'http://YYT_SVC_IP:YYT_SVC_PORT';
// let base2 = 'http://YYT_SVC_IP:YYT_CARD_SVC_PORT';

 let base1 = 'http://172.16.0.13:31421';
 let base2 = 'http://172.16.0.13:31422';
 let base3 =  'http://172.16.0.13:38080';
//刷新token
export const getRefreshToken = params => { return instanceBase1.post(`/card/oauth/refresh`, params).then(res => res.data); };
//登录
export const requestLogin = params => { return instanceBase1.post(`/card/oauth/login`, params).then(res => res.data); };

//获取用户信息
export const getLogininfo = params => { return instanceBase2.get(`/card/manage/logininfo`, params).then(res => res.data);};

//获取日结数据(客户中心)
export const requestDayData = params => { return instanceBase2.post(`/card/rpt/close/query_day`, params).then(res => res.data); };

//获取月结数据(客户中心)
export const requestMonthData = params => { return instanceBase2.post(`/card/rpt/close/query_month`, params).then(res => res.data); };

//缴费
export const getPaySearchList = params => { return instanceBase2.post(`/card/manage/pay/query`, params).then(res => res.data); };
//充值
export const getRefundsList = params => { return instanceBase2.post(`/card/manage/recharge/query`, params).then(res => res.data); };
//发卡量查询
export const getOpenCardList = params => { return instanceBase2.post(`/card/manage/user/query`, params).then(res => res.data); };

//结算对账
export const getGroupFeeList = params => { return instanceBase2.post(`/card/rpt/group_fee/query`, params).then(res => res.data); };

///机构详细信息查询
export const getGroupInfo = params => { return instanceBase2.get(`/card/manage/group`, { params: params }).then(res => res.data); };

//修改机构
export const changeGroupInfo = params => { return instanceBase2.post(`/card/manage/group/modify`, params).then(res => res.data); };


//机构列表查询
export const getGroupList = params => { return instanceBase2.post(`/card/manage/group/query`, params).then(res => res.data); };

//卡段列表查询
export const getcardsegList = params => { return instanceBase2.post(`/card/manage/cardseg/query`, params).then(res => res.data); };

//卡段新增
export const createCardseg = params => { return instanceBase2.post(`/card/manage/cardseg/create`, params).then(res => res.data); };

//废卡查询
export const getwatsteCardList = params => { return instanceBase2.post(`/card/manage/invalid_card/query`, params).then(res => res.data); };

//用户查询
export const getuserList = params => { return instanceBase2.post(`/card/manage/user/query`, params).then(res => res.data); };

//上传图片
export const upLoadPicFrom = params => { return instanceBase3.post(`/riot/db/upload`, params,uploadconfig).then(res => res.data); };
let uploadconfig = {  
    headers:{'Content-Type':'multipart/form-data'} //添加请求头  
};   

//下载图片
export const downLoadImg = params => { return instanceBase3.get(`/riot/db/load`, { params: params },uploadconfig).then(res => res.data); };

//注销卡段
export const cancelCard = params => { return instanceBase2.post(`/card/manage/cardseg/cancel`, params).then(res => res.data); };


const instanceBase3 = axios.create({
    // baseURL:config.BASE3_URL,
    baseURL:base3,
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'multipart/form-data'
    }
    // transformRequest: [function (data) {
    //     data = QS.stringify(data);
    //     return data;
    // }],
    // withCredentials:true   //设置跨域(并没什么卵用)！！
});
const instanceBase1 = axios.create({
    //  baseURL: config.BASE1_URL,
     baseURL: base1,
    // headers: {
    //     'Access-Control-Allow-Origin':'*',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Headers':'Authorization,Origin, X-Requested-With, Content-Type, Accept',
    // }
    // transformRequest: [function (data) {
    //     data = QS.stringify(data);
    //     return data;
    // }]
    // withCredentials:true   //设置跨域(并没什么卵用)！
});

instanceBase1.defaults.headers.common['Authorization'] = store.state.loginInfo.access_token;
instanceBase1.defaults.headers.post['Content-Type'] = 'application/json';

const instanceBase2 = axios.create({
    // baseURL:config.BASE2_URL,
    baseURL:base2,
    // headers: {
    //     'Access-Control-Allow-Origin':'*',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Headers':'Authorization,Origin, X-Requested-With, Content-Type, Accept',
    // }
    // transformRequest: [function (data) {
    //     data = QS.stringify(data);
    //     return data;
    // }],
    // withCredentials:true   //设置跨域(并没什么卵用)！！
});
instanceBase2.defaults.headers.common['Authorization'] = store.state.loginInfo.access_token;
instanceBase2.defaults.headers.post['Content-Type'] = 'application/json';
/****局部拦截器********/
instanceBase2.interceptors.request.use(
//   //在发送请求之前做些什么
   config => {
    // if (request.getMethod().equals("OPTIONS")) {
    //     HttpUtil.setResponse(response, HttpStatus.OK.value(), null);
    //     return;
    // }
      config.headers.Authorization = store.state.loginInfo.access_token;
      let prevTime = store.state.loginInfo.dateFlag;
      let currentTime = new Date().getTime();
      let minute = (currentTime-prevTime*1)/1000/60;//分钟
      if(prevTime){
          if(minute<5&&minute>4.5){
            store.dispatch("refreshToken");//刷新token
            store.state.loginInfo.dateFlag = new Date().getTime();
          }else if(minute>=5){
             store.dispatch("loginout");//登出删除状态
             routes.push('/login');
          }
      }else{
         store.state.loginInfo.dateFlag = new Date().getTime();
      }
      // var xtoken = getXtoken()
      // if(xtoken != null){
      //     config.headers['X-Token'] = xtoken
      // }
      // if(config.method=='post'){
      //     config.data = {
      //         ...config.data,
      //         _t: Date.parse(new Date())/1000,
      //     }
      // }else if(config.method=='get'){
      //     config.params = {
      //         _t: Date.parse(new Date())/1000,
      //         ...config.params
      //     }
      // }
    return config;
  },function(error){
      store.dispatch("loginout");//登出删除状态
      return Promise.reject(error)
});

instanceBase1.interceptors.request.use(
    //   //在发送请求之前做些什么
       config => {
        // if (request.getMethod().equals("OPTIONS")) {
        //     HttpUtil.setResponse(response, HttpStatus.OK.value(), null);
        //     return;
        // }
          config.headers.Authorization = store.state.loginInfo.access_token;
          // var xtoken = getXtoken()
          // if(xtoken != null){
          //     config.headers['X-Token'] = xtoken
          // }
          // if(config.method=='post'){
          //     config.data = {
          //         ...config.data,
          //         _t: Date.parse(new Date())/1000,
          //     }
          // }else if(config.method=='get'){
          //     config.params = {
          //         _t: Date.parse(new Date())/1000,
          //         ...config.params
          //     }
          // }
        return config;
      },function(error){
          store.dispatch("loginout");//登出删除状态
          return Promise.reject(error)
    });
    
