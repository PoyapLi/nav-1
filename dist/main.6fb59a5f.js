// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList"); //jQuery开头用$，找到siteList
var $lastLi = $siteList.find("li.last");
var website = localStorage.getItem('website');
var websiteObject = JSON.parse(website); //把字符串重新变成对象
var hashMap = websiteObject || [{ logo: "A", url: "https://www.acfun.cn" }, { logo: "B", url: "https://www.bilibili.com" }];
// 因为xObject（此处x语义化命名为website）一开始是空的，用户没用过，所以写成“如果xObject存在，使用xObject，如果不存在就用默认的数组（后面的代码）”

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('.cn', '').replace('.com', '').replace(/\/.*/, '');
};
//simplifyUrl 简化url
//最后一个replace是正则表达式，删除以/开头的内容

var render = function render() {
  $siteList.find("li:not(.last").remove(); //找到siteList所有li但是不包括last最后一个并移除
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n      <div class=\"site\">\n          <div class=\"logo\">" + node.logo + "</div>\n          <div class=\"link\">" + simplifyUrl(node.url) + "</div>\n          <div class=\"close\">\n            <svg class=\"icon\">\n              <use xlink:href=\"#icon-delete\"></use>\n            </svg>  \n          </div>\n      </div>\n    </li>").insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); //阻止冒泡事件，防止点击跳转链接
      hashMap.splice(index, 1); //根据索引删除1个
      render(); //重新渲染
    });
  });
};

render();

$(".addButton").on("click", function () {
  var url = window.prompt("请输入以 www 开头的正确网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  }); // .toUpperCase()把字符变成大写
  render();
});

//localStorage是个全局变量，只能存字符串，不能存对象
window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //JSON.stringify()能把对象变成字符串
  localStorage.setItem('website', string); //在本地的存储里面设置一个x，此处语义化命名为website，值为string
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6fb59a5f.map