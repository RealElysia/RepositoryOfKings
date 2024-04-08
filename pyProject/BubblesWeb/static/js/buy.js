// 分类查询宝贝
$(document).ready(function() {
	    // 给每个带有 data-type 属性的 a 标签绑定点击事件
	    $('a[data-type]').click(function(e) {
	        e.preventDefault();  // 防止a标签的默认点击行为
	        
	        var dataType = $(this).data('type');  // 获取点击链接的data-type值
	        // 发起Ajax GET请求
	        $.ajax({
	            url: '/queryByType', // 你的数据查询端点URL
	            type: 'GET',
	            data: { type: dataType }, // 发送到服务器的数据
	            dataType: 'json',
	            success: function(resp) {
	                // 清空卡片
	                $('#card').empty()
	                // 写入搜索后返回的
	                const new_card = document.getElementById('card')
	                resp.items.forEach(item => {
	                	const col = document.createElement('div')
	                	col.className = 'col-md-4 mb-4'
	                	col.innerHTML = `<div class="card h-100">
	                		<div class="row g-0">
	                			<div class="col-md-6">
	                			  <div class="card-body">
	                				<h5 class="card-title"><span class="itemName">${item.name}</span></h5>
	                				<p class="card-text">编号：<span class="itemId">${item.id}</span></p>
	                				<p class="card-text">品牌：<span class="itemBrand">${item.brand}</span></p>
	                				<p class="card-text">类型：<span class="itemType">${item.type}</span></p>
	                				<p class="card-text">价格：¥<span class="itemPrice">${item.price}</span></p>
	                				<p class="card-text">销量：<span class="itemSales">${item.sales}</span></p>
	                				<p class="card-text">库存：<span class="iteminventory">${item.inventory}</span></p>
	                			  </div>
	                			</div>
	                			<div class="col-md-4" style="margin-top: 80px; margin-left: 20px;">
	                			  <img src="../static/user/${item.pic_name}" class="img-fluid rounded-start" alt="${item.name}">
	                			</div>
	                		  </div>
							  <div class="btn-group">
							  	<button type="button" class="btn btn-outline-primary addToCart">
							  		<i class="fas fa-shopping-cart">加入购物车</i>
							  	</button>
							  	<button type="button" class="btn btn-outline-primary buyNow" data-bs-toggle="modal" data-bs-target="#buyModal">
							  		<i class="fas fa-wallet">立即购买</i>
							  	</button>
							  </div>
	                		</div>
							`;
	                new_card.appendChild(col);
	                })
	            }
	        });
	    });
	});

// 按名称搜索查询
const sh = document.getElementById('search')
$(document).ready(function() {
	sh.addEventListener('submit', function(event){
		
		var p = document.getElementById('sitem').value;
		var data = {param: p}
		
		event.preventDefault()
		
		if(p!=null || p!=''){
			$.ajax({
				url: '/queryByName',
				data: data,
				dataType: 'json',
				type: 'post',
				success:function(resp){
					// 清空卡片
					$('#card').empty()
					// 写入搜索后返回的
					const new_card = document.getElementById('card')
					resp.items.forEach(item => {
						const col = document.createElement('div')
						col.className = 'col-md-4 mb-4'
						col.innerHTML = `<div class="card h-100">
							<div class="row g-0">
								<div class="col-md-6">
								  <div class="card-body">
									<h5 class="card-title"><span class="itemName">${item.name}</span></h5>
									<p class="card-text">编号：<span class="itemId">${item.id}</span></p>
									<p class="card-text">品牌：<span class="itemBrand">${item.brand}</span></p>
									<p class="card-text">类型：<span class="itemType">${item.type}</span></p>
									<p class="card-text">价格：¥<span class="itemPrice">${item.price}</span></p>
									<p class="card-text">销量：<span class="itemSales">${item.sales}</span></p>
									<p class="card-text">库存：<span class="iteminventory">${item.inventory}</span></p>
								  </div>
								</div>
								<div class="col-md-4" style="margin-top: 80px; margin-left: 20px;">
								  <img src="../static/user/${item.pic_name}" class="img-fluid rounded-start" alt="${item.name}">
								</div>
							  </div>
							  <div class="btn-group">
							  	<button type="button" class="btn btn-outline-primary addToCart">
							  		<i class="fas fa-shopping-cart">加入购物车</i>
							  	</button>
							  	<button type="button" class="btn btn-outline-primary buyNow" data-bs-toggle="modal" data-bs-target="#buyModal">
							  		<i class="fas fa-wallet">立即购买</i>
							  	</button>
							  </div>
							</div>
							`;
					new_card.appendChild(col);
					})
				}
			})
		}else{
			alert('仅支持商品名字模糊搜索，请重试！')
		}
	})
})
	
