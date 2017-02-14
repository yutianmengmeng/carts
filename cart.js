new Vue({
	el:".container",
	data:{
		pro_list:[],
		checkAllFlag:false,
		totalMoney:0
	},
	mounted:function(){
		this.show();
	},
	filters:{
		"formateRMB":function(val){
			return "￥"+val.toFixed(2);
		}
	},
	methods:{
		show:function(){
			this.$http.get('data/cart.json').then(function(res){
				this.pro_list=res.data.result.productList;
			})
		},
		changeMoney:function(pro,way){
			if(way>0){
				pro.productQuentity++;
			}else{
				pro.productQuentity--;
				if(pro.productQuentity<1){
					pro.productQuentity=1;
				}
			}
			this.calcTotalPrice();
		},
		selectedpro:function(item){
			if(typeof item.checked == 'undefined'){
				//监听一个不存在的变量
				Vue.set(item,"checked",true);
				//this.$set()
			}else{
				item.checked=!item.checked;
			}
			this.calcTotalPrice();
		},
		checkAll: function(flag){
			this.checkAllFlag=flag;
			var that=this;
			this.pro_list.forEach(function(item,index){
				if(typeof item.checked=='undefined'){
					Vue.set(item,'checked',that.checkAllFlag);
				}else{
					item.checked=that.checkAllFlag;
				}
				});
			this.calcTotalPrice();
		},
		calcTotalPrice:function(){
			var that=this;
			this.totalMoney=0;
			this.pro_list.forEach(function(item,index){
				if(item.checked){
					that.totalMoney+=item.productPrice*item.productQuentity;
				}
			})
		}
	}
});