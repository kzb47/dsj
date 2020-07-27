$(function () {
    $('.log').on('click', function () {
        $('.loginbox').hide()
        $('.regbox').show()
    })

    // 点击“去登录”的链接
    $('.reg').on('click', function () {
        $('.loginbox').show()
        $('.regbox').hide()
    })


    var form = layui.form;
    // console.log(form);
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (val) {
            var pwd = $('regbox [name=password]').val();
            if (pwd !== val) return '两次密码不一致'
        }
    })

    $('#formreg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#formreg [name=username]').val(),
            password: $('#formreg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功，请登录！');
            $('.reg').click();
        })
    })

    $('#formlog').on('submit', function (e) {
        // console.log(1);
        e.preventDefault();
        var data = $(this).serialize();
        $.post('/api/login', data, function (res) {
            console.log(res);
            if (res.status !== 0) return layer.msg('登录失败');
            layer.msg('登录成功');
            localStorage.setItem('token', res.token);
            location.href = './index.html';
        })
    })




})