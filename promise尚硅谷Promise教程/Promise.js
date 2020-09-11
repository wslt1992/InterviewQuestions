/*
* 自定义promise模块
* */

(function(params){
    function Promise(executor){

    }

    /*
    * 原型对象的方法 then()
    * 指定成功和失败的
    * 返回一个新的promise对象
    * */
    Promise.prototype.then = function(onResolve, onReject){

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