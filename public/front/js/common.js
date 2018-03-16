
// 初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false //是否显示滚动条
});

//初始化轮播图
var gallery = mui('.mui-slider');
gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});


//需求：能够把地址栏所有的参数封装成一个对象 {name:"hucc",age:18, desc:"很帅"}

function getSearch(key){

    // 1.获取到参数
    var search = location.search;
    //2.对参数进行编码
     search = decodeURI(search);
    // 3.去掉？
    search = search.slice(1);
    // 4.把字符串根据&切割成数组
    var arr = search.split('&');

    // 5.遍历数组
    var obj = {};
    arr.forEach(function(element,index){
        var k = element.split('=')[0];
        var v = element.split('=')[1];
        obj[k]=v;
    });
    return obj[key]; //return 传进来的参数键key相对应的值


}


