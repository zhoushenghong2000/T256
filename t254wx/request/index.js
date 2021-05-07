
let ajaxTiems = 0;
export const request=(params)=>{

    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header={...params.header};
        if(params.url.includes("/my/")){
        // 拼接header 带上token
        header["Authorization"]=wx.getStorageSync("token");
    }

    ajaxTiems++;
    // var baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    var baseUrl = "http://localhost:7101";
    wx.showLoading({
      title: '加载中',
      mark:true
    })
    return new Promise((resolve,reject)=>{
       wx.request({
           ...params,
           header:header,
           url:baseUrl+ params.url,
           success: (result)=>{
               resolve(result.data);
           },
           fail:(err)=>{
            reject(err);
           },
           complete:()=>{
               ajaxTiems--;
               if(ajaxTiems==0){
                wx.hideLoading();
               }
              
           }
       });
    });
}