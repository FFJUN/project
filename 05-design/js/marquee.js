/*
**@description:跑马灯插件
**@author:hefeng
**@update:hefeng(2016-7-21 11:50)
*/
(function($){
	/*
	**marquee		 :插件用于水平滚动
	**@child		 :是需要滚动的列表,默认为父元素下的直接子元素, 如需要自行选择，写入标签名或class名即可，如'.child'、'li'
	**@type			 :是滚动的类型, 默认值为 true,为连续滚动， 为false时间隔一定时间滚动
	**@marqueeSpeek	 :是连续滚动时的速度,默认值4000,越大越慢
	**@intervalTime	 :是间隔滚动时的时间间隔,默认值2500,越大越慢
	**@intervalSpeek :是间隔滚动时的滚动速度,默认600,越大越慢
	**@show			 :是列表展示在页面中的个数，默认值是4
	**用法			 :$(selector).selectStar(option),通过 $(selector).selectStar.defaults.rel获取评价分数
	*/
;	$.fn.extend({
		marquee : function(option){
			//合并默认参数default和自定义参数	
			var op  = $.extend( {}, $.fn.marquee.defaults, option || {} );
			
			var _this  = $(this),
				_child = op.child ? _this.find(op.child) : _this.children(),		//获取滚动的列表
			    len   = _child.length,
				w     = _child.outerWidth(true);
			
			op.intervalTime = op.type ? 13 : op.intervalTime;
			
			//当列表的个数大于 要显示个数时才执行
			if( len > op.show ){
				
				//1.定位
				_child.css('position','absolute').each( function(){ 
					
					var	This = $(this);

					This.css( 'left', w*This.index() );

					//op.type ? '' : This.animate({ 'left': parseFloat(This.css('left')) - w },op.intervalSpeek);
					
					//console.log( parseFloat(This.css('left')))

				} );


				//2.滚动方式
				autoPlay();
				
				function autoPlay(){
					_this.auto = setInterval(function(){
						_child.each(function(){
							
							var	This = $(this),
								_left = parseFloat(This.css('left'));
						
							//console.log(_left)
							
							//当滚动完第一轮，切换位置
							if( _left <= -w*(len-op.show) ){
							
								This.css('left',w*op.show);
							
							}	
							
							op.type ? This.css('left', parseFloat( This.css('left') )-w*13/op.marqueeSpeek) :				//跑马灯滚动,需重新获取left值 parseFloat(_this.css('left'))
							
							This.animate({ 'left': parseFloat( This.css('left') ) - w },op.intervalSpeek);		//间隔滚动
							
						});

					},op.intervalTime);
				}

				_this.hover( function(){
		
					clearInterval(_this.auto);

				},function(){ 
				
					autoPlay();	
				
				});

			}
		}
	});

	$.fn.marquee.defaults = {
		child        : null,
		marqueeSpeek : 4000,
		intervalTime : 2500,
		intervalSpeek: 600,
		type     : true,
		show	 : 4
	};
})(jQuery);