/*
* 阐述一下你所理解的MVVM响应式原理
vue是采用数据劫持配合发布者-订阅者模式的方式，通过
Object .definerProperty()来劫持各个属性的setter和getter,在数据变动时，发布
消息给依赖收集器，去通知观察者,做出对应的回调函数，去更新视图
MWM作为绑定的入口，整和Observer,Compile和Watcher三者，通过Observer来监
听model数据变化表，通过Compile来解析编译模板指令，最终利用Watcher搭起
Observer,Compile之间的通信桥梁,达到数据变化=> 视图更新;视图交互变化=> 数据
model变更的双向绑定效果
* */