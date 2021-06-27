const $siteList = $(".siteList"); //jQuery开头用$，找到siteList
const $lastLi = $siteList.find("li.last");
const website = localStorage.getItem('website')
const websiteObject = JSON.parse(website)  //把字符串重新变成对象
const hashMap = websiteObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  {logo: "B", url: "https://www.bilibili.com"}
];  
// 因为xObject（此处x语义化命名为website）一开始是空的，用户没用过，所以写成“如果xObject存在，使用xObject，如果不存在就用默认的数组（后面的代码）”

const simplifyUrl  = (url)=>{
  return url.replace('https://', '')
  .replace('http://', '')
  .replace('www.', '')
  .replace('.cn', '')
  .replace('.com', '')
  .replace(/\/.*/, '') 
} 
//simplifyUrl 简化url
//最后一个replace是正则表达式，删除以/开头的内容

const render = () => {
  $siteList.find("li:not(.last").remove(); //找到siteList所有li但是不包括last最后一个并移除
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-delete"></use>
            </svg>  
          </div>
      </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', ()=>{
      window.open(node.url)
    })
    $li.on('click', '.close', (e)=>{
      e.stopPropagation() //阻止冒泡事件，防止点击跳转链接
      hashMap.splice(index, 1) //根据索引删除1个
      render()  //重新渲染
    })
  })
}

render()

$(".addButton").on("click", () => {
  let url = window.prompt("请输入以 www 开头的正确网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ 
    logo: simplifyUrl(url)[0].toUpperCase(), 
    url: url 
  })  // .toUpperCase()把字符变成大写
  render()
})

//localStorage是个全局变量，只能存字符串，不能存对象
window.onbeforeunload = () =>{
    const string =  JSON.stringify(hashMap) //JSON.stringify()能把对象变成字符串
    localStorage.setItem('website', string)  //在本地的存储里面设置一个x，此处语义化命名为website，值为string
}

$(document).on('keypress', (e)=>{
  const {key} = e
  for(let i = 0; i<hashMap.length; i++) {
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
    }
  }
})
