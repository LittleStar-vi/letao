$(function(){

    var page = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize: pageSize
            },
            success:function(info){
                $('tbody').html( template("firstTpl", info) );
                console.log(info);

                //分页渲染
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3, //如果使用了bootstrap3版本，必须指定
                    currentPage: page,  //设置当前页
                    totalPages: Math.ceil(info.total/info.size),//设置总页数
                    numberOfPages:5,// 设置显示多少页
                    //当页码被点击的时候触发
                    onPageClicked: function (a,b,c,p) {
                        //修改一下page的值
                        page = p;
                        //重新渲染
                        render();
                    }

                });
            }
        });
    };
    render();

    //添加分类点击事件
    $('.btn_add').on('click',function(){
        //显示模态框
        $('#firstModal').modal('show');

    });

    //初始化表单校验
    var $form = $('form');
    $form.bootstrapValidator({

        //配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //校验规则
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类的名称不能为空'
                    }
                }
            }
        }
    });

    //给表单注册校验成功事件
    $form.on("success.form.bv",function(e){
        e.preventDefault();

        //使用ajax提交逻辑
        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                if(info.success){
                    //关闭模态框
                    $('#firstModal').modal('hide');

                    //重置表单样式和内容
                    $form.data("bootstrapValidator").resetForm(true);

                    //重新渲染第一页
                    page = 1;
                    render();
                }
            }
        })

    })

});