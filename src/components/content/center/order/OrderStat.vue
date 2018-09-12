<template>
	<div>
		<div class="totalAmout">
			已完成订单总额： ￥{{totalAmouts}}
		</div>
		<div id="main" style="width: 600px;height:400px;"></div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderStat',
  data() {
  	return {
      totalAmouts: 0
  	}
  },
  mounted() {
    this.getData();
    var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
		    title: {
		    	left: 'center',
		      text: '已完成订单金额统计(正在开发中。。。)'
		    },
		    tooltip: {},
		    xAxis: {
		      data: ['七月', '八月', '九月']
		    },
		    yAxis: {},
		    series: [{
	        name: '金额',
	        type: 'line',
	        data: [15000, 16000, 15500]
		    }]
		});
	},
	methods: {
		getData() {
			axios.get('api/webOrder/findByStatus', {
        params: {
          status: 'ywc',
          page: 0,
          size: 9
        }
      })
      .then(this.completeSucc)
      .catch(this.completeFail)
		},
		completeSucc(res) {
			var that = this;
			var datas = res.data.obj;
			var result = [];
      datas.forEach(function(item, index, array) {
        that.totalAmouts += Number(item.price);
        if ( index === 0) {
        	result.push({
        		month: item.leaveTime.split("-")[1],
        		amount: Number(item.price)
        	})
        } else {
        	result.forEach(function(resultItem, resultIndex, self) {
            if (item.leaveTime.split("-")[1] === resultItem.month) {
            	result[resultIndex].amount += Number(item.price);
            } else if (!result.includes(item.leaveTime.split("-")[1])) {
            	result.push({
            		month: item.leaveTime.split("-")[1],
        		    amount: Number(item.price)
            	})
            }
        	})
        }
      });
      console.log(result);
      console.log(datas);
		},
		completeFail() {
			console.log('请求失败')
		}
	}
}
</script>

<style scoped>
.totalAmout {
	width: 300px;
	height: 200px;
	color: #fff;
	line-height: 200px;
	text-align: center;
	background-color: #4169E1;
	margin-top: 30px;
	margin-bottom: 30px;
}
.totalAmout:hover {
	background-color: #5B61D2;
}
</style>