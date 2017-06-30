
/*抛物线运动*/
var funParabola=function(d,t,g){var i={speed:166.67,curvature:0.001,progress:function(){},complete:function(){}};var p={};g=g||{};for(var v in i){p[v]=g[v]||i[v]}var u={mark:function(){return this},position:function(){return this},move:function(){return this},init:function(){return this}};var e="margin",r=document.createElement("div");if("oninput" in r){["","ms","webkit"].forEach(function(b){var a=b+(b?"T":"t")+"ransform";if(a in r.style){e=a}})}var s=p.curvature,q=0,o=0;var k=true;if(d&&t&&d.nodeType==1&&t.nodeType==1){var n={},j={};var h={},m={};var f={},l={};u.mark=function(){if(k==false){return this}if(typeof f.x=="undefined"){this.position()}d.setAttribute("data-center",[f.x,f.y].join());t.setAttribute("data-center",[l.x,l.y].join());return this};u.position=function(){if(k==false){return this}var b=document.documentElement.scrollLeft||document.body.scrollLeft,a=document.documentElement.scrollTop||document.body.scrollTop;if(e=="margin"){d.style.marginLeft=d.style.marginTop="0px"}else{d.style[e]="translate(0, 0)"}n=d.getBoundingClientRect();j=t.getBoundingClientRect();h={x:n.left+(n.right-n.left)/2+b,y:n.top+(n.bottom-n.top)/2+a};m={x:j.left+(j.right-j.left)/2+b,y:j.top+(j.bottom-j.top)/2+a};f={x:0,y:0};l={x:-1*(h.x-m.x),y:-1*(h.y-m.y)};q=(l.y-s*l.x*l.x)/l.x;return this};u.move=function(){if(k==false){return this}var a=0,b=l.x>0?1:-1;var c=function(){var z=2*s*a+q;a=a+b*Math.sqrt(p.speed/(z*z+1));if((b==1&&a>l.x)||(b==-1&&a<l.x)){a=l.x}var w=a,A=s*w*w+q*w;d.setAttribute("data-center",[Math.round(w),Math.round(A)].join());if(e=="margin"){d.style.marginLeft=w+"px";d.style.marginTop=A+"px"}else{d.style[e]="translate("+[w+"px",A+"px"].join()+")"}if(a!==l.x){p.progress(w,A);window.requestAnimationFrame(c)}else{p.complete();k=true}};window.requestAnimationFrame(c);k=false;return this};u.init=function(){this.position().mark().move()}}return u};
/*! requestAnimationFrame.js
*/
(function(){var b=0;var c=["webkit","moz"];for(var a=0;a<c.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(h,e){var d=new Date().getTime();var f=Math.max(0,16.7-(d-b));var g=window.setTimeout(function(){h(d+f)},f);b=d+f;return g}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)}}}());


/*=================   购物车  ==================*/


//localStorage.clear()
//console.log(storage())

/*获取和保存localstorage*/
//返回的数据格式  ["{}","{}","{}"]
//data格式 "{}"
function storage(id, data, del){

	//data不存在 则获取所有信息
	if( !data && !id ){

		var goodsData = iLocalStorage.getItem('goodsData');

		if( goodsData ){

			//match加上g  才会返回所有匹配的子项的数组
			return goodsData.match(/{.*?}/g);

		}
	//data存在则 保存信息, del存在则删除信息
	}else{

		var getData = storage(),
		 	saveData, matchId, onedata, index;

		if( getData ){

			//查看存储里面是否已存在id,存在则覆盖，不存在则添加
			$.each(getData, function(i, ele){
				
				var cur = JSON.parse(ele);

				if( cur.id == id ){ 

					if( del ){ 
						index = i; 
					}else{
						onedata = cur;
						getData[i] = data;
						matchId = true; 
					}
				}

			} );

			//没有相同id  则追加存储
			if( !matchId ){
				getData.push( data );
			}

			//获取单条记录
			if( !data && !del ) return onedata;
			
			//删除单条记录
			if( del ) getData.splice(index, 1);

		}
		saveData = getData || [data];
	  	//storage(id, getData);
		iLocalStorage.setItem('goodsData', saveData);

	}
}

