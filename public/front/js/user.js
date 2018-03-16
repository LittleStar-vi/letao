/**
 * Created by Star on 2018/3/9.
 */

$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
            $('.userinfo').html( template('userTpl', info) );

        }
    });


    //退出功能
    $('.btn_logout').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                // console.log(info);
                if(info.error === 400){
                   location.href = 'login.html';
                }

            }
        })
    })
});