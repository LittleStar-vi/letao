/**
 * Created by Star on 2018/3/7.
 */

$(function(){
    //渲染列表
    //1. 从本地缓存中获取到需要渲染的数据

    //希望这个函数无论如何都能返回一个数组，如果没有记录，返回一个[]

    function getHistory(){
        var history = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }

    // 渲染方法
    function render(){
        var arr = getHistory();
        console.log(arr);
        $('.lt_history').html( template('history_list',{arr:arr}) );

    }
    render();

    //功能二：清空
    //1. 给清空记录按钮注册点击事件(委托)
    //2. 清空 search_list 这个值
    //3. 重新渲染

    $('.lt_history').on('click','.btn_empty',function(){
        mui.confirm('你确定要清空所有的历史记录吗?','温馨提示',["是","否"],function(e){
            if(e.index === 0){
                localStorage.removeItem('search_list');
                render();
            }
        })
    });

    //功能3：删除
    //1. 给删除按钮注册点击事件
    //2. 获取到删除的下标
    //3. 获取到web存储中的数组
    //4. 删除数组中对应下标那项
    //5. 重新设置search_list的值
    //6. 重新渲染。

    $('.lt_history').on('click','.btn_delete',function(){
        var that = this;
        mui.confirm('你确定要删除这条历史记录吗?',"温馨提示", ["删除", "取消"], function(e){
            if(e.index === 0){
                var index =$(that) .data('index');
                var arr = getHistory();
                arr.splice(index,1);
                localStorage.setItem("search_list",JSON.stringify(arr));
                render();
            }
        })
    });

    //功能4： 增加
    //1. 给搜索按钮注册事件
    //2. 获取到文本框value值
    //3. 获取到存储中的数组
    //4. 把value值添加到数组中的最前面
    //5. 重新设置search_list的值
    //6. 重新渲染 （跳转到搜索详情页）

    $('.lt_search button').on('click',function(){
        var value = $('.lt_search input').val().trim();
        $('.lt_search input').val(''); //清除内容
        if(value == ""){
            mui.toast('请输入搜索关键字');
            return;
        }

        var arr = getHistory(); //已是数组对象，不是字符串

        var index = arr.indexOf(value);

        // 两个if判断顺序不能换，如果已经干掉重复的数据，直接添加后满足10条数据的话就不需要再删除最后一个数据
        if(index != -1){
            arr.splice(index,1); //删除已存在的数据
        }

        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(value);

        localStorage.setItem("search_list",JSON.stringify(arr));
        //跳转页面
        location.href = 'searchList.html?key='+ value;
    });




});