layui.use(function(){
	var lb = layui.carousel
	var layer = layui.layer;
	var util = layui.util;
	
	lb.render({
		elem:'#lb-ayaka',
		width: '840px',
		height: '480px',
		interval: 3000
	})
	
	util.on('lay-on', {
		'lb-1': function(){
			layer.tips('画师-pixiv@April', this,{tips: [1, '#00aaff']});
		},
		'lb-2': function(){
			layer.tips('画师-pixiv@Sherrya', this,{tips: [1, '#00aaff']});
		},
		'lb-3': function(){
			layer.tips('画师-miyoushe@椎名樱雪', this,{tips: [1, '#00aaff']});
		},
		'lb-4': function(){
			layer.tips('画师-pixiv@Lena@お仕事募集中', this,{tips: [1, '#00aaff']});
		},
		'lb-5': function(){
			layer.tips('baidu', this,{tips: [1, '#00aaff']});
		},
		'eyes':function(){
			layer.open({
				type: 1,
				title: '神之眼',
				area: ['600px', '600px'],
				content: `<p>好些年前，家中发生重大变故，重担落到了兄长绫人肩上。那时，绫华还不是如今这副成熟能干的模样。</p><p>她本是爱玩的孩子，并不懂得家族责任，更缺乏应对种种人物的手腕与经验。</p><p>但看着病床上的母亲与劳碌的兄长，绫华意识到：她非得成长起来不可。</p><p>于是她决定，首先拾起荒废许久的剑术与诗歌——这是身为贵族的基础修养，若能掌提此二者，她便算是面上过得去的神里家千金了，能代替兄长出席一些祭典之类的场合，为他分忧。</p><p>事实证明，绫华并非天赋异禀，也曾为诗歌背不下来、写字不够风雅、剑术毫无章法之类的事而苦恼。</p><p>她从未动摇过——一遍背不下来的诗就背五十遍，一遍写不好的字就练五十遍，一遍使不好的剑术就使五十遍。</p><p>「千般锤磨，素振亦无人可当。」——这是母亲告诉她的话。</p><p>母亲离世后，她不再是从前那个小绫华。如今的她，是神里绫华，将军御下三家之一，社奉行神里家的大小姐。</p><p>剑术训练成为了日常生活的一环，从开始那日延续至今，从未间断。</p><p>不知第多少天，绫华终于能做到一击退敌。霎时，道场内冰花凝结，道场正中，她的刀尖上挂着一枚如冰棱般璀璨的「神之眼」。</p><p>千般锤磨，素振亦无人可当，就连神明也为之动容。</p>`
			})
		}
	})
})

$(document).ready(function(){
	$('.layui-btn').click(function(){
		var c = $(this).data('content');
		$.ajax({
			url: '/queryAyaka',
			type: 'get',
			data: {count: c},
			dataType: 'json',
			success: function(res){
				layer.open({
					type: 1,
					title: '神里绫华角色故事' + c,
					content: res,
					area:['800px', '600px'],
					skin: 'layui-layer-win10'
				})
			}
		})
	})
})

layui.use('video', function(){
	var vd = layui.video
	
	vd.render({
		elem:'#genshin'
	})
})