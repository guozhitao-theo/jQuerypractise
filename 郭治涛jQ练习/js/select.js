//下拉框的逻辑
//立即执行函数
(function(){
	$.fn.selectorExample = function(option){
		//合并对象，如果没有传值就使用默认的额
		 var options =	$.extend({
				title: '.select-title',
				list: '.options-lists',
				listBox: '.options',
				parent: '.select-box',
				text: '.select-show'
			},option)
		 //一个变量承载当前
		 var _this = this
		//第一步，先添加点击事件，显示下拉框
		$(options.title).click(function(event){
			//因为title也属于文档内容，所以需要阻止冒泡否则下拉框出不来
			event.stopPropagation()
			$(this).closest(options.parent).find(options.listBox).toggleClass('show')
			//第四步，当前显示的时候其他的隐藏
			$(this).closest(options.parent).siblings(options.parent).find(options.listBox).removeClass('show')
			
			
		})
		//第二步，点击list获取其内容并赋给title
		$(options.list).click(function(){
			//获取list框的内容
			var textShow = $(this).html()
			//将list的内容赋给title
			$(this).closest(options.parent).find(options.text).val(textShow)
		})
		//第三步，点击文档，隐藏listBox
		$(document).click(function(){
			$(options.listBox).removeClass('show')
		})
		
	}
})()
