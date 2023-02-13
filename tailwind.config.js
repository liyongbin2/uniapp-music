module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        sm: '20rpx',
        base: '24rpx',
        xl: '26rpx',
        '2xl': '28rpx',
        '3xl': '30rpx',
        '4xl': '32rpx',
        '5xl': '36rpx',
      },
      animation: {
        puffOutCenter: "puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both"
      },
      keyframes: {
        "puff-out-center": {
          "0%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: 1
          },
          "100%": {
            transform: "scale(2)",
            filter: "blur(4px)",
            opacity: 0
          }
        }
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
