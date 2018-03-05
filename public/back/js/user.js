$(function(){

    var page = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type:'GET',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                $('tbody').html( template("userTpl", info) );
                console.log(info);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages: 2,
                    totalPages: Math.ceil(info.total/info.size),
                    // 当页码被点击的时候触发
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                });

            }
        })
    }
    render();

    //启用禁用用户
    $('tbody').on('click','.btn',function(){

        //显示模态框
        $("#userModal").modal("show");

        // 获取到点击当前按钮所在的用户
        var id = $(this).parent().data('id');

        var isDelete = $(this).hasClass('btn-success')?1:0;
        $('.btn_confirm').off().on('click',function(){
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success){
                        //关闭模态框
                        $('#userModal').modal("hide");
                        //重新渲染
                        render();
                    }
                }
            });
        });
    });


});