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
	                const card = document.getElementById('card')
	                resp.items.forEach(item => {
	                	const col = document.createElement('div')
	                	col.className = 'col-md-4 mb-4'
	                	col.innerHTML = `<div class="card h-100">
	                		  <div class="row g-0">
	                			<div class="col-md-6">
	                			  <div class="card-body">
	                				<h5 class="card-title">${item.name}</h5>
									<p class="card-text">编号：${item.id}</p>
	                				<p class="card-text">品牌：${item.brand}</p>
	                				<p class="card-text">类型：${item.type}</p>
	                				<p class="card-text">价格：¥${item.price}</p>
	                				<p class="card-text">销量：${item.sales}</p>
	                				<p class="card-text">库存：${item.inventory}</p>
	                			  </div>
	                			</div>
	                			<div class="col-md-5" style="margin-top: 80px; margin-left: 20px;">
	                			  <img src="../static/user/${item.pic_name}" class="img-fluid rounded-start" alt="${item.name}">
	                			</div>
	                		  </div>
	                		</div>`;
	                card.appendChild(col);
	                })
	            }
	        });
	    });
	});

// 按名称搜索查询
const sh = document.getElementById('search')
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
					const card = document.getElementById('card')
					resp.items.forEach(item => {
						const col = document.createElement('div')
						col.className = 'col-md-4 mb-4'
						col.innerHTML = `<div class="card h-100">
							  <div class="row g-0">
								<div class="col-md-6">
								  <div class="card-body">
									<h5 class="card-title">${item.name}</h5>
									<p class="card-text">编号：${item.id}</p>
									<p class="card-text">品牌：${item.brand}</p>
									<p class="card-text">类型：${item.type}</p>
									<p class="card-text">价格：¥${item.price}</p>
									<p class="card-text">销量：${item.sales}</p>
									<p class="card-text">库存：${item.inventory}</p>
								  </div>
								</div>
								<div class="col-md-5" style="margin-top: 80px; margin-left: 20px;">
								  <img src="../static/user/${item.pic_name}" class="img-fluid rounded-start" alt="${item.name}">
								</div>
							  </div>
							</div>`;
					card.appendChild(col);
					})
				}
			})
		}else{
			alert('仅支持商品名字模糊搜索，请重试！')
		}
	})
// 添加宝贝
const fm1 = document.getElementById('addItem')

