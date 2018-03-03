
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
        NProgress.done();
        // console.log("ajax end");

    });




});