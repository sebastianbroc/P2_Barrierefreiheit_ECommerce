const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/P2_Barrierefreiheit_ECommerce/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/base.scss";
          @import "@/assets/styles/vars.scss";
          @import "@/assets/styles/layout.scss";
          @import "@/assets/styles/navHeader.scss";
        `
      }
    }
  }
})