fm1.addEventListener('submit', function(e){
	e.preventDefault()
	var fd = new FormData()
	fd.append('image', $('#pic')[0].files[0])
	fd.append('brand', $('#brand').val())
	fd.append('type',  $('#type').val())
	fd.append('price',  $('#price').val())
	fd.append('inventory',  $('#inv').val())
	fd.append('name',  $('#name').val())

	$.ajax({
		url: '/addItem',
		data: fd,
		type: 'post',
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function(resp){
			if (resp.code == 0){
				alert('添加完成！')
				window.location.reload();
			}
		}
	}) 
})
// 修改宝贝
const btn2 = document.getElementById('btnUpdate')
	
	btn2.addEventListener('click', function(e){
		e.preventDefault()
		$.ajax({
			url: '/queryAll',
			dataType: 'json',
			type: 'get',
			success: function(resp){
				
				const div = document.getElementById('qAll')
				$('#qAll').empty()
				resp.items.forEach(item => {
					const ndiv = document.createElement('div')
					ndiv.className = 'mb-4'
					ndiv.innerHTML = ` 
					<div class="form-check">
						<input type="radio" class="form-check-input" name="old_item" value="${item.id}" onclick="updateAttr(this)">
						<label class="form-check-label" for="old_id">${item.id}-${item.name}</label>
					</div>`
					div.appendChild(ndiv)
				}) 
			}
		})
	})

	function updateAttr(radio){
		var radios = document.getElementsByName(radio.name)
		for(var i=0; i<radios.length; i++){
			radios[i].removeAttribute('id')
		}

		if (radio.checked){
			radio.setAttribute('id', 'old_id')
		}
	}

	$(document).ready(function(){
		const form = document.getElementById('fm2')

		form.addEventListener('submit', function(e){
			e.preventDefault()
			
			var id = document.getElementById('old_id').value
			var data = {id: id}
			$.ajax({
				url: '/queryById',
				dataType: 'json',
				type: 'post',
				data: data,
				success: function(resp){
					var it = resp.items

					const fm3 = document.getElementById('new_form')

					$('#new_form').empty()

					const div = document.createElement('div')
					div.className = 'mb-4'
					div.innerHTML = `
							<div class="mb-3">
								<label for="new_id" class="form-label">宝贝编号：</label>
								<span class="form-control" id="new_id">${it.id}</span>
							</div>
							<div class="mb-3">
								<label for="new_name" class="form-label">宝贝名：</label>
								<input type="text" class="form-control" id="new_name" name="new_name" value="${it.name}" required />
							</div>
							<div class="mb-3">
								<label for="new_brand" class="form-label">宝贝品牌：</label>
									<select class="form-select" id="new_brand" name="new_brand">
										<option value="">请选择品牌</option>
										<option value="xiaomi">小米</option>
										<option value="huawei">华为</option>
										<option value="iphone">苹果</option>
										<option value="oppo">OPPO</option>
									</select>
							</div>
							<div class="mb-3">
								<label for="new_type" class="form-label">宝贝类型：</label>
								<select class="form-select" id="new_type" name="new_type">
									<option value="">请选择类型</option>
									<option	value="手机">手机</option>
									<option value="电脑">电脑</option>
									<option value="ipad">iPad</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="new_price" class="form-label">宝贝价格：</label>
								<input type="text" class="form-control" id="new_price" name="new_price" />
							</div>
							<div class="mb-3">
								<label for="new_inv" class="form-label">宝贝数量：</label>
								<input type="text" class="form-control" id="new_inv" name="new_inventory" />
							</div>
							<div class="mb-3">
								<label for="new_sales" class="form-label">宝贝销量：</label>
								<input type="text" class="form-control" id="new_sales" name="new_sales" />
							</div>
							<div class="mb-3">
								<label for="new_picture" class="form-label">宝贝图片：</label>
								<input type="file" name="picture" id="new_picture" class="form-control" />
								<span>图片名称中不可带中文字符</span>
							</div>
							<div class="mb-3">
								<button type="submit" id="btn_new" class="btn btn-outline-primary">确认修改</button>
							</div>`
					fm3.appendChild(div)
				}
			})
		})
	})

	$(document).ready(function(){
		const newform = document.getElementById('new_form')

		newform.addEventListener('submit', function(e){
			e.preventDefault()

			var data = new FormData()
			var nid = document.getElementById('new_id').innerText
			data.append('id', nid)
			data.append('name', $("#new_name").val())
			data.append('type', $("#new_type").val())
			data.append('brand', $("#new_brand").val())
			data.append('price', $("#new_price").val())
			data.append('inventory', $("#new_inv").val())
			data.append('sales', $("#new_sales").val())
			data.append('picName', $("#new_picture")[0].files[0])

			$.ajax({
				url: '/update',
				type: 'post',
				data: data,
				contentType: false,
				processData: false,
				dataType: 'json',
				success: function(resp){
					alert(resp.msg)
					window.location.reload()
				}
			})
		})
	})
// 删除宝贝
const del_btn = document.getElementById('btn_del')
	
	del_btn.addEventListener('click', function(e){
		e.preventDefault()
		$.ajax({
			url: '/queryAll',
			dataType: 'json',
			type: 'get',
			success: function(resp){
				
				const div = document.getElementById('del_div')
				$('#del_div').empty()
				resp.items.forEach(item => {
					const ndiv = document.createElement('div')
					ndiv.className = 'mb-4'
					ndiv.innerHTML = ` 
					<div class="form-check">
						<input type="checkbox" class="form-check-input" name="del_item" value="${item.id}">
						<label class="form-check-label" for="del_id">${item.id}-${item.name}</label>
					</div>`
					div.appendChild(ndiv)
				}) 
			}
		})
	})

	$(document).ready(function(){
		const fdel = document.getElementById('del_form')

		fdel.addEventListener('submit', function(e){
			e.preventDefault()

			// 获取所有要删除的值
			var delData = []
			var data = {}

			var boxs = document.getElementsByName('del_item')
			for(var i=0; i<boxs.length; i++){
				if(boxs[i].checked){
					delData.push(boxs[i].value)
				}
			}

			data['items'] = delData
			console.log(data)

			$.ajax({
				url: '/del',
				contentType: 'application/json',
				data: JSON.stringify(data),
				type: 'post',
				dataType: 'json',
				success: function(resp){
					alert(resp.msg)
					window.location.reload()
				}
			})
		})
	})