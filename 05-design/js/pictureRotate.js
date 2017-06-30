/*
**@description:旋转木马式轮播图插件
**@author:hefeng
**@update:hefeng(2016-3-18 11:00)
*/
(function($){
	/*
	**pictureFade		 :旋转木马式轮播图插件, hover按钮列表带有延迟处理，该插件要用装有轮播图的容器对象使用;
	**@toggleObj		 :需要切换的列表名，		默认值 'null'， 类名需加上 '.';
	**@btnLeft/btnRight	 :是左右切换按钮，			默认值 'null',  类名需加上 '.';
	**@btnList			 :是对应切换图片的按钮列表，默认值 ‘null’,  类名需加上 '.'; 
	**@btnClass			 :当前按钮添加的Class，		默认值 ‘null’,  不需加上 '.'; 
	**@currentI			 :当前图片的序号，			默认值  0;		不需要写; 
	**@auto 			 :自动轮播的定时器			默认值 ‘null’	不需要写; 
	**@autoTime 		 :自动轮播的时间			默认值 3000	; 
	**@moveTime 		 :图片移动的时间			默认值 400	; 
	**用法				 :$('.box').pictureFade({option}),   toggleObj, btnClass,几个参数必须;
	*/
;	$.fn.extend({
			pictureRotate : function(option){
				var op		  = $.extend({}, $.fn.pictureRotate.defaults, option || {});
				var currentI  = 0;	/*当前图片序号*/
				var nextI	  = 0;	/*下图片序号*/
			//1. 初始化，让第一张图片显示，并实现自动播放
				autoPlay( op.autoTime );
				$( op.toggleObj ).css( 'display', 'none ');
				$( op.toggleObj ).eq( currentI ).css( {'left':'0', 'display' : 'block'});
				
			//2. 鼠标移到按钮列表，切换图片,同时停止自动播放
				if( op.btnList ){
					$( op.btnList ).hoverDelay(function(){ toggle( $(this) ) },function(){});				
				}
				$( this ) .hover( function(){ clearInterval( op.auto ) }, function(){ autoPlay( op.autoTime ) });
			//3. 点击左右按钮调用图片切换方法
				if( op.btnLeft && op.btnRight ){
					$( op.btnLeft  ).on('click', function(){ toggle( 1, -1 )});
					$( op.btnRight ).on('click', function(){ toggle( 2,  1 )});
				}
			//4. 实现图片切换方法
				//自动切换
				function autoPlay( time ){
					clearInterval( op.auto );
					op.auto = setInterval( function(){ toggle( 0, 1 ) }, time );
				};
			
				function toggle( btn, s ){
					//判断动画列表是否有动画
					if( !$(op.toggleObj).is(':animated')){
						//鼠标hover按钮执行的切换
						if( (typeof btn).toLowerCase() == 'object' ){
							nextI = btn.index();
							var c = currentI;					//当前图片序号
							var u = Math.abs(nextI - currentI); //当前图片与下张图片序号差值
							var b = [];							//存放将要进行移动的图片对象及序号
							for( var i = 0; i <= Math.abs(nextI - currentI); i++ ){
								if( nextI - currentI > 0 ) {
									$(op.toggleObj).eq( c ).css( {'left': (i*100)+'%', 'display' : 'block'} );
									b.push( {obj:$(op.toggleObj).eq( c ),num : u} );
									c++;
									c = c > $(op.toggleObj).length-1 ? 0 : c;
								}else{
									$(op.toggleObj).eq( c ).css( {'left': -(i*100)+'%', 'display' : 'block'} );
									b.push( {obj:$(op.toggleObj).eq( c ),num : -u} );
									c--;
									c = c < 0 ?  $(op.toggleObj).length-1 : c;
								}
								u--;
							}
							//给每个将要移动的图片执行动画
							$.each(b,function(i){
								b[i].obj.animate( { 'left' : -b[i].num*100+'%' } ,op.moveTime,function(){
									if( i < b.length-1 ){b[i].obj.css( 'display' , 'none' )};	
								});
							})
							currentI = nextI;
						//鼠标点击左右按钮执行的切换
						}else{
							if( btn ==1 ){
								nextI	 = currentI-1 < 0 ? $(op.toggleObj).length-1 : currentI-1; 
							}else if( btn ==2 || btn == 0 ){
								nextI	 = currentI+1 > $(op.toggleObj).length-1 ? 0 : currentI+1;
							}
							
							$(op.toggleObj).eq( nextI ).css( {'left': (s*100)+'%', 'display' : 'block'} );
							$(op.toggleObj).eq( nextI ).animate( { 'left' : 0 } ,op.moveTime);
							$(op.toggleObj).eq( currentI ).animate( { 'left' : -s*100+'%' } ,op.moveTime,function(){
								$(op.toggleObj).eq( currentI ).css( 'display' , 'none' );
								currentI = nextI;
							});	
						}
						if( op.btnClass ){
							$(op.btnList).eq(nextI).addClass( op.btnClass ).siblings().removeClass( op.btnClass );
						}
					}
				};
			},
			//hover延迟处理
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

		$.fn.pictureRotate.defaults = {
			toggleObj: null,
			btnLeft  : null,
			btnRight : null,
			btnList  : null,
			btnClass : null,
			auto	 : null,
			autoTime : 3000,
			moveTime : 400
		}
})(jQuery);