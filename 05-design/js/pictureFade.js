/*
**@description:渐隐式轮播图插件
**@author:hefeng
**@update:hefeng(2016-3-17 15:00)
*/
(function($){
	/*
	**pictureFade		 :插渐隐式轮播图插件, hover按钮触发带有延迟处理，该插件要用装有轮播图的容器对象使用;
	**@toggleObj		 :需要切换的列表名，		默认值 'null'， 类名需加上 '.';
	**@btnLeft/btnRight	 :是左右切换按钮，			默认值 'null',  类名需加上 '.';
	**@btnList			 :是对应切换图片的按钮列表，默认值 ‘null’,  类名需加上 '.'; 
	**@btnClass			 :当前按钮添加的Class，		默认值 ‘null’,  不需加上 '.'; 
	**@currentI			 :当前图片的序号，			默认值  0;		不需要写; 
	**@auto 			 :自动轮播的定时器			默认值 ‘null’	不需要写; 
	**@autoTime 		 :自动轮播的时间			默认值 3000	; 
	**用法				 :$('.box').pictureFade({option}),   toggleObj, btnList, btnClass,几个参数必须;
	*/
	$.fn.extend({
		pictureFade : function(option){
			var op = $.extend({}, $.fn.pictureFade.defaults, option || {});

		//1. 初始化，让第一张图片显示，并实现自动播放
			op.currentI = 0;
			$( op.toggleObj ).css( 'display', 'none ');
			$( op.toggleObj ).eq(0).css( 'display', ' block ');
			autoPlay( op.autoTime );

		//2. 鼠标移到按钮，切换图片,同时停止自动播放
			$( op.btnList ).hoverDelay(function(){ toggle( $(this) ) },function(){});				
			$( this ) .hover( function(){ clearInterval( op.auto ) }, function(){ autoPlay( op.autoTime ) });

		//3. 点击左右按钮调用图片切换方法
			if( op.btnLeft && op.btnRight ){
				$( op.btnLeft  ).on('click', function(){ toggle( 1 ) });
				$( op.btnRight ).on('click', function(){ toggle( 2 ) });
			}
		//4. 实现图片切换方法
			//自动切换
			function autoPlay( time ){
				clearInterval( op.auto );
				op.auto = setInterval(function(){ toggle( 0 ) }, time);
			};
		
			function toggle( btn ){
				if( btn == 1 ){
					op.currentI--;
					op.currentI = op.currentI < 0 ? $(op.toggleObj).length-1 : op.currentI;
				}else if( btn == 2 || btn == 0 ){
					op.currentI++;
					op.currentI = op.currentI > $(op.toggleObj).length-1 ? 0 : op.currentI;
				}else{
					op.currentI = btn.index();
				}
				$(op.btnList).eq(op.currentI).addClass( op.btnClass ).siblings().removeClass( op.btnClass );
				$(op.toggleObj).eq( op.currentI ).stop(true,true).fadeIn(500).siblings().fadeOut(500);
			};
		},
		hoverDelay : function(c, f, g, b) {  
			var g = g || 300,   //hover entry time  
			b = b || 300,       //hover departure time  
			f = f || c;  
			var e = [],  
			d = [];  
			return this.each(function(h) {  
				$(this).mouseenter(function() {  
					var i = this;  
					clearTimeout(d[h]);  
					e[h] = setTimeout(function() {  
						c.apply(i)  
					},  
					g)  
				}).mouseleave(function() {  
					var i = this;  
					clearTimeout(e[h]);  
					d[h] = setTimeout(function() {  
						f.apply(i)  
					},  
					b)  
				})  
			})  
		} 
	});

	$.fn.pictureFade.defaults = {
		toggleObj: null,
		btnLeft  : null,
		btnRight : null,
		btnList  : null,
		btnClass : null,
		currentI : 0,
		auto	 : null,
		autoTime : 3000
	}
	
})(jQuery);