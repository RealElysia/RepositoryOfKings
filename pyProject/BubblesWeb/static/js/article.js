function getArtId(button){
	var cardId = button.getAttribute('data-art-id')
	var cardHeader = 'card-header-'+cardId
	var card_id = document.getElementById(cardHeader)
	var art_id = card_id.textContent.trim();
	return art_id
}

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
	$.ajax({
		url: '/agree',
		type: 'post',
		data: JSON.stringify(data),
		contentType: 'application/json',
		dataType: 'json',
		success: function(res){
			$('#agree' + res.id).text(res.agree)
		}
	})
}

function artComment(button){
	var art_id = getArtId(button)
	var data = {artId: art_id}

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
			coms.forEach(item => {
				
				const div = document.createElement('div')
				div.innerHTML = `<span><strong>${item.name}</strong>添加评论:</span>
					<span>${item.comment}</span>
				`
				com.appendChild(div)
			})
			
		}
	})
}