/*已选商品件数*/
function checkedNum(){
	var obj = $('#checkedList input[type=checkbox]');
	var _num = obj.filter(function(){
		return $(this).prop('checked');
	}).length;

	if (_num == 0) {
		$('#checkAll').prop('checked',false)
	}else if(_num == obj.length){
		$('#checkAll').prop('checked',true);
	}
	$('#checkedNum').text( _num );

}

/*购物车商品总数量*/
function checkedCarNum(){
	var _num = 0;

	$('#checkedList .checked-num span').each(function(){

		_num += parseInt($(this).text());

	});

	$('#buyCar em').text( _num );
}

/*价格计算*/
function priceCount(){

	var total = 0,
		  obj = $('#checkedList .total-price');
	
	obj.each(function() {

		if($(this).parents('tr').find('input').prop('checked')){

  		var preTotal = parseFloat( $(this).text().substr(1) );

  		total += preTotal;
	}
		//console.log(parseFloat( $(this).text().substr(1) ).toFixed(2))
	});

	$('#totalPrice').text( '¥'+total.toFixed(2) );


}

//点击改变购物车列表商品数量
function changeGoodsNum(){

	$('#checkedList .minus').off('click').click( function(){ change(this, 0) } );
	 $('#checkedList .plus').off('click').click( function(){ change(this, 1) } );
   $('#checkedList .delete').off('click').click( function(){ change(this, 2) } );

	function change(obj, flag){

		var numObj = $(obj).siblings('span');
		var parent = $(obj).parents('tr');
		var tolObj = parent.find('.total-price');
		var price  = parseFloat( parent.find('.price').text().substr(1) );
		var val    = Number(numObj.text());
		var tolNum = $('#buyCar em').text();
		var id     = parent.find('a[data-goods-id]').data('goods-id');

		if( flag == 2 ){
		 	
		 	//移除数据
		 	storage( id, null, true );
			parent.remove();
			checkedNum();
		}else{
		
			//根据id获取数据
			var goodsData = storage( id );

	  		flag ? val++ : val--;

	  		val = val < 1 ? 1 : val; 

	  		numObj.text(val);
	  		tolObj.text( '¥'+(val*price).toFixed(2) )
		}

		priceCount();
		checkedCarNum();
		
		if( goodsData ){

			goodsData.listnum = val;
			goodsData = JSON.stringify(goodsData);
			storage( id, goodsData );
		}
	}
	
}

/*购物车中, 选中或不选商品*/
function selectGoods(){
  	//全选
  	var cb = $('#checkedList input[type=checkbox]'); 
  	var _this = $('#checkAll');
  	var len = cb.length;

  	_this.off('click').click(function(){

  		cb.prop('checked', _this.prop('checked') );

  		checkedNum();
  		priceCount();

  	});

  	cb.off('click').click(function(){

  		var sl = cb.filter(function(){ return $(this).prop('checked'); }).length;

  		len == sl ? _this.prop('checked', true) :  _this.prop('checked', false);

  		checkedNum();
		priceCount();

  	});

}

