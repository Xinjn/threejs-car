const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭严格模式
  // 部署路径
  publicPath:
    process.env.NODE_ENV === "production" ? "/threejs-car/dist/" : "/",
})
