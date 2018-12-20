const mockIndexData = require("./src/mock/cardList.json");
 
module.exports = {
  //...  
  devServer: {
    port: 8080,
    before(app) {
      app.get("/haha", (req, res) => {
        res.json(mockIndexData);
      });
    }
  }
};