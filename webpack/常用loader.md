## loader的使用方法
默认webpack只会处理js代码，所以当我们想要去打包其他内容时，让webpack处理其他类型的内容，就要使用相应的loader

### 结构说明
```
module:{
        rules:[{
            test:/\.js$/,
            use:[{
                loader:'babel-loader',
                options:{
                    presets:['react']
                },
            include: [
                path.resolve(__dirname, "app/src"),
                path.resolve(__dirname, "app/test")
            ],
            exclude: /node_modules/
            }]
        }]
}
```
+ test:test后是一个正则表达式，匹配不同的文件类型
+ use:在这个规则中，当你匹配了这个文件后，使用什么样的loader去处理匹配到的文件，use接收的是一个数组，意味着当他匹配到文件后，它可以启用很多的loader去处理文件的内容
    + loader options:{}对应的loader进行的一些配置
+ include: 表示哪些目录中的 .js 文件需要进行 babel-loader
+ exclude:  exclude 表示哪些目录中的 .js 文件不要进行 babel-loader

---

### webpack对JS的处理 babel-loader
+ 安装react和react-dom
```
npm i -S react react-dom
```

+ 入口文件index.js,导入需要的库，写入jsx代码（webpack无法正确处理jsx语法）
```
import React  from 'react';
import ReactDOM  from 'react-dom';

ReactDOM.render(
    <div className="fa fa-rocket"><div className={style.ot}>React</div></div>,
 
    document.getElementById('root')/*上面的逗号不可少，此处不可加分号*/
);
```

+ 安装react和react-dom,因为是jsx文件，所以我们需要使用相应的loader来对其jsx内容进行处理
```
npm i -D babel-loader  babel-core
```
+ 将安装的加入到下面module配置中
```
module:{
        rules:[{
            test:/\.js$/,
            use:[{
                loader:'babel-loader',
                options:{
                    presets:['react']
                }
            }]
        }]
    }
```
babel-loader可以将jsx编译为js，或者es6->es5。但是这需要预设配置presets。如果不进行预设，babel-loader将什么都不做
。presets:['react']表示将jsx语法编译js

### 对样式文件的处理，css-loader，style-loader

+ 入口文件index.js引入样式文件
```
import './style/main.css';
```

```
npm i -D css-loader
npm i -D style-loader
```

```
module:{
        rules:[
            {
                test:/\.js$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['react']
                    }
                    }]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
            }
        ]
    }
```

use中的style-loader和css-loader顺序不能变，因为loader的处理有一个优先级，从右到左。  
css-loader   ：处理.css文件里面的样式，处理后的.css将是一个数组，包含了文件路径和样式等信息。  
style-loader ：将css-loader处理的结果，再次处理后放入到\<style\>标签中。（通过一个JS脚本创建一个style标签，）  
---
### 引入图片 file-loader url-loader
+ file-loader引入图片
```
npm i -D file-loader
```
配置file-loader
```
{
    test:/\.jpg|png|jpeg|gif$/,
    use:['file-loader']
}
```
 + 在HTML中插入的图片
```
import dog  from './common/imgs/xxx.jpg'

ReactDOM.render(
    <div><img src={dog}/></div>,
    document.getElementById('root')
 
 );
```
当我们在模块里面使用import来引入一个图片资源的时候，file-loader也会把这个图片移动到你的输出目录，给它更改一个名字，然后返回一个最终要加载的图片的一个路径

在css的背景图片和HTML结构中插入的图片，webpack会帮助你引入这个模块（资源），
引入这个资源的时候，file-loader会帮助你做相应的处理，因为css-loader在遇到url时
，会帮助你处理url中的内容，它在处理时，就会帮你引入了这个图片资源，然后用file-loader来处理这个图片资源。
html中的img标签，href的图片被url-loader处理  
  
+ url-loader引入图片，file-loader的增强版


```
{
    test:/\.jpg|gif|png$/,
    use:[{
        loader:'url-loader',
        options:{
            limit:10000//以bit为单位，当小于10000bit时，编码为base64，大于10000bit时，不编码base64
        }
    }]，
}
```
url-loader会把我们的图片使用base64的形式编码，这样减少了图片的请求，你只要请求回了这个页面（图片包含在其中<img href="base64:xxxxxxxx">），
但是如果图片过大，这个字符串就会变得特变大，让加载的文件变得特别大，不利于网页的加载。所以limit限制图片在小于10000bit时，才进行base64编码
