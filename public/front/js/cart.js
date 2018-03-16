/**
 * Created by Star on 2018/3/10.
 */


$(function () {

    //查询购物车
    function render() {
        $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            success: function (info) {
                console.log(info);
                //ajax需要时间
                setTimeout(function(){
                    if(info.error){
                        //此时没有登录,跳转到登录页，登录成功还需要跳回来
                        location.href = "login.html?retUrl="+location.href;
                    }

                    $('#OA_task_2').html(template('cartTpl', {info: info}));

                    //结束下拉刷新
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

                    //把总金额改成00.00
                    $('.total span').text('0.00');

                },1000);



            }
        });
    }

    //配置下拉刷新
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto: true,//页面进入，自动下拉刷新一次
                //indicators:false,//禁用滚动条
                callback: function () {
                    render();

                }
            }
        }
    });


    // 删除功能
    $('#OA_task_2').on('click', '.btn_delete', function () {
        // 获取到id
        var id = $(this).data('id');

        $.ajax({
            type: 'get',
            url: '/cart/deleteCart',
            data: {id: [id]},
            success: function (info) {
                console.log(info);
                if (info.success) {
                    render();
                }
            }
        })
    });

    //修改功能
    //1. 给修改按钮注册点击事件（代理）
    //2. 获取到对应的id
    //3. 根据id查询对应的这件商品信息
    //4. 把查询到的数据显示 mui.confirm框中
    //5. 修改尺码和数量
    //6. 点确定，发送ajax请求，修改到数据库
    //7. 下拉一次

    $('#OA_task_2').on('click', '.btn_edit', function () {
        var data = this.dataset;
        console.log(data);

        var html = template('editTpl', data);
        html = html.replace(/\n/g, '');

        mui.confirm(html, '编辑商品', ["确定", "取消"], function (e) {
            //判断点击哪一个是否发送ajax请求
            if (e.index === 0) {
                //点了确定，要获取id，size，num属性
                var id = data.id;
                var size = $('.lt_edit_size span.now').text();
                var num = $('.lt_edit_num input').val();
                console.log(id, size, num);
                $.ajax({
                    type: 'POST',
                    url: '/cart/updateCart',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    success: function (info) {
                        console.log(info);
                        render();
                    }
                })
            }
        });

        //给span添加click事件
        $('.lt_edit_size span').on('click', function () {
            $(this).addClass('now').siblings().removeClass('now');
        });

        // 初始化numbox
        mui(".mui-numbox").numbox();
    });

    //计算总金额
    $('#OA_task_2').on('change','.check',function(){
        var total = 0;
        $(':checked').each(function(){
            //获取到当前checkbox的数量与价格
            var price = $(this).data('price');
            var num = $(this).data('num');

            total += price * num;
        });
        $('.total span').text(total.toFixed(2));
    });

});