# 简单封装 Plupload 上传插件，调用更简单

该插件需依赖 [jQuery](//jquery.com) 先自行引入jquery包。



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
plupload [中文文档](http://www.phpin.net/tools/plupload/) 可根据业务需求扩展
######### 刚开始练练手。。。