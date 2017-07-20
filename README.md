# 简单封装 Plupload 上传插件，调用更简单

该插件需依赖 [jQuery](//jquery.com) 先自行引入jquery包:


## Demo
### js
```js
 $.uploads({
        id:'file',
        url:'upload.php',
        success:function(response){
            console.log('上传成功');
            $('#spic').slideDown('slow').attr({'src':files});
        }
    });
```

### html
```html
<input id="file" name="file" type="file">
<script src="plupload/plupload.x.js"></script>
```

## - _- 
 可扩展自己的处理事务，有不足之处请谅解！