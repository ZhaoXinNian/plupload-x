/*
中文文档
http://www.phpin.net/tools/plupload/
*/
// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","plupload/plupload.full.min.js");
// document.body.appendChild(new_element);
// 引入核心上传插件 路径自己定义
document.write(" <script language=\"javascript\" src=\" plupload/plupload.full.min.js \" > <\/script>");
//封装
jQuery.uploads = function(options) {
    if(options.id == undefined || options.url == undefined){
        alert('缺少参数');
        window.console.log('缺少参数');
    }
    /**********************************定义参数****************************************************************/
    var params = {
        id:options.id,                      // 绑定应用的元素                      start_upload  (string dom)      Required
        url:options.url,                    // 上传至服务器处理链接                 upload.php    (string)          Required
        extensions:options.extensions?options.extensions:[{ title : "All files", extensions : "*" }], //可支持的文件    *    [{tilte:'',extensions:'*.png'}]   (object)   Optional
        file_data_name:options.file_data_name?options.file_data_name:'file',                          // 上传到服务器的文件参数名称             file  （string）              Optional
        param:options.param?options.param:{one:1},                                                    // 附加参数                           {}     (object)               Optional
        drop_element:options.id?options.id:'',                                                        // 拖拽上传指定文件拖到指定元素上可以上传   start_upload (string dom)     Optional
        multi_selection:options.multi_selection?options.multi_selection:true,                         // 是否允许选择多个文件                  true   (bool)                Optional
        processing:options.processing?options.processing:true,                                        // 是否自动上传                        true    (bool)                Optional
        start_id:options.start_id?options.start_id:'start_upload_btn',                                // 绑定开始上传按钮的元素                start_upload_btn (string dom) Optional 如果不自动上传必须填写开始上传按钮元素
        max_file_size:options.max_file_size?options.max_file_size:'400kb',                            // 文件最大支持
        success:function (responseObject) {},
        errors:function (errObject) {},
        progress:function (file) {},
        complete:function (files) {}
    };
    /**********************************配置上传参数****************************************************************/
    var uploaders = new plupload.Uploader({
        browse_button : params.id,          // 触发文件选择对话框的按钮，为那个元素id
        url : params.url,                   // 服务器端的上传页面地址
        flash_swf_url : '/plupload/Moxie.swf',       // swf文件，当需要使用swf方式进行上传时需要配置该参数 默认html方式上传 可选参数 可以不用写
        silverlight_xap_url : '/plupload/Moxie.xap', // silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数 默认html方式上传 可选参数 可以不用写
        filters: {
            mime_types :params.extensions ,
            max_file_size : params.max_file_size,//100b, 10kb, 10mb, 1gb                    // 最大只能上传400kb的文件
            prevent_duplicates : true                                          // 不允许选取重复文件
        },
        multi_selection:params.multi_selection,          // 是否允许选择多个文件
        file_data_name:params.file_data_name,            // 默认上传文件的名称
        multipart_params: params.param,
        drop_element:params.drop_element,                 // 拖拽上传 指定文件拖到指定元素上可以上传
        runtimes : 'html5,flash,silverlight',//设置运行环境，会按设置的顺序，
    });
    var sets = $.extend(params,options || {});
    //在实例对象上调用init()方法进行初始化
    uploaders.init();
    /**********************************绑定各种事件，并在事件监听函数中做你想做的事****************************************************************/
    uploaders.bind('FilesAdded',function(uploader,files){
        //当文件添加到上传队列后触发监听函数参数：(uploader,files)
        // 判断是否选取好文件自动上传
        if( params.processing){
            uploader.start(); //调用实例对象的start()方法开始上传文件，当然你也可以在其他地方调用该方法
        }
        return;
    });
    uploaders.bind('UploadProgress',function(uploader,file){
        //会在文件上传过程中不断触发，可以用此事件来显示上传进度监听函数参数：(uploader,file)
        // $("#progress").html("上传进度为：" + file.percent + "%");
        return sets.progress.call(this,file);
    });
    uploaders.bind('FileUploaded',function (uploader,file,responseObject) {
        // 当队列中的某一个文件上传完成后触发监听函数参数：(uploader,file,responseObject)
        console.log("单独文件上传完毕");
        var response = $.parseJSON(responseObject.response);
        // var servers_ret = eval('(' + responseObject.response + ')');
        return sets.success.call(this,response);
    });
    uploaders.bind('UploadComplete',function (uploader,files) {
        // 当上传队列中所有文件都上传完成后触发监听函数参数：(uploader,files 数组 选择的文件)
        // console.log('全部上传完毕');return;
        return sets.complete.call(this,files);
    });
    uploaders.bind('Error',function (uploader,errObject) {
        // 当发生错误时触发监听函数参数：(uploader,errObject)
        return sets.errors.call(this,errObject);
    });
    if( params.processing == false ){
        //最后给"开始上传"按钮注册事件
        document.getElementById(params.start_id).onclick = function(){
            uploader.start(); //调用实例对象的start()方法开始上传文件，当然你也可以在其他地方调用该方法
            return;
        }
    }
}