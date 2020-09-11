/*
* 自定义promise模块
* */

(function(params){
    function Promise(executor){
        const self = this;
        self.status = 'pending' //给promise对象指定status属性，初始值为pending
        self.data = undefined  //给promise指定一个用于存储结果的数据属性
        self.callbacks = []  //每个元素结构 {onResolved(){}, onRejected(){}}

        function resolve(value){
        //    如果当前状态不是pending，直接结束
            if(self.status!=='pending'){
                return
            }

        //    状态改为resolved
            self.status = 'resolved'
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
            if(self.status!=='pending'){
                return
            }

            //    状态改为resolved
            self.status = 'resolved'
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
        const self = this;
        self.callbacks.push({
            onResolved,
            onRejected
        })
    }

    /*
    * 原型对象的方法 catch()
    * 指定失败的回调函数
    * 返回一个新的promise对象
    * */
    Promise.prototype.catch = function(onReject){

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