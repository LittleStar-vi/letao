/**
 * Created by Star on 2018/3/8.
 */

$(function(){

    var productId = getSearch("productId"); //获取id
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:productId
        },
        success:function(info){
            console.log(info);
            $('.mui-scroll').html( template('cartTpl', info) );

            //初始化轮播图
            mui('.mui-slider').slider({
                interval: 1000
            });

            //初始化数字输入框
            mui(".mui-numbox").numbox();

            //为尺码添加类
            $('.lt_pro_size span').on('click',function(){
                $(this).addClass('now').siblings().removeClass('now');
            });
        }
    });

    // 添加购物车
    // 1.点击按钮  2.获取productId num size  3.发送ajax请求
    $('.btn_add_cart').on('click',function(){
        var productId = getSearch('productId');
        var size = $('.lt_pro_size span.now').text();
        if(size === null){
            mui.toast('请输入尺码');
            return;
        }
        var num = $('.lt_num input').val();



        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:productId,
                size:size,
                num:num
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    mui.confirm('添加成功','温馨提示',["去购物车","继续浏览"],function(e){
                        if(e.index === 0){
                            location.href = 'cart.html';
                        }
                    });
                }
                //如果没有登录，添加失败
                if(info.error === 400){
                    //说明没有登录，去登录页登录
                    location.href = 'login.html?retUrl='+location.href;
                    console.log(location.href);
                }
            }
        })
    })




});