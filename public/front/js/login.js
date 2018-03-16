/**
 * Created by Star on 2018/3/8.
 */

$(function(){

    // 给登录注册点击事件
    $('.btn_login').on('click',function(e){
        e.preventDefault();

        var username = $('[name=username]').val().trim();
        var password = $('[name=password]').val().trim();

        if(!username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!password){
            mui.toast('请输入密码');
            return false;
        }

        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    var search = location.search;
                    if(search.indexOf('retUrl') != -1){
                        //说明需要回跳
                        search = search.replace('?retUrl=','');
                        location.href = search;
                    }else{
                        //跳转到会员中心
                        location.href = 'user.html';
                    }

                }else{
                    var message = info.message;
                    mui.toast(message);
                }
            }
        })
    });

    //给重置注册点击事件
    $('.btn_reset').on('click',function(){
       $('[name=username]').val('');
       $('[name=password]').val('');
    })





});



