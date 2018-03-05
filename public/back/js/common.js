
$(function(){

    //禁用进度环
    NProgress.configure({
       showSpinner: false
    });

    // 进度条加载效果
    $(document).ajaxStart(function(){
        NProgress.start();
        // console.log("ajax start");
    });

    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        }, 500);

        // console.log("ajax end");

    });

    // 二级菜单的显示与隐藏
    $(".second").prev().on("click",function(){
        $(this).next().slideToggle();
    });

    //找到icon_menu注册点击事件
    $(".icon_menu").on('click',function(){
        // $('.lt_aside').toggleClass("now");
        $('.lt_aside').toggleClass("now");
        $('.lt_main').toggleClass("now");
    });

    //退出功能
    $('.icon_logout').on('click',function(){
        //显示模态框
        $("#logoutModal").modal("show");
    });

    $('.btn_logout').on('click',function(){
        $.ajax({
            type:'GET',
            url:'/employee/employeeLogout',
            success:function(info){
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    });

    //如果不是登录页，发送ajax请求，查询管理员是否登录
    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            type: "GET",
            url: "/employee/checkRootLogin",
            success: function (info) {
                // console.log(info);
                if(info.error == 400){
                    location.href = "login.html";
                }
            }
        })
    }


});