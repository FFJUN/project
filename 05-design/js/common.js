/*
* 名称：本地存储函数
* 功能：兼容各大浏览器存储
* ie需要在本地服务器才有效
*/

/**
* LocalStorage 本地存储兼容函数
* getItem: 获取属性
* setItem: 设置属性
* removeItem: 删除属性
*
*
* @example
*
iLocalStorage.setItem('key', 'value');
console.log(iLocalStorage.getItem('key'));
iLocalStorage.removeItem('key');
*
*/

(function(window, document){

	// 1. IE7下的UserData对象
	var UserData = {
	userData: null,
	name: location.href,
	init: function(){
		// IE7下的初始化
		if(!UserData.userData){
			try{
				UserData.userData = document.createElement("INPUT");
				UserData.userData.type = "hidden";
				UserData.userData.style.display = "none";
				UserData.userData.addBehavior("#default#userData");
				document.body.appendChild(UserData.userData);
				var expires = new Date();
				expires.setDate(expires.getDate() + 365);
				UserData.userData.expires = expires.toUTCString();
			} catch(e){
				return false;
			}
		}
		return true;
	},
	setItem: function(key, value){
		if(UserData.init()){
			UserData.userData.load(UserData.name);
			UserData.userData.setAttribute(key, value);
			UserData.userData.save(UserData.name);
		}
	},
	getItem: function(key){
		if(UserData.init()){
			UserData.userData.load(UserData.name);
			return UserData.userData.getAttribute(key);
		}
	},
	removeItem: function(key){
			if(UserData.init()){
				UserData.userData.load(UserData.name);
				UserData.userData.removeAttribute(key);
				UserData.userData.save(UserData.name);
			}
		}
	};

	// 2. 兼容只支持globalStorage的浏览器
	// 使用： var storage = getLocalStorage();
	function getLocalStorage(){
		if(typeof localStorage == "object"){
			return localStorage;
		} else if(typeof globalStorage == "object"){
			return globalStorage[location.href];
		} else if(typeof userData == "object"){
			return globalStorage[location.href];
		} else{
			throw new Error("不支持本地存储");
		}
	}
	var storage = getLocalStorage();
	function iLocalStorage(){

	}
	// 高级浏览器的LocalStorage对象
	iLocalStorage.prototype = {
		setItem: function(key, value){
			if(!window.localStorage){
				UserData.setItem(key, value);
			}else{
				storage.setItem(key, value);
			}
		},
		getItem: function(key){
			if(!window.localStorage){
				return UserData.getItem(key);
			}else{
				return storage.getItem(key);
			}
		},
		removeItem: function(key){
			if(!window.localStorage){
				UserData.removeItem(key);
			}else{
				storage.removeItem(key);
			}
		}
	}

	if (typeof module == 'object') {
		module.exports = new iLocalStorage();
	}else {
		window.iLocalStorage = new iLocalStorage();
	}

})(window, document);


 /*IE低版本兼容playceholder*/
