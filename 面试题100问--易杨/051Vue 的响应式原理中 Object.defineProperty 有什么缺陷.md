##  回答1
楼上讲的很细致啦！有一点我补充一下：

Object.defineProperty本身有一定的监控到数组下标变化的能力： Object.defineProperty本身是可以监控到数组下标的变化的，但是在 Vue 中，从性能/体验的性价比考虑，尤大大就弃用了这个特性。具体我们可以参考 《记一次思否问答的问题思考：Vue为什么不能检测数组变动》这篇文章，文章底部配图中有尤大大的严肃回复截图； 下方的讨论区也很值得大家下去看一看，有对于 for / forEach / for .. in .. 几个循环方式的讨论。

关于 Vue 3.0 的其他信息我们可以参考 尤大大发布的 Vue 3.0 新特性预览PPT

另外补充一些其他资料给大家：

ES6-Proxy 入门教程
Vue3.0 尝鲜，Object.defineProperty VS Proxy
面试官: 实现双向绑定Proxy比defineproperty优劣如何?

vue2.0 defineProperty 可以实现对数组的监听，但是由于性能原因，没有做（尤大）
https://segmentfault.com/a/1190000015783546



## 回答2
* 1.Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；  
* 2.Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。  
* 3.Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。  