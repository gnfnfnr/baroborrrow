const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/oauth", {
      target: "https://testapi.openbanking.or.kr",
      changeOrigin: true,
    })
  );
};
// await axios
// .get("/login/getKakaoAuthUrl")
// .then((response) => window.open(response.data, "_self"))
// .catch((error) => console.log(error));
