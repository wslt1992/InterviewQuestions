/*
* 自定义promise模块
* */

(function(params){
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    function Promise(executor){
        const self = this;
        self.status = PENDING //给promise对象指定status属性，初始值为pending
        self.data = undefined  //给promise指定一个用于存储结果的数据属性
        self.callbacks = []  //每个元素结构 {onResolved(){}, onRejected(){}}

        function resolve(value){
        //    如果当前状态不是pending，直接结束
            if(self.status!==PENDING){
                return
            }

        //    状态改为resolved
            self.status = RESOLVED
        //    保存value数据
            self.value = value
        //    如果有待执行callback函数，立即异步执行回调
            if(self.callbacks.length){
                self.callbacks.forEach(callbackObj=>{
                    // 异步调用
                    setTimeout(()=>{
                        callbackObj.onResolved(value)
                    },0)
                })
            }
        }

        function reject(reason){
            //    如果当前状态不是pending，直接结束
            if(self.status!==PENDING){
                return
            }

            //    状态改为resolved
            self.status = REJECTED
            //    保存value数据
            self.data = reason
            //    如果有待执行callback函数，立即异步执行回调
            if(self.callbacks.length){
                self.callbacks.forEach(callbackObj=>{
                    // 异步调用
                    setTimeout(()=>{
                        callbackObj.onRejeted(reason)
                    },0)
                })
            }
        }

        try{
            executor(resolve, reject)
        }catch(error){
            // 如果执行器抛出异常，promise对象变为rejected状态
            reject(error)
        }
    }

    /*
    * 原型对象的方法 then()
    * 指定成功和失败的
    * 返回一个新的promise对象
    * */
    Promise.prototype.then = function(onResolved, onRejected){

        // 指定默认成功处理函数
        onResolved = typeof onResolved === "function" ? onResolved :value=>value

        // 指定默认失败函数处理
        onRejected = typeof onRejected === "function" ? onRejected :reason=>{throw reason}

        const self = this;

// 返回一个新的promise对象
        return new Promise((resolve, reject)=>{

            function handle(cb) {
                //1.如果执行抛出异常
                //2.如果没有异常，
                // 2.1.如果返回的非promise
                // 2.2.如果返回的是promise，return的promise的结果，就是这个promise结果
                try {
                    const result = cb(self.data)
                    if (result instanceof Promise) {
                        /*result.then(
                            value => resolve(value), //当结果失败
                            reason => reject(reason)
                        )*/
                        // 简易实现，效果跟上面一样
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }


            if (self.status===PENDING){
                // 当前状态为pending，将回调函数保存起来
                self.callbacks.push({
                    onResolved(){
                        handle(onResolved)
                    },
                    onRejected(){
                        handle(onRejected)
                    }
                })
            }else if(self.status===RESOLVED){
                setTimeout(()=>{
                    handle(onResolved)
                },0)
            }else{//'rejected'
                setTimeout(()=>{
                    handle(onRejected)
                },0)
            }
        })
    }

    /*
    * 原型对象的方法 catch()
    * 指定失败的回调函数
    * 返回一个新的promise对象
    * */
    Promise.prototype.catch = function(onRejected){
        return this.then(undefined, onRejected)
    }

    /*
    * 原型对象的方法 resolve()
    * 返回指定结果的 一个成功的promise对象
    * */
    Promise.resolve = function(value){

    }

    /*
    * 原型对象的方法 reject()
    * 返回指定reason的 一个失败的promise对象
    * */
    Promise.reject = function(reason){

    }

    /*
    * 原型对象的方法 all()
    * 返回一个promise，只有所有promise都成功时才成功，否则失败
    * */
    Promise.all = function(promises){

    }

    /*
    * 原型对象的方法 race()
    * 返回一个promise，结果由第一个完成的promise决定
    * */
    Promise.race = function(promises){

    }

    // 向外暴露Promise函数
    window.Promise = Promise;
})(window)