/* 加入下载列表 */
+function(){

	var  listObj = $('#buyCar em'),
		 cList   = $('#checkedList'),
		 val, title, id, price, listnum, img, tprice;

	// 1.初始化购物车信息
	+function initCar(){
		if( storage() ){
			var goosData = storage();

			for(var i=0; i<goosData.length; i++){

				var data = JSON.parse(goosData[i]),
				
				id       = data.id,
				title    = data.title,
				img      = data.img,
				listnum  = data.listnum,
				price    = data.price,
				tprice   = data.tprice;

				cList.append( 
					'<tr>'
					+'<td><input type="checkbox" checked></td>'
					+'<td><a href="javascript:;" data-goods-id="'+id+'" title="'+title+'"><img src="'+img+'" width="60" height="60" /></a></td>'
					+'<td class="checked-num">'
					+'<a class="minus" href="javascript:;"></a>'
					+'<span>'+listnum+'</span>'
					+'<a class="plus" href="javascript:;"></a>'
					+'</td>'
					+'<td class="counts">'
					+'<a class="delete" href="javascript:;" title="删除"></a>'
					+'<span class="price">¥'+price+'</span>'
					+'<strong class="total-price">¥'+(price*listnum).toFixed(2)+'</strong>'
					+'</td>'
					+'</tr>');

				listnum += parseInt(data.listnum);

			}

			listObj.text(listnum);
		}
	}();

	//初始化购物车
	checkedNum();
	checkedCarNum();
	priceCount();
	changeGoodsNum();
	selectGoods();

	//2.添加抛物线运动
	$(".add-to-car").each(function(){
		var element = $(this).find('.moveicon')[0], 
		    target  = $("#buyCar")[0],
		
		title  = $(this).data('goods-title'),
		id     = $(this).data('goods-id'),
		price  = $(this).data('goods-price'),
		img    = $(this).find('img').prop('src'),
		tprice = 0,
		num    = 0; 
		
		//3.抛物线运动完成后
		function callback(){

			element.style.display="none";

			listnum += val;

			var gid = cList.find('a[data-goods-id]').filter(function(){

				return $(this).data('goods-id') == id;

			});

			if( gid.length > 0 ){
				var gobj = gid.parents('tr').find('.checked-num span');
				var tobj = gid.parents('tr').find('.total-price');

				num = gnum =  parseInt( gobj.text()) + val;
				tprice = (gnum*price).toFixed(2);

				gobj.text( gnum );
				tobj.text('¥'+ tprice );

			}else{
				//添加到购物车
				tprice = (val*price).toFixed(2);
				num = val;
				cList.append( 

					'<tr>'
					+'<td><input type="checkbox" checked></td>'
					+'<td><a href="javascript:;" data-goods-id="'+id+'" title="'+title+'"><img src="'+img+'" width="60" height="60" /></a></td>'
					+'<td class="checked-num">'
					+'<a class="minus" href="javascript:;"></a>'
					+'<span>'+val+'</span>'
					+'<a class="plus" href="javascript:;"></a>'
					+'</td>'
					+'<td class="counts">'
					+'<a class="delete" href="javascript:;" title="删除"></a>'
					+'<span class="price">¥'+price+'</span>'
					+'<strong class="total-price">¥'+tprice+'</strong>'
					+'</td>'
					+'</tr>'

				 );
			}

			checkedNum();
			priceCount();
			changeGoodsNum();
			selectGoods();
			/*checkedNum($('#checkedList input[type=checkbox]'));
  			priceCount($('#checkedList .total-price'));
  			changeGoodsNum($('#checkedList .minus'),$('#checkedList .plus'),$('#checkedList .delete'));
  			selectGoods($('#checkedList input[type=checkbox]'));
  		*/
  			//缓存到本地
  			var saveData = JSON.stringify({ 
  				id: String(id), 
  				title: title, 
  				listnum: String(num),
  				price: String(price), 
  				img: img 
  			});
  			//console.log(saveData)
  			storage( id, saveData );

  			//iLocalStorage.removeItem('goodsData');
			//增加列表数量
			listObj.text( listnum );

		}

		//4.抛物线运动的触发
		function tuchParabola(){
			//初始化位置
			var left = $(this).offset().left+60;
			var top  = $(this).offset().top - $(window).scrollTop();
			$(this).find('.moveicon').not('#fixedBar .moveicon').css({left: left, top: top});

			//console.log(left+':'+top)
			listnum = parseInt(listObj.text())
			val = parseInt($('#selectNum').val()) || 1;

			element.style.display="block";
		    element.style.marginLeft = "0px";
		    element.style.marginTop = "0px";
		    parabola.init();

		}

		//5.抛物线元素的的位置标记
		var parabola = funParabola(element, target,{speed:1200,curvature:0.001,complete:callback}).mark();

		$(this).click( tuchParabola );
	});
}();



 //购买列表展示、隐藏
 $('#buyCar').click(function(){

 	$(this).hasClass('active')
 	? $('.buy-sidebar').animate({'right':'-280px'},200) 
 	: $('.buy-sidebar').animate({'right':'0'},200) ;
 	
 	$(this).toggleClass('active');
 });