var hasPlaceholderSupport = function(){
	var attr = "placeholder";
	var input = document.createElement("input");
	return attr in input;
}
if( !hasPlaceholderSupport() ){
	jQuery('[placeholder]').focus(function() {
	  var input = jQuery(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = jQuery(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur().parents('form').submit(function() {
	  jQuery(this).find('[placeholder]').each(function() {
		var input = jQuery(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
}

/*按钮样式切换 tab*/
$('.tab .tab-items').click( function(){
	
	$(this).addClass('cur').siblings().removeClass('cur');

} );

/*下拉选项*/
$('.slide').on( 'click', function(e){
	
	e.stopPropagation();

	var _this = $(this),
		_menu = _this.find('.slide-menu');

	_menu.show();

	_menu.children().on('click',function(e){
	
		e.stopPropagation();

		_this.find('input').val( $(this).text() );

		_menu.hide();
	
	});

	

});

$('body').on('click',function(){

	$('.slide .slide-menu').hide();

} );


/*tab面板切换*/
$('[data-target]').each(function(){
	
	var _this  = $(this),
		_tar   = _this.data('target'),
		_obj   = $('#_'+_tar);

	_this.click(function(){

		_obj.siblings().filter(function(){
			
			return $(this).prop('id').indexOf('_') >= 0 ? true : false;

		}).hide();

		_obj.show();

	});

});



/*---模态框弹出---*/
$('[data-modal-frame]').each(function(){
	
	var _this  = $(this),
		_tar   = _this.data('modal-frame'),
		_obj   = $('#_'+_tar);
	
	_this.click(function(){

		callb( _this , _obj );
		_obj.fadeIn(300);

	});

	_obj.find('[data-close='+_tar+']').click(function(){
	
		_obj.fadeOut(300);

	});

	_obj.on( 'mousewheel',function(e){ e.preventDefault(); } );
});


//获取相关信息的回调
function callb( cur, target ){
	var info = cur.parents('.info-obj');

	if( info.length > 0 ){
		target.find('.upic').prop('src',cur.parents('.info-obj').find('.upic').prop('src'));
		target.find('.name').text(cur.parents('.info-obj').find('.name').text());
		target.find('.price em').text(cur.parents('.info-obj').find('.price').text());
	}

}

/*快速定位*/
if( $('[data-jump]').length > 0 ) {

	var _id = [];

	$('[data-jump]').each(function(){
	
		var _this  = $(this),
			_tar   = _this.data('jump'),
			_obj   = $('#_'+_tar),
			_h = _this.height();

		_id.push(_obj);

		_this.click(function(){

			$(window).scrollTop( _obj.offset().top - _h );

		});
	});

	$(window).scroll( function(){ 

		var _top = $(this).scrollTop();
	
		for(var i=0; i < _id.length; i++){

			var _nav = $('[data-jump='+_id[i].prop('id').substr(1)+']');

			if( _top > _id[i].offset().top - _nav.height()*5 ){ 
				
				_nav.addClass('cur').siblings().removeClass('cur');
			
			}

		}
		
		
	} );

	
}

/*返回顶部栏*/
$(window).resize(floatBar);
floatBar();
function floatBar(){ 

	if( $(window).width() > 1280 ){
	
		$('#floatSideBar').css('right', ($(window).width()-1200)/2 - 80 );
		
	}else{ 
	
		$('#floatSideBar').css('right', '20px');
	}

}

$('#floatSideBar').hover( function(){ 
	
	$(this).html('顶部');

},function(){
	
	$(this).html( '&#x' + $(this).data('icon') + ';');

});
$('#floatSideBar').click(function(){ 
	
	$(window).scrollTop(0);

});

$(window).scroll( function(){
		
	var _sideb = $('#floatSideBar');

	if( $(this).scrollTop() > 1000 ){

		_sideb.show();
	
	}else{
	
		_sideb.hide();	
	
	}

} );


/*鼠标进入,图片左/右移动*/
(function(){

	var _this = $('#_imgScroll'),
		_child= _this.children();
		len = _child.length,						//子元素个数
		l   = _this.width(),						//盒子总长
		onel= _this.children().eq(0).width();		//单个子元素长度
		p   = (l - onel)/(len-1);										//盒子间距

		_child.each( function(){ 
			
			var This = $(this),
				_index = This.index();
				
			This.data('move',false);				//判断是否已经移动过
			
			
			_index == 0 ? This.data('move',true) : '';
			_index == 1 ? This.css( 'left', onel ) : ''; 
			_index >  1 ? This.css( 'left', onel + (_index - 1) * p ) : '';

			
			This.hover( function(){

				if( !$(this).data('move') ){
					$(this).stop().animate({'left': p*_index},400,function(){ $(this).data('move',true) });
					$(this).prevAll().each(function(){
						var n = $(this).index();
						n > 0 ? $(this).stop().animate({'left': n*p},400,function(){ $(this).data('move',true) }) : '';
					});
	
				}else{
					
					$(this).nextAll().each(function(){
						var n = $(this).index();
						$(this).stop().animate({'left': onel+(n-1)*p},400,function(){ $(this).data('move',false) }) ;
					});
				}
			},function(){});
	
		} );
})();


/*列表定时向上滚动*/
;(function(){ 

	$('.scrollUp').each(function(){
		var _this = $(this),
			num = _this.children().length,
			h   = _this.children().eq(0).outerHeight(),
			i   = 0,	
			auto = null;

		autoPlay();
		function autoPlay(){
			auto = setInterval(function(){
				i++;
				i = i > num-3 ? 0 : i;

				_this.animate({'margin-top':-h*i});

			},2000);
		}
/*		_this.hover(function(){ 
			
			clearInterval( auto );
		
		},function(){ 
		
			autoPlay();

		});*/
	});
	
})();


/*条件筛选栏，超出一行时显示/隐藏*/
$('.filterbox .filterlist').each( function(){

	var _this = $(this),
		_a    = _this.find('.selection a'),
		_btn  = _this.find('.btn'),
		limit = 11
		
	_btn.on( 'selectstart' ,function(){ return false } )

	if( _a.length > limit ){
	
		_btn.html( '&#x'+_btn.data('icondown') );
		_btn.data('hide',true);
	}
	
	_btn.click(function(){
	
		if( _btn.data('hide') ){
		
			_this.css('height','auto');
			_btn.data('hide',false);
			_btn.html('&#x'+_btn.data('iconup'));
		
		}else{
			_this.css('height','28px');
			_btn.data('hide',true);
			_btn.html('&#x'+_btn.data('icondown'));
		}
	
	});
});


/*装修效果图乱序排列*/

var t_img; // 定时器
var isLoad = true; // 控制变量

// 判断图片加载的函数
function isImgLoad(obj,callback){
	
	// 查找所有封面图，迭代处理
	$(obj).each(function(){
		// 找到为0就将isLoad设为false，并退出each
		if(this.height === 0){
			isLoad = false;
			return false;
		}
	});
	
	// 为true，没有发现为0的。加载完毕
	if(isLoad){
		clearTimeout(t_img); // 清除定时器
		// 回调函数
		callback();
	// 为false，因为找到了没有加载完成的图，将调用定时器递归
	}else{
		isLoad = true;
		t_img = setTimeout(function(){
			isImgLoad(callback); // 递归扫描
		},500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
	}
	
}

if( $('#decoratePic').length > 0 ){

	isImgLoad('#decoratePic img',position);

	function position(){

		var arr=[[],[],[],[]];
		var hg=[[0],[0],[0],[0]];

		$('#decoratePic').css('position','relative').find('li').css('position','absolute');

		$('#decoratePic li').each( function(){
		//alert($('#decoratePic li').outerHeight(true))
			var _this  = $(this),
				_index = _this.index(),
				_left  = _index%4 * 305+'px',
				_h     = parseInt(_this.outerHeight(true));

			var s = hg[_index%4].reduce(function(a,b){ return a+b; });

			arr[_index%4].push( { sum: s ,msum: s+_h} );

			hg[_index%4].push( _h );

			$(this).css({'left':_left,'top':arr[_index%4][Math.floor(_index/4)].sum});
			
		} );
		//alert( arr[0][6] )
		var max = Math.max.apply(null,[arr[0][arr[0].length-1].msum,arr[1][arr[1].length-1].msum,arr[2][arr[2].length-1].msum,arr[3][arr[3].length-1].msum] );
		//alert(max)
		
		$('#decoratePic').height( max );
		
	}
}



/*装修效果图排行榜，图文切换*/
$('#rinkList li').hover( function(){
	$(this).siblings().find('.type-2').hide();
	$(this).siblings().find('.type-1').show();
	$(this).find('.type-1').hide();
	$(this).find('.type-2').show();
},function(){
	
});



/*装修效果图展示,图片适应窗口*/

$('.pic-show').on('selectstart',function(){ return false });

//小图
;+function(){
	var _obj = $('#picToggle .img-small-1'),
		len = _obj.find('li').length;
		l   = _obj.find('li').eq(0).outerWidth();
	
	$('#picToggle .img-small-1').width( len*l );
}();

//

$(window).resize(fitWindow);

fitWindow();

function fitWindow(){

	var _z = $('#picZoom');

	_z.height( $(window).height() - 215 );
	
	$('#picZoom img').each(function(){
		
		$(this).css('margin-top',-$(this).height()/2);

	});
}




//鼠标滚动切换图片
var _img = 0,
	_scroll = $('#picZoom li'),
	_little = $('#picToggle li'),
	_half   = 0;

$('#picZoom').on('mousewheel',function(e){
	e.stopPropagation();
	
	if( e.deltaY < 0 ){
		_img++;	
	}else{
		_img--;
	}

	imgScroll();
});



//左右按钮点击切换
$('.pic-show .btn-l,.pic-show .prev').on( 'click', function(){
	_img--;
	imgScroll();
} );
$('.pic-show .btn-r,.pic-show .next').on( 'click', function(){
	_img++;
	imgScroll();
});

_little.on('click',function(){
	_img = $(this).index();
	imgScroll();
});

function imgScroll(){
	var _w = $('#picToggle .inner li').outerWidth(),
		_num = parseInt($('#picToggle .inner').width()/_w/2);

	_img = _img > _scroll.length -1 ? _scroll.length -1 : _img ;
	_img = _img < 0 ? 0 : _img;

	_little.siblings().removeClass('cur');
	_little.eq(_img).addClass('cur');
	
	//小图移动
	(_img >= _num && _little.length - _img > _num ) ? _little.parent().css('left',-_w*(_img - _num)) : '';

	_half  = _scroll.eq( _img ).find('img').height()/2;

	_scroll.css('visibility','hidden').eq( _img ).css('visibility','visible').find('img').css('margin-top',-_half);
}






/*栏位固定*/
if( $('#fixedBar').length > 0 ){
	$(window).scroll( function(){
		var _fixed = $('#fixedBar');
		var _child = _fixed.find('.add-btn');
		var _sideb = $('#floatSideBar');

		if( $(this).scrollTop() > _fixed.parent().offset().top ){
		
			_fixed.css({'position':'fixed'});
			_child.length > 0 ? _child.show() : '';
		
		}else{
			
			_fixed.css({'position':'relative'});
			_child.length > 0 ? _child.hide() : '';

		}

		if( $(this).scrollTop() > 1000 ){
	
			_sideb.show();
		
		}else{
		
			_sideb.hide();	
		
		}

	} );

	
}



/*找设计师，打牌设计师列表滚动*/
+function(){

	var _box = $('#designerHot'),
		_move = _box.find('ul'),
		_btnl = _box.siblings('.btn-left'),
		_btnr = _box.siblings('.btn-right'),
		_len = _box.find('li').length,
		_w   = _box.find('li').outerWidth(true),
		_num = parseInt(_w * _len / _box.width()),
		_index = 0;

	_box.parent().on('selectstart',function(){ return false; })

	_move.width( _w * _len );

	_btnl.click( function(){ 
		_index--;
		_index = _index < 0 ? 0 : _index;
		_move.stop(true,true).animate({'left':-_index*_box.width()},600);
	} );

	_btnr.click( function(){ 
		_index++;
		_index = _index > _num ? _num : _index;
		_move.stop(true,true).animate({'left':-_index*_box.width()},600);
	
	} );
	

}();


/* 点赞 */
+function(){ 
	
	var _obj = $('#addLike');

	
		_obj.click( function(){
		
			var _this = $(this);

			if( _this.attr('rel') == 0 ){ 
			
				 _this.addClass('liked').text('已关注');
				 _this.attr('rel',1);
	
			}else{

				 _this.removeClass('cancle-like liked').text('关注');

				 _this.attr('rel',0);

			}

		})
		
		_obj.hover(function(){

			var _this = $(this);

			if( _this.attr('rel') == 1 ){

				_this.removeClass('liked').addClass('cancle-like').text('取消关注');

			}

		},function(){ 
			
			var _this = $(this);

			if(  _this.attr('rel') == 0 ){

				_this.removeClass('cancle-like').text('关注');
		
			}else{

				_this.removeClass('cancle-like').addClass('liked').text('已关注');

			}
		
		});

}();


/*  input文本提示  */

registCheck();

function registCheck(){
	var flag = false;
	var check = false;
	var obj = $('.register .regbox input,.register .regbox select');
	var wrong = ['&#xe024;&nbsp;请输入手机号码','&#xe024;&nbsp;请输入验证码','&#xe024;&nbsp;请输入登录密码','&#xe024;&nbsp;请选择身份类型','&#xe024;&nbsp;请输入名字'];
	
		
	obj.blur( function(){
	
		var _this = $(this);
		var _index = _this.parent('.regbox').index() - 1 ;

		if( _this.val() == '' ){
			
			_this.addClass('wrong');
			
			_this.siblings('.mes').html(wrong[_index]).css('color','red');

		}else{

			flag = true;

		}
		
		submit();	

	} );

	obj.focus( function(){ 
		var _this = $(this);
		_this.removeClass('wrong');
		_this.siblings('.mes').html('');
	} );

	$('.register .check input').change(submit);


	$('.register .regbox select').change( function(){
	
		if( $(this).val() == '业主' ){
		
			$('.register .regbox .nike').text('昵　　称：');

		}else{

			$('.register .regbox .nike').text('真实姓名：');

		}

	
	} );

	function submit(){
	
		obj.each( function(){ 
			
			if( $(this).val() == '' ) flag = false;
			
		} );
		
		if( flag && $('.register .check input').prop('checked')  ){
			check = true;
			//$('#regForm').submit(function(){return true});
			
		}else{
			
				check = false;
			//$('#regForm').submit(function(){return false});
		
		}
	
	}

	$('#regForm').submit( function(){ 
	
		return check;
	
	} );
	

	$('#regBtn').click( function(){ 
	
		obj.each( function(){
			var _this = $(this);
				_index = _this.parent('.regbox').index() - 1 ;

			if( _this.val() == '' ){
				
				_this.addClass('wrong');
				
				_this.siblings('.mes').html(wrong[_index]).css('color','red');

				return false;

			}
		})	
	} );


};

/* 商品详情页 购买数量 */
	$('.buy-num').on('selectstart',function(){return false;});
	$('#addnum').click( function(){ numChange( this, true ); } );
	$('#movenum').click( function(){ numChange( this, false ); } );
	$('#addnum').siblings('input').on( 'input change', inputLimit );

	function numChange( obj, num ){
		

		var _this  = $(obj),
			_input = $(obj).siblings('input'),
			_val   = _input.val();

		num ? _val++ : _val--;

		_val < 1 ? _val = 1 : _val;

		_input.val( _val );
		

	}

	 function inputLimit(){
		
		var _val = $(this).val();

		if( !_val.toString().match(/^\d+$/) || _val < 1 ){

			$(this).val( 1 );

		}else{
			
			$(this).val( parseInt( _val ) );

		}
	}

 /*商品详情页- 图片预览*/
 ;+function(){

 	//小图切换
 	$('#imgSmall img').hover(function(){

 		var _src = $(this).prop('src');

 		$('#imgShow img, .add-to-car img').prop('src',_src);

 		$(this).addClass('cur').siblings().removeClass('cur');

 	});

 	//大图展示
 	$('#imgShow').on( 'mousemove', function(e){
		var bar 	= $(this).find('.imgbar'),
			big     = $(this).find('.big-pic'),
			barw    = bar.width(),				//蒙版宽度
			barh    = bar.height(),				//蒙版高度
			showw   = $(this).width(),			//固定大图片的宽度
			showh   = $(this).height(),			//固定大图片的高度
			showl   = $(this).offset().left,
			showt   = $(this).offset().top,
			x       = e.pageX - showl,
			y       = e.pageY - showt,
			left    = x - barw/2,
			top     = y - barh/2,
			radw    = barw/showw,					//蒙版跟固定大图的宽度比
			radh    = barh/showh;					//蒙版跟固定大图的高度比
			
		/*console.log( x +':'+ y);*/

		left = left < 0 ? 0 : left;
		left = left > showw - barw ? showw - barw : left;
		top = top < 0 ? 0 : top;
		top = top > showh - barh ? showh - barh : top;
			
		bar.css({'left' : left, 'top': top });
		big.find('img').css({'left' : -left/radw, 'top' : -top/radh});

		bar.show();
		big.show();

 	});

 	$('#imgShow').on( 'mouseout', function(){
 		$('#imgShow .imgbar,#imgShow .big-pic').hide();
 	});

 }();

 //评论列表图片放大
 $('#_cmtList li img').click(function(){

 	var _this = $(this);
 	

 	if( !_this.hasClass('show') ){
 		_this.css({'width': 'auto', 'height': 'auto'});
 		_this.addClass('show');
 	}else{
 		_this.css({'width': '40px', 'height': '40px'});
 		_this.removeClass('show');
 	}

 	$('#_cmtList li img').not(_this).css({'width' : '40px', 'height':' 40px'}).removeClass('show');
 });


 


