var base1 = "http://BASE1_IP:BASE1_PORT";
var base2 = "http://BASE2_IP:BASE2_PORT";
var base3 = 'http://DDS_IP:DDS_PORT';
// var base1 = 'http://172.16.0.13:31421';
// var base2  = "http://172.16.0.13:31422";
// var base3 =  'http://172.16.0.13:38080';
export default{
    //正式环境
    BASE1_URL:base1,
    BASE2_URL:base2,
    BASE3_URL:base3
    //开发环境
    //BASE1_URL:'http://172.16.0.13:31421',
    //BASE2_URL:"http://172.16.0.13:31422"

}

// (function() {
//     window.config = {
//         BASE1_URL:"http://BASE1_IP:BASE1_PORT",
//         BASE2_URL:"http://BASE2_IP:BASE2_PORT"
//     };
// })();