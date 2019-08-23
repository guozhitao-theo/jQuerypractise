//放大镜的封装
;(function($){
	$.fn.jqzoom = function(options){
		//先定义每个盒子
		//区域选择框
		var areaSelect = null,
		//需要放大的原图片
		smallImg = null,
		//显示放大的区域
		bigArea = null,
		//显示放大的图片
		bigImg = null
		//给当前盒子设置相对定位
		$(this).css({
			position: 'relative'
		})
		
		//第一步，在鼠标移入框时向框里添加选择盒子
		$(this).mouseenter(function(){
			//先获取当前状态小图片
			smallImg = $(this).find('img')
			//获取需要放大图片的地址
			var bigImgSrc = smallImg.attr('src')
			//定义区域选择的盒子和放大盒子的模板字符串
			var smallHtml = `<div class="areaSelcet" style="position: absolute;top: 0;left: 0;background: rgba(255,255,255,0.2);z-index: 99;">
							</div>`
			var bigHtml = `<div class="bigArea" style="border: 1px solid #E2E2E2;overflow: hidden;
								width: ${options.showWidth}px;height: ${options.showHeight}px;position: absolute;
								top: ${options.showTop}px;left: ${options.showLeft}px;">
								<img class="bigImg" src="${bigImgSrc}" style="position: absolute;top: 0;left: 0;"/>
							</div>`
			
			//添加区域选择盒子
			$(this).append(smallHtml)
			//添加显示大图区域盒子
			$(this).append(bigHtml)
			//获取区域选择框
			areaSelect = $('.areaSelcet')
			//获取显示大图区域框
			bigArea = $('.bigArea')
			//获取大图
			bigImg = $('.bigImg')
			
		})
		
		//第二步，当鼠标移出盒子的时候删除 区域选择框和显示框
		$(this).mouseleave(function(){
			areaSelect.remove()
			bigArea.remove()
		})
		
		//第三步，鼠标移动时，区域选择框跟着鼠标移动
		$(this).mousemove(function(event){
			//计算获得鼠标距离当前的盒子的top,和left的值
			//先获取鼠标在页面的距离
			var pagex = event.pageX
			var pagey = event.pageY
			
			//然后获取小图盒子到视口的距离
			var offsetx = $(this).offset().left
			var offsety = $(this).offset().top
			
			//当前鼠标相对小图盒子的距离为 ： 鼠标在页面的距离 - 小图盒子到页面的距离
			var mousx = pagex - offsetx
			var mousy = pagey - offsety
			
			//当前鼠标出现在选择区域框的左上方，将其调整至中心
			mousx = mousx - areaSelect.width()/2
			mousy = mousy -areaSelect.height()/2
			
			//计算区域选择框的宽和高
			 var  areaSelectWidth = smallImg.width()/bigImg.width()*options.showWidth
			 var  areaSelectHeight = smallImg.height()/bigImg.height()*options.showHeight
			 //设置选择框的高和宽
			 $('.areaSelcet').css({
			 	width: areaSelectWidth,
			 	height: areaSelectHeight
			 })
			 
			//判定鼠标移动的边界条件
			mousx = mousx < 0 ? 0 : mousx 
			mousx = mousx > (smallImg.width() - areaSelectWidth) ? (smallImg.width() - areaSelectWidth) : mousx
			mousy = mousy > (smallImg.height() - areaSelectHeight) ? (smallImg.height() - areaSelectHeight) : mousy
			mousy = mousy < 0 ? 0 : mousy 
			
			
			//将获取的鼠标的位置设置为选择区域块的定位
			areaSelect.css({
				left: mousx,
				top: mousy
			})
			
			//给大的图片定位
			$(bigImg).css({
				top: -mousy*bigImg.height()/smallImg.height(),
				left: -mousx*bigImg.width()/smallImg.width(),
			})
		})
		
	}
	
})(jQuery)
