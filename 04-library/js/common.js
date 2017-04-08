
/*按钮样式切换 tab*/
$('.tab .tab-items').click( function(){
	
	$(this).addClass('cur').siblings().removeClass('cur');

} );

/*label文本提示*/
$('label[for]').each( function(){

	var _this  = $(this),
		_tips  = _this.text(),
		_input = _this.prop('for');
	
	//_this.data('tips', _tips);
	
	$('#'+_input).on( 'input keyup', function(){

		if ($(this).val() == ''){
			_this.text( _tips );
			_this.css('width' ,'100%');
		}else{
			_this.text('');
			_this.css( 'width','0' );
		}

	} );
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


/*弹窗*/
$('[data-target]').each(function(){
	
	var _this  = $(this),
		_tar   = _this.data('target'),
		_obj   = $('#_'+_tar);

	_this.click(function(){

		_obj.siblings().filter(function(){
			
			return $(this).prop('id').indexOf('_') >= 0 ? true : false;

		}).hide();

		_obj.fadeIn(300);

	});

	_obj.find('.close').click(function(){
	
		_obj.fadeOut(300);

	});
});


/*切换显示页面*/
$('[data-nextp]').on('click',function(){ 

	togglePage( this, 'nextp' );

});
$('[data-prep]').on('click',function(){ 

	togglePage( this, 'prep' );

});

function togglePage( obj, dire ){
	
	var _id =$( '#_' + $(obj).data(dire) ),
	
		_index = _id.children('.cur').index(),
			
		_len   = _id.children().length;

	dire == 'nextp' ? _index++ : '';
	dire == 'prep' ? _index-- : '';
	
	_index = _index < 0 ? _len-1 : _index;
	_index = _index > _len-1  ? 0 : _index;

	_id.children().removeClass('cur');
	_id.children().eq( _index ).addClass('cur');
}

/*返回顶部*/
$('.to-top').click( function(){
	
	$(window).scrollTop(0);

} );


/*点赞*/
$('.lby-plan .icon-1').on('click',function(){
	
	var _this = $(this);

	if( !_this.hasClass('like') ){
		
		_this.addClass('like').prop('title','取消点赞');
	
	}else{
		_this.removeClass('like').prop('title','点赞');
	}

});

/*字数限制-公告页*/
$('.noticebox dd p').each(function(){

	var _this = $(this),
		_all = _this.html();
		
		_all.length > 78 ? _this.html( _all.substr(0,78)+'...' ) : '';
});
	

