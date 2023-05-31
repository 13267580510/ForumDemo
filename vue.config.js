const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  
  devServer: {

    proxy: {

        '/api': {

            target: 'http://127.0.0.1:3000/', //这里填入你要请求的接口的前缀

           // ws: true, //代理websocked

            changeOrigin: true, //虚拟的站点需要更换origin

            secure: false, //是否https接口，我用的http但是我变成false他打包后会报错，所以先true

            pathRewrite: {

                '^/api': ''     //重写路径

            }

        }

    }

}

});
