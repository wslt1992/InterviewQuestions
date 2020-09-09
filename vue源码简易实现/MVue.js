const compileUtil={
    getVal(expr,vm){
        // expr = 'person.fav'  或 expr = 'msg'
        return expr.split('.').reduce((data,currentVal)=>{
            return data[currentVal];
        },vm.$data);
    },
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(args[1],vm)
        })
    },
    setVal(expr, vm, inputVal){
        return expr.split('.').reduce((data,currentVal)=>{
            data[currentVal] = inputVal;
        },vm.$data);
    },
    text(node, expr,vm){
        let value;
        if(expr.indexOf('{{')!==-1){
            // {{person.name}}---{{person.age}}
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
                new Watcher(vm,args[1],newVal=>{
                    this.updater.textUpdater(node,this.getContentVal(expr,vm))
                })
                return this.getVal(args[1],vm)
            })
        }else{
            // expr:msg
            value = this.getVal(expr,vm); //学习mvvm原理
        }

        this.updater.textUpdater(node,value)
    },
    html(node, expr,vm){
        const value = this.getVal(expr,vm)
        new Watcher(vm,expr,newVal=>{
            this.updater.htmlUpdater(node,newVal)
        })
        this.updater.htmlUpdater(node,value)
    },
    model(node, expr,vm){
        const value = this.getVal(expr,vm)
        // 数据 驱动 视图
        new Watcher(vm,expr,newVal=>{
            this.updater.modelUpdater(node,newVal)
        })
        // 视图 驱动 数值
        node.addEventListener('input',(event)=>{
            // 设置值
            this.setVal(expr,vm, event.target.value);
        })
        this.updater.modelUpdater(node,value)
    },
    on(node, expr,vm,eventName){
        let fn = vm.$options.methods &&vm.$options.methods[expr]
        node.addEventListener(eventName,fn.bind(vm),false)
    },
    bind(node, expr,vm,eventName){
    },
//    更新函数
    updater:{
        textUpdater(node,value){
            node.textContent = value
        },
        htmlUpdater(node,value){
            node.innerHTML = value
        },
        modelUpdater(node,value){
            node.value = value
        }
    },

}
class Compile{
    constructor(el, vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el)
        this.vm = vm;

    //    1.获取文档碎片对象，放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el)
    //    2.编译模版
        this.compile(fragment)
    //    3.追加子元素到根元素
        this.el.appendChild(fragment)
    }

    isElementNode(node) {
        return node.nodeType ===1
    }

    node2Fragment(el) {
    //    创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild);
        }
        return f;
    }

    compile(fragment) {
        const childNodes = fragment.childNodes;
        childNodes.forEach(child => {
            if(this.isElementNode(child)){
            //    是元素节点
            //    编译元素节点
            // console.log('元素节点',child)
                this.compileElement(child)
            }else{
                // 文本节点
                // 编译文本节点
                // console.log('文本节点',child)
                this.compileText(child)
            }
            if(child.childNodes&&child.childNodes.length){
                this.compile(child);
            }
        })

    }

    // 编译元素节点
    compileElement(node) {
    //    <div v-text='msg'></div>
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            // name:v-text       value=msg
            const {name,value} = attr;
            if(this.isDirective(name)){
            //    是一个指令 v-text v-html v-model v-on:click
                const [,directive] = name.split('-') // text html model on:click
                const [dirName,eventName]=directive.split(':') //text html model on
                // 更新数据  数据驱动视图
                compileUtil[dirName](node,value,this.vm,eventName)

            //    删除有指令的标签上的属性
                node.removeAttribute('v-'+directive)
            }else if(this.isEventName(name)){
                // 判断 @click形势
                let [,eventName] = name.split('@')
                compileUtil['on'](node,value,this.vm,eventName)
            }
        })
    }
    // 编译文本节点
    compileText(node) {
    //  处理  {{}}
        const content = node.textContent;
        if(/\{\{.+?\}\}/.test(content)){
            compileUtil['text'](node,content,this.vm)
        }
    }
    isDirective(attrName){
        // v-开头表示一个指令
        return attrName.startsWith('v-')
    }

    isEventName(attrName) {
        return attrName.startsWith('@')
    }
}
class Vue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options
        if(this.$el){
        //    1.实现一个数据的观察者
            new Observer(this.$data)
        //    2.实现一个指令的解析器
            new Compile(this.$el,this)

            // 3、将data数据代理到当前实例上
            this.proxyData(this.$data)
        }
    }

    proxyData(data) {
        for (const key in data) {
            Object.defineProperty(this,key,{
                get() {
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal
                }
            })
        }
    }
}
class Observer{
    constructor(data){
        this.observer(data)
    }

    observer(data) {
        /*
        * data:{
                person:{
                    name:'小马哥',
                    age:18,
                    fav:'妹子'
                },
                msg:'学习mvvm的原理',
                htmlStr:'这是一个v-html'
            },
        * */
        if(data && typeof data === 'object'){
            Object.keys(data).forEach(key => {
                this.defineReactive(data,key,data[key])
            })
        }
    }

    defineReactive(obj, key, value) {
        // 递归
        this.observer(value)

        const dep = new Dep();

        Object.defineProperty(obj,key,{
            enumerable: true,
            configurable: false,
            get(){
                // 订阅数据变化时，往DEP中添加观察者
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set:(newVal)=>{
                // 需要判断后 再监视吗？
                this.observer(newVal)
                if(newVal !==value){
                    value = newVal
                }
            //    通知Dep变化
                dep.notify()
            }
        })
    }
}

class Dep{
    constructor(){
        this.subs = [];
    }
//    收集观察者
    addSub(watcher){
        this.subs.push(watcher);
    }
//    通知观察者
    notify(){
        console.log('观察者',this.subs)
        this.subs.forEach(w=>w.update())
    }
}
class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldValue = this.getOldVal()
    }
    update(){
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if(newVal !== this.oldValue){
            this.cb(newVal)
            this.oldValue = newVal
        }
    }

    getOldVal() {
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.expr, this.vm)
        Dep.target = null;
        return oldVal
    }
}