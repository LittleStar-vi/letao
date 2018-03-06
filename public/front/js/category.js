/**
 * Created by Star on 2018/3/6.
 */

$(function () {

    // 1.请求一级分类数据
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success: function(info){
            // console.log(info);
           $('.first').html( template('first',info) );
           secondRender(info.rows[0].id);
        }
    });

    //2.请求二级分类数据
    $('.first').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).children('a').data('id');
        secondRender(id);
        //让区域滚动重新到0，0的位置
        console.log(mui('.mui-scroll-wrapper').scroll());
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);

    });

    // 3.渲染二级分类数据
    function secondRender(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{id:id},
            success: function(info){
                $('.second').html( template('second', info) );

            }
        });
    }




});