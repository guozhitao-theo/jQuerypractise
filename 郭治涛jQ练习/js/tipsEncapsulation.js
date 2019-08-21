//提示框的封装
/*
 * 将tipsShow方法封装到$里面去
 * option 为对象，
 * 里面包含 type success info error
 * text 为需要显示的文本
 * time 消失的时间 单位为秒
 */
;(function($,w){
	$.extend({
		tipsShow:function(options){
			//先判断是否含有定时器
			if(w.timer){
				clearTimeout(w.timer)
			}
			$('.alert').remove()
			html = $(`<div class="alert alert-${options.type}">${options.text}</div>`)
			$('body').append(html)
//			switch(options.type){
//				case 'success':
//					$('body').append(`<div class="alert alert-${options.type}">${options.text}</div>`)
//					break;
//				case 'info':
//					$('body').append(`<div class="alert alert-${options.type}">${options.text}</div>`)
//					break;
//				default:
//					$('body').append(`<div class="alert alert-${options.type}">${options.text}</div>`)
//					break;
//			}
			//如果输入的类型为success
			w.timer = setTimeout(function(){
				if(options.success){
					options.success()
				}
				html.remove()
			},options.time*1000||3000)
		}
	});
	
})(jQuery,window)

