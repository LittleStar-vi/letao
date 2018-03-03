
$(function(){

    //1.校验表单
    $("form").bootstrapValidator({

        //要求：用户名不能为空 2-6
        //密码不能为空 密码长度在6-12位
        // 配置校验规则
        fields:{
            //对应了form中的name属性
            username:{
                //给username配置校验规则
                validators:{
                    notEmpty:{
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "长度应该在2-6位"
                    },
                    callback: {
                        message:"用户名错误"
                    }

                }
            },
            password:{
                //给password配置校验规则
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"长度应该在6-12位"
                    },
                    callback: {
                        message:"密码错误"
                    }
                }
            }

        },
        // 配置小图标 ,成功，失败 校验中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    //2.给表单注册一个校验成功的事件， 成功的时候阻止表单的默认提交，使用ajax进行。
    $("form").on("success.form.bv",function(e){
        e.preventDefault();

        //发送ajax请求登录
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data: $("form").serialize(),
            dataType: 'json',
            success:function(info){
                if(info.error === 1000){
                    $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }

                if(info.error === 1001){
                    $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }


                if(info.success){
                    location.href = "index.html";
                }
            }

        })
    });


    //3.重置表单，清除所有样式
    $("[type='reset']").on('click',function(){
        // $("form").data("bootstrapValidator").resetForm(); //也可以
        // e.preventDefault();
        $("form").bootstrapValidator("resetForm",true);
    })
});