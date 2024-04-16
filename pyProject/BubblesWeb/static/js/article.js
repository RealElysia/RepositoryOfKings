function getArtId(button){
	var cardId = button.getAttribute('data-art-id')
	var cardHeader = 'card-header-'+cardId
	var card_id = document.getElementById(cardHeader)
	var art_id = card_id.textContent.trim();
	return art_id
}
var flag = false // 限制请求发送

function changeStyle(button) {
    // 移除原来的类名
    button.classList.remove('layui-btn-primary');
    button.classList.remove('layui-border-blue');
        
    // 添加新的类名
    button.classList.add('layui-bg-blue');
	var art_id = getArtId(button)
	var a = parseInt($('#agree').text())
	// 发送数据
	var data = {agree: a, artId: art_id}
	
	if(!flag){
		flag = true
		$.ajax({
			url: '/agree',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res){
				$('#agree' + res.id).text(res.agree)
			},
			complete: function(){
				flag = false
			}
		})
	}	
}

function queryComment(button){
	var art_id = getArtId(button)
	var data = {artId: art_id}
	
	if(!flag){
		flag = true
		$.ajax({
			url: '/queryComment',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res){
				const com = document.getElementById('comments-'+res.id)
				$('#comments').empty()
				var coms = res.comments
				if (coms){
					coms.forEach(item => {
						const div = document.createElement('div')
						div.innerHTML = `<span><strong>${item.name}</strong>添加评论:</span>
							<span>${item.comment}</span><hr/>`
						com.appendChild(div)
					})
				}
				
			},
			complete: function(){
				flag = false
			}
		})
	}	
}


function commentSubmit(button){
	var artId = getArtId(button)
	var userCom = document.getElementById('user-comment').value
	var data = {artId: artId, comment: userCom}
	
	$.ajax({
		url: '/commentSubmit',
		type: 'post',
		data: JSON.stringify(data),
		contentType: 'application/json',
		dataType: 'json',
		success: function(res){
			if(res.success==true){
				// window.location.reload()
			}
		}
	})
}

function addArtical(){
	window.open('http://127.0.0.1:5000/note', '_blank')
}
