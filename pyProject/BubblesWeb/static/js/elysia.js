const btn1 = document.getElementById('story-1')
btn1.addEventListener('click', function(){
	const content=document.getElementById('modal-content')
	$.ajax({
		url: '/queryInfo',
		type: 'get',
		dataType: 'json',
		success: function(res){
			content.innerHTML = JSON.stringify(res.story1)
		}
	})
})

const btn2 = document.getElementById('story-2')
btn2.addEventListener('click', function(){
	const content=document.getElementById('modal-content')
	$.ajax({
		url: '/queryInfo',
		type: 'get',
		dataType: 'json',
		success: function(res){
			content.innerHTML = JSON.stringify(res.story2)
		}
	})
})

const btn3 = document.getElementById('story-3')
btn3.addEventListener('click', function(){
	const content=document.getElementById('modal-content')
	$.ajax({
		url: '/queryInfo',
		type: 'get',
		dataType: 'json',
		success: function(res){
			content.innerHTML = JSON.stringify(res.story3)
		}
	})
})

const btn4 = document.getElementById('story-4')
btn4.addEventListener('click', function(){
	const content=document.getElementById('modal-content')
	$.ajax({
		url: '/queryInfo',
		type: 'get',
		dataType: 'json',
		success: function(res){
			content.innerHTML = JSON.stringify(res.story4)
		}
	})
})

const btn5 = document.getElementById('story-5')
btn5.addEventListener('click', function(){
	const content=document.getElementById('modal-content')
	$.ajax({
		url: '/queryInfo',
		type: 'get',
		dataType: 'json',
		success: function(res){
			content.innerHTML = JSON.stringify(res.story5)
		}
	})
})