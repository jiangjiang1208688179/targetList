// const mockIndexData = require("./src/mock/cardList.json");
// const mockalreadyList = require("./src/mock/alreadyList.json");
 
module.exports = {
  //...  
  devServer: {
    // port: 8080,
    // host: 'localhost',
    // open: true,   //此处设置为true，当npm run serve 时 会自动打开浏览器
    // 这个地方实现mock数据的
    // before(app) {
    //   app.get("/cardList", (req, res) => {
    //     res.json(mockIndexData);
    //   });
    //   app.get("/alreadylist", (req, res)=>{
    //     res.json(mockalreadyList);
    //   })
    // }

    proxy: {
      '/api': {
        target: 'http://118.24.156.129/'
        // changeOrigin: true
      }
    }
  }
};