$(document).ready(function(){
	let cart = []
	
	// 加入购物车点击事件
	$('#card').on('click', '.addToCart', function(){
		const card = $(this).closest('.card')
		const itemInfo = {
			id: card.find('.itemId').text(),
			name: card.find('.itemName').text(),
			brand: card.find('.itemBrand').text(),
			type: card.find('.itemType').text(),
			price: card.find('.itemPrice').text(),
			sales: card.find('.itemSales').text(),
			inventory: card.find('.iteminventory').text()
		}
		if(parseInt(itemInfo.inventory)==0){
			alert('抱歉，该商品售空！请等待补货')
			return
		}
		cart.push(itemInfo);
		updateCart()
	})
	// 底部结算栏更新
	function updateCart(){
		let total = 0;
		let prices = 0;
		
		cart.forEach(item => {
			total += 1;
			prices += parseFloat(item.price);
			
		})
		$('#prices').text(prices.toFixed(2))
		$('#count').text(total)
	}
	// 立即购买点击事件
	$('.buyNow').click(function(){
		const card = $(this).closest('.card')
		const modal = $('#buyModal .modal-body')
		modal.empty()
		
		const itemInfo = {
			id: card.find('.itemId').text(),
			name: card.find('.itemName').text(),
			brand: card.find('.itemBrand').text(),
			type: card.find('.itemType').text(),
			price: parseFloat(card.find('.itemPrice').text()),
			sales: parseInt(card.find('.itemSales').text()),
			inventory: parseInt(card.find('.iteminventory').text()),
		}
		
		const div = document.getElementById('payNow')
		const form = document.createElement('form')
		form.id = 'buy_now'
		form.innerHTML = `<h5 class="card-title"><span class="itemName">${itemInfo.name}</span></h5>
							<p class="card-text">编号：<span class="itemId">${itemInfo.id}</span></p>
							<p class="card-text">品牌：<span class="itemBrand">${itemInfo.brand}</span></p>
							<p class="card-text">类型：<span class="itemType">${itemInfo.type}</span></p>
							<p class="card-text">价格：¥<span class="itemPrice">${itemInfo.price}</span></p>
							<p class="card-text">销量：<span class="itemSales">${itemInfo.sales}</span></p>
							<p class="card-text">库存：<span class="iteminventory">${itemInfo.inventory}</span></p>
							<button type="submit" class="btn btn-outline-primary">立即支付</button>
							`
		div.appendChild(form)
		
		const buy = document.getElementById('buy_now')
		
		
		buy.addEventListener('submit', function(e){
			e.preventDefault()
			$.ajax({
				url: '/payNow',
				data: itemInfo,
				dataType: 'json',
				type: 'post',
				success: function(resp){
					alert(resp.msg)
					window.location.reload()
				}
			})
		})
	})
	// 购物车详情展示
	$('#define').on('shown.bs.modal', function(){
		const order = $(this).find('.modal-body')
		const qing = document.getElementById('pay_null')
		
		order.empty()
		cart.forEach(it => {
			order.append(`<p>${it.name}--￥${it.price}元</p>`)
			
		})
		if(cart.length == 0){
			order.append(`<p><strong>空空如也</strong></p>`)
		}
		order.append(`<button class="btn btn-primary" id="pay_btn" style="margin-left: 300px;">提交支付</button>`)
		const pay_btn = document.getElementById('pay_btn')
		
		pay_btn.addEventListener('click', function(e){
			e.preventDefault()
			
			$.ajax({
				url: '/cartPay',
				data: JSON.stringify(cart),
				type: 'post',
				contentType: 'application/json',
				dataType: 'json',
				success: function(resp){
					alert(resp.msg)
					window.location.reload()
				}
			})
		})
	})
	
})

$(document).ready(function(){
	const c = document.getElementById('cform')
	c.addEventListener('submit', function(e){
		e.preventDefault()
		var data = {userChange: $('#change').val()}
		$.ajax({
			url: '/userRecharge',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function(resp){
				alert(resp.msg)
				window.location.reload()
			}
		})
	})
})