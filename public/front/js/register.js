/**
 * Created by Star on 2018/3/8.
 */

$(function(){
    // 获取验证码
    $('.get_vcode').on('click',function(e){
        // e.preventDefault();
        var $this = $(this);
        $this.prop('disabled',true).addClass('disabled').text('发送中...');

        // 发送ajax请求
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(info){
                console.log(info.vCode);
                var count = 5;
                var timer = setInterval(function(){
                    count--;
                    $this.text(count+'秒后再次发送');
                    if(count === 0){
                        clearInterval(timer);
                        //恢复按钮，可点
                        $this.prop('disabled',false).removeClass('disabled').text('再次发送');
                    }
                },1000);

            }
        })
    });




    //为注册按钮添加点击事件
    $('.btn_register').on('click',function(e){
        e.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        var repassword = $('[name=repassword]').val();
        var mobile = $('[name=mobile]').val();
        var vCode = $('[name=vCode]').val();
        if(!username){
            mui.toast('用户名不能为空');
            return false;
        }
        if(!password){
            mui.toast('密码不能为空');
            return false;
        }
        if(!repassword){
            mui.toast('密码输入不一致，请重新输入');
            return false;

        }if(!password){
            mui.toast('密码不能为空');
            return false;

        }if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('手机号码格式不正确');
            return false;

        }if(!vCode){
            mui.toast('请输入验证码');
            return false;
        }
        if(!$('[type=checkbox]').prop('checked')){
            mui.toast('请在同意协议前打勾');
            return false;
        }

        //所有校验成功，发送请求
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    mui.toast('恭喜你，注册成功了，一秒后跳转到登录页');

                    setTimeout(function(){
                        location.href = 'login.html';
                    },1000);
                }
                if(info.error === 401 || 403){
                    mui.toast(info.message);
                }
            }
        })


    })


});