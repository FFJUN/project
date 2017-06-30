/*  子菜单显示隐藏   */
$('#_njl-detail .njl-items').each(function(){ 

	var _this = $(this),
		_sub = _this.find('.submenu');
	
	_sub.slideUp(0);
	

	_this.click(function(){
		
		var This = $(this);
		var _child = $(this).find('.submenu');

		if(This.hasClass('slideup')){
		
			_child.stop(true,true).slideUp(300,function(){
				
				This.removeClass('slideup');
			
			});
		
		}else{
		
			_child.stop(true,true).slideDown(300,function(){
			
				This.addClass('slideup');
			
			});
		
		}
	
	});
	
	_sub.click(function(e){ 
	
		e.stopPropagation();
	
	})
});


/*  文本输入框字数限制  */
$('#_textInput').on('input change', function(){

	var _val = $(this).val(),
		_len = $(this).val().length;
	
	
	
	if( _len > 200 ){
	
		$(this).val( _val.substr(0,200) );
	
		$('#_textLimit').text( 200 );

	}else{
	
		$('#_textLimit').text( _len );

	}
});


/*星星评分*/
$('#_starSelect .star').click(function(){

	var _star = $('#_starSelect .star'),
		_all = $('#_starSelect .star').length,
		_index = $(this).parent().index();
	
	
	
	if( _index == 0 && $('#_starSelect .star-selected').length == 1 ){
	
		$(this).removeClass('star-selected');
		
	}else{

		_star.removeClass('star-selected');

		for(var i = 0; i <= _index; i++){
		
			_star.eq(i).addClass('star-selected');
		
		}
	}

	var _num = $('#_starSelect .star-selected').length;
	
	$('#_starNum').val(_num);
});


/*预定 人数增减*/
$('#njl-order .menber-num').on('click', function(e){
	var _target = $(e.target);

	if( _target.is('a') ) {

		var _input = _target.siblings('input');
		var _val = _input.val();

		_target.is('.minus') ? _val-- : '';
		_target.is('.add') ? _val++ : '';

		_input.val( _val < 0 ? 0 : _val );

	}

});


/*最大数量限制*/
$('input[type=number]').on('input',function(){

	var _val = $(this).val();
	var _max = Number($(this).attr('max'));
	
	if( !_val.match(/^\d*$/) || _val == '' ){
	
		$(this).val( '' );
	
	}else if(_max){
		
		_val >= _max ? $(this).val(_max) : '';
		
	}

});