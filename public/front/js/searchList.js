/**
 * Created by Star on 2018/3/7.
 */

$(function () {

    var page = 1;
    var pageSize = 4;

    //发送ajax请求，获取关键字对应的商品，渲染出来
    function render(callback) {
        // 必须传递
        var param = {};
        param.page = page;
        param.pageSize = pageSize;
        param.proName = $('.lt_search input').val();


        //处理price与num， 如果lt_sort下有now这个类，就传排序字段，否则不传
        var $now = $('.lt_sort a.now');

        if ($now.length > 0) {
            var sortName = $now.data('type');
            var sortValue = $now.find('span').hasClass('fa-angle-down') ? 2 : 1;
            param[sortName] = sortValue;
            // console.log(param);
        } else {
            console.log('不需要传递排序参数');
        }



        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: param,
            success: function (info) {
                setTimeout(function(){
                    console.log(info);
                    callback(info);
                },1000);

            }

        });
    };


    //功能一：页面一进来，需要渲染一次， proName来自于input框
    var key = getSearch('key');
    $('.lt_search input').val(key);


    //上拉下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",
            down : {
                auto: true,
                callback :function(){
                    page = 1;
                    render(function(info){
                        $('.lt_product').html(template('product', info));
                        //结束下拉
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                        //重置上拉加载
                        mui(".mui-scroll-wrapper").pullRefresh().refresh(true);


                    });
                }
            },
            up : {
                callback : function(){
                    page++;
                    render(function(info){

                        //结束下拉
                        if(info.data.length>0){
                            $('.lt_product').append(template('product', info));
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }
                        else{
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }

                    });
                }
            }
        }
    });






    //功能二：点击搜索按钮，需要渲染一次， 用户修改了proName
    $('.lt_search button').on('click', function () {

        //先把所有的排序全清除掉
        $('.lt_sort a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        //让容器下拉刷新一次即可。
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

        //获取用户修改的proName,想要把此次的搜索记录存储起来
        var value = $('.lt_search input').val();
        var arr = localStorage.getItem("search_list"); //字符串
        arr = JSON.parse(arr); //数组
        var index = arr.indexOf(value); //value存在的索引
        if( index !== -1){
            arr.splice(index,1);//删除这个value
        }

        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(value); //将value放在最前面
        localStorage.setItem("search_list", JSON.stringify(arr));

    });

    //功能三：排序功能
    //1. 给lt_sort下的a注册点击事件
    //2. 判断点击的a是否有now这个类，
    // 如果没有,加上now这个类，并且删除其他a的类, 让所有的箭头都向下
    // 如果有，改变这个a下的span的箭头方向
    $('.lt_sort a[data-type]').on('click', function () {

        if ($(this).hasClass('now')) {
            $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        } else {

            $(this).addClass('now').parent().siblings().children('a').removeClass('now');
            $(".lt_sort span").removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        render();
    });


});




