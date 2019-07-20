// 简化元素获取方法，以数组形式返回
const getUtil = {
    byId: (id, ancestor = document) => {
        const arr = [];
        arr.push(ancestor.getElementById(id));
        return arr;
    },
    byCls: (cls, ancestor = document) => Array.from(ancestor.getElementsByClassName(cls)),
    query: (selector, ancestor = document) => {
        const arr = [];
        arr.push(ancestor.querySelector(selector));
        return arr;
    },
    queryAll: (selector, ancestor = document) => Array.from(ancestor.querySelectorAll(selector))
};

// 类名判断，添加，移除，切换
const classUtil = {
    has: (ele, cls) => ele.className.includes(cls),
    add: (ele, cls) => {
        if (!(ele instanceof Array)) {
            const arr = [];
            arr.push(ele);
            ele = arr;
        }
        ele.forEach(element => {
            let clsArr = [];
            // 合并原类名与新类名，转化为数组
            // 若有多个类名，则判断元素是否存在类名时需要遍历并针对操作，反而更麻烦
            clsArr = (element.className + ' ' + cls).split(/\s+/g);
            // 数组去重，转化为字符串，赋为类名
            element.className = [...new Set(clsArr)].join(' ');
        });
    },
    remove: (ele, cls) => {
        if (!(ele instanceof Array)) {
            const arr = [];
            arr.push(ele);
            ele = arr;
        }
        ele.forEach(element => {
            const clsArr = [...new Set(element.className.split(/\s+/g))],
                  newClsArr = clsArr.filter(element => !cls.includes(element));
            element.className = newClsArr.join(' ');
        });
    },
    // 切换类名仅涉及一个类名，调用add()和remove()方法较消耗性能
    // 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
    toggle: (ele, cls) => {
        if (!(ele instanceof Array)) {
            const arr = [];
            arr.push(ele);
            ele = arr;
        }
        ele.forEach(element => {
            // 将元素类名转化为数组并去重
            const clsArr = [...new Set(element.className.split(/\s+/g))],
                index = clsArr.indexOf(cls);
            if (index !== -1) {
                clsArr.splice(index, 1);
                element.className = clsArr.join(' ');
            } else {
                clsArr.push(cls);
                element.className = clsArr.join(' ');
            }
        })
    }
};