var log = function() {
    console.log.apply(console, arguments)
}

/*
    DOM 主要用到的函数
*/

// AJAX函数封装
var ajax = function (method , path, data, reseponseCallback) {
    let r  = new XMLHttpRequest()
    // 设置发送方式和请求地址
    r.open(method, path, true)
    // 设置发送格式
    r.setRequestheader('Content-Type', 'application/json')
    // 注册响应
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}


// e 选择第一个元素
var e = function(selector) {
    return document.querySelector(selector)
}
// find 可以查找 element 的一个子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}
// es 用来选择所有的元素
var es = function(selector) {
    return document.querySelectorAll(selector)
}

// 在 element 结束时加入 html 内容
// ( html 可能是模板字符串)
var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

// 增加或删除 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
// 删除所有的 Class
var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var removeClass = function(className) {
    var selector = '.' + className
    return selector
}

// 增加一个事件监听
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
// 给所有事件绑定监听
var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
