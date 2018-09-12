<template>
  <div class="houseSearchWrapper">
  	<div class="formWrapper">
			<form class="form-inline">
			  <div class="form-group">
			    <label for="liveDate" class="liveDateLabel">入住时间:</label>
			    <input type="date" id="liveDate" v-model="liveTime"/>
			  </div>
			  <div class="form-group">
			    <label for="leaveDate" class="leaveDateLabel">离开时间:</label>
			    <input type="date" id="leaveDate" v-model="leaveTime"/>
			  </div>
			</form>
			<button class="btn btn-primary searchBtn" @click="searchByTime">房源查询</button>
		</div>
		<div
		  class="wrapper"
		  v-if="houseInfo !== ''"
		>
		  <div
		    class="house"
		    v-for="item of houseInfo"
		    :id="item.id"
		    @click="toHouseDetail"
		  >
		  	<img class="houseImg" :src="item.img">
		  	<p class="mb-0 houseName">房源名称： {{item.name}}</p>
		  	<p class="mb-0 houseDesc">
		  		房源简述：{{item.roomNum}}室 | {{item.acreage}}㎡
		  		<span v-if="item.orders && item.orders.length" class="hasOrder">此房源含订单</span>
		  	</p>
		  	<p class="housePrice">房价：￥{{item.price}}</p>
		  </div>
		</div>
    <!-- 分页按钮 -->
    <div v-if="totalPages > 1" class="dividePageBtn">
      <div class="btn-group" role="group" aria-label="First group">
        <button type="button" class="btn btn-default" @click="goPrePage">上一页</button>
        <button type="button" class="btn btn-default">{{pageNow}}</button>
        <button type="button" class="btn btn-default" @click="goNextPage">下一页</button>
        <button type="button" class="btn btn-default">共 {{totalPages}} 页</button>
      </div>
      <div class="page-input-wrapper">
        到第<input type="text" class="page-input" v-model="pageNow" />页
        <button type="button" class="btn btn-primary confirmBtn"  @click="goSelectPage">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'HouseSearch',
  data() {
  	return {
      houseInfo: '',
      liveTime: '',
      leaveTime: '',
      pageNow: 1,
      totalPages: 0,
  	}
  },
  mounted() {
  	this.houseSearch();
  },
  methods: {
  	houseSearch() {
      axios.get('/webHouse/findAll', {
      params: {
        page: 0,
        size: 8
      }
    })
    .then(this.houseSearchSucc)
    .catch(this.houseSearchFail)
  	},
  	houseSearchSucc(res) {
      this.houseInfo = res.data.obj;
      this.totalPages = res.data.obj[0].totalPage;
  	},
  	houseSearchFail() {
  		alert('查询出错, 请联系开发人员！')
  	},
  	searchByTime() {
  		axios.get('/webHouse/findByTime', {
	      params: {
	        page: 0,
	        size: 8,
	        liveTime: this.liveTime,
	        leaveTime: this.leaveTime
	      }
      })
      .then(this.houseSearchSucc)
      .catch(this.houseSearchFail)
  	},
  	toHouseDetail(e) {
      this.$router.push({
        path: '/housedetail',
        query: {
          id: e.currentTarget.id,
          liveTime: this.liveTime,
          leaveTime: this.leaveTime
        }
      })
  	},
    goPrePage() {
      if (this.pageNow > 1) {
        this.pageNow-=1;
        axios.get('/webHouse/findByTime', {
          params: {
            page: this.pageNow-1,
            size: 8,
            liveTime: this.liveTime,
            leaveTime: this.leaveTime
          }
        })
        .then(this.houseSearchSucc)
        .catch(this.houseSearchFail)
      } else {
        alert('已经是首页了！')
      }
    },
    goNextPage() {
      if (this.pageNow < this.totalPages) {
        this.pageNow+=1;
        axios.get('/webHouse/findByTime', {
          params: {
            page: this.pageNow-1,
            size: 8,
            liveTime: this.liveTime,
            leaveTime: this.leaveTime
          }
        })
        .then(this.houseSearchSucc)
        .catch(this.houseSearchFail)
      } else {
        alert('已经是最后一页了！')
      }
    },
    goSelectPage() {
      if (this.pageNow <= this.totalPages && this.pageNow >= 1) {
        axios.get('/webHouse/findByTime', {
          params: {
            page: this.pageNow-1,
            size: 8
          }
        })
        .then(this.houseSearchSucc)
        .catch(this.houseSearchFail)
      } else {
        this.pageNow = 1;
        alert('页码超出范围')
      }
    }
  }
}

</script>

<style scoped>
  .houseSearchWrapper {
    flex: 1;
  }
  .formWrapper {
  	display: flex;
  	align-items: center;
  }
  .wrapper {
  	display: flex;
  	flex-wrap: wrap;
  	margin-left: 30px;
  	font-size: 20px;
  }
  .house {
    width: 24%;
    height: 30%;
  }

  .houseImg {
  	width: 85%;
  	height: 25%;
    border-radius: 5px;
  }
  
  form {
    margin: 30px;
  }
  .liveDateLabel {
    margin-right: 20px;
  }
  .leaveDateLabel {
  	margin: 0 20px 0 50px;
  }
  .searchBtn {
  	margin-left: 50px;
  	height: 33px;
    line-height: 33px;
    padding-top: 0;
    border-radius: 6px;
    background-color: #5B61D2;
  }
  .hasOrder {
  	background-color: #B22222;
  	color: #fff;
  	margin-left: 10px;
  	padding: 5px;
  	border-radius: 10px;
  	font-size: 10px;
  }
  .dividePageBtn {
    display: flex;
    justify-content: flex-end;
    margin-right: 130px;
    margin-top: 30px; 
  }
  .page-input {
    width: 30px;
    margin: 0 5px;
    text-align: center;
    height: 33px;
    border-radius: 6px;
  }
  .btn-group {
    margin-right: 30px;
    height: 33px;
    line-height: 33px;
  }
  .btn-group  button {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #5B61D2;
    color: #fff;
  }
  .page-input-wrapper {
    display: flex;
    line-height: 33px;
  }
  .confirmBtn {
    margin-left: 10px;
    height: 33px;
    line-height: 33px;
    border-radius: 6px;
    padding-top: 0;
    background-color: #5B61D2;
  }
  #liveDate, #leaveDate {
    border-radius: 6px;
    padding: 5px 5px;
    height: 33px;
  }
  .houseName, .houseDesc, .housePrice {
    margin-top: 5px;
  }
  .houseName {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  .houseDesc {
    font-size: 12px;
    color: #999;  
  }
  .housePrice {
    font-size: 14px;
    color: #9E0101;
    margin-bottom: 30px;
  }
</style>