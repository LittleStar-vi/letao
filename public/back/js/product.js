$(function(){

    var page = 1;
    var pageSize = 5;
    var result = [];//数组用于存储上传成功的图片的地址

    function render(){
        $.ajax({
           type:'get',
            url:'/product/queryProductDetailList',
            data:{
               page: page,
                pageSize: pageSize
            },
            success:function(info){
                // console.log(info);
                $('tbody').html( template('product', info) );

                //分页渲染
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),

                    itemTexts:function(type, page, current){
                        // console.log(type, page, current);
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第"+page+"页";
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        //console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第" + page + "页";
                        }
                    },
                    useBootstrapTooltip:true,

                    onPageClicked:function(a,b,c,p){
                        page = p;
                        render();
                    }
                });


            }
        });
    }
    render();

    //1.添加商品点击事件
    $('.btn_add').on('click',function(){
        $('#productModal').modal('show');

        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page: 1,
                pageSize: 100
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html( template('secondTpl', info) );

            }
        });
    });

    //2.给二级分类的a标签添加点击事件
    $('.dropdown-menu').on('click', 'a', function(){
        var text = $(this).text();
        $('.dropdown_text').text(text);

        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        // 让brandId校验成功
        $('form').data("bootstrapValidator").updateStatus('brandId', 'VALID');

    });

    //3.初始化图片上传
    $("#fileupload").fileupload({
        dataType:'json',
        done:function(e, data){
            if(result.length >=3 ){
                return;
            }
            console.log(data.result);
            var picUrl = data.result.picAddr;

            // 显示图片预览
            $('.img_box').append('<img src="'+ picUrl +'" alt="" width="100" height="100">');
            result.push(data.result);
            console.log(result.length);

            // //根据数组长度判断上传了几张照片
            if(result.length === 3){
                // // 校验成功
                $("form").data("bootstrapValidator").updateStatus("productLogo", "VALID");
            } else{
                //让某个字段校验失败
                $("form").data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }

        }
    });

    //4.表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        //配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验规则
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择品牌"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    //必须是非零开头的数字
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个有效的商品库存"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    //要求：2位数字-2位数字
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入一个合法的尺码（例如32-44）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    }
                }
            },
            productLogo: {
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }
        }
    });

    //5.给表单注册一个校验事件
    $('form').on('success.form.bv', function(e){
        e.preventDefault();
        var  param = $form.serialize();
        param += "&picName1="+ result[0].picName + "&picAddr1="+ result[0].picAddr;
        param += "&picName2="+ result[0].picName + "&picAddr2="+ result[0].picAddr;
        param += "&picName3="+ result[0].picName + "&picAddr3="+ result[0].picAddr;

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:param,
            success:function(info){
                // console.log(info);
                if(info.success){
                    //关闭模态框
                    $('#productModal').modal('hide');

                    //重置模态框内容
                    $("form").data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text("请选择二级分类");
                    $(".img_box img").remove();

                    //渲染
                    page = 1;
                    render();

                    result = [];
                }
            }

        })


    })

});