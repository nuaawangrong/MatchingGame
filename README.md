# MatchingGame

## 一、相关环境

``` 
java -version: "1.8.0_131"
Node vesion: "v14.15.4"
Android Stdio version: "4.1.2"
Android SDK : "Platform 29"
NDK (Side by side) : "20.1.5948944"
Android SDK Build-Tools : "29.0.2" + "28.0.3"
```

具体环境配置教程请参见[RN中文网-环境搭建](https://www.react-native.cn/docs/environment-setup)。

## 二、软件说明

这是我第一次写出一个可以在手机上运行的APP，参考的是B站up主：“steve” 的[视频教程](https://www.bilibili.com/video/BV1NJ411y7j4")。

软件为图案匹配游戏，具体操作为界面显示4*4张图案，默认背面显示问号。

玩家先后点击两张图案，若图案相同，即可固定，图案不相同则转换为背面显示问号。

当所有图案完成匹配后游戏结束，游戏结束后可点击下方的按钮，再次进行游戏。