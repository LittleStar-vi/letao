$(function(){

    var page = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
           type:'get',
            url:'/product/queryProductDetailList',
            data:{
               page: page,
                pageSize: pageSize
            },
            success:function(info){
                console.log(info);
                $('tbody').html( template('product', info) );

                //分页渲染
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),

                    itemTexts:function(type, page, current){
                        console.log(type, page, current);
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

    //添加

});