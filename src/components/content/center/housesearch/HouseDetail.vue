<template>
	<div class="wrapper">
    <div class="header">
      <p class="title">房源详情</p>
      <button class="btn btn-default addOrderBtn" type="button" @click="toAddOrder">添加订单</button>
    </div>
    <div class="houseHeader">
      <swiper class="swiperWrapper" :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="item of houseDetail.imgs" :key="item.id">
          <img :src="item.address" class="swiper-img">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
      <div>
        <p class="houseName">
          {{houseDetail.name}}
          <span v-if="houseDetail.orders && houseDetail.orders.length" class="hasOrder">
            此房源：
            <span v-for="item of houseDetail.orders" :key="item.id">{{item.liveTime}} 至 {{item.leaveTime}} ; </span>
            已被预订
          </span>
        </p>
        <p class="price">￥{{houseDetail.price}}/天</p>
        <div class="iconContainer">
          <div class="iconWrapper">
            <img src="../../../../../public/img/man@2x.png">
            <p class="iconDesc">{{houseDetail.peopleNum}}人</p>
          </div>
          <div class="iconWrapper">
            <img src="../../../../../public/img/size@2x.png">
            <p class="iconDesc">{{houseDetail.acreage}}㎡</p>
          </div>
          <div class="iconWrapper">
            <img src="../../../../../public/img/huxing@2x.png">
            <p class="iconDesc">{{houseDetail.roomNum}}室</p>
          </div>
          <div class="iconWrapper">
            <img src="../../../../../public/img/bed@2x.png">
            <p class="iconDesc">{{houseDetail.bedNum}}床</p>
          </div>
          <div class="iconWrapper">
            <img src="../../../../../public/img/restroom@2x.png">
            <p class="iconDesc">{{houseDetail.toilet}}卫</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 class="houseIntroduce">房源介绍:</h4>
      <p>{{houseDetail.introduce}}</p>
    </div>
    <div>
      <h4>房源位置:</h4>
      <p>{{houseDetail.address}}</p>
    </div>
    <div class="facilities">
      <h4>配套设施:</h4>
      <p>{{houseDetail.facilities}}</p>
    </div>
    <div class="inform">
      <h4>入住须知</h4>
      <table class="table table-hover table-bordered">
        <thead>
          <tr class="trData">
            <th scope="col">预付费用</th>
            <th scope="col">额外费用</th>
            <th scope="col">接待时间</th>
            <th scope="col">入住时间</th>
            <th scope="col">退房时间</th>
            <th scope="col">最少入住天数</th>
            <th scope="col">最多入住天数</th>
            <th scope="col">户型</th>
            <th scope="col">外宾</th>
          </tr>
        </thead>
        <tbody>
          <tr class="trData">
            <th scope="row">100%</th>
            <td>无</td>
            <td>10：00-22：00</td>
            <td>14：00后</td>
            <td>12：00前</td>
            <td>1天</td>
            <td>90天</td>
            <td>{{houseDetail.houseType}}</td>
            <td>接待</td>
          </tr>
        </tbody>
      </table>
    </div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'HouseDetail',
	data() {
		return {
      houseId: '',
      liveTime: '',
      leaveTime: '',
      houseDetail: '',
      swiperOption: {
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      }
		}
	},
	mounted() {
		this.getHouseDetail()
	},
	methods: {
		getHouseDetail () {
      // 取到路由带过来的参数 
      let id = this.$route.query.id;
      let liveTime = this.$route.query.liveTime;
      let leaveTime = this.$route.query.leaveTime;
      this.houseId = id;
      this.liveTime = liveTime;
      this.leaveTime = leaveTime;
      axios.get('/webHouse/findOne', {
	      params: {
	      	id: this.houseId,
	        liveTime: this.liveTime,
	        leaveTime: this.leaveTime
	      }
      })
      .then(this.searchDetailSucc)
      .catch(this.searchDetailFail)
    },
    searchDetailSucc(res) {
      this.houseDetail = res.data.obj;
    },
    searchDetailFail() {
    	console.log('查询房源详情失败')
    },
    backToHousesearch() {
      this.$router.push('/housesearch')
    },
    toAddOrder() {
      if (!this.houseDetail.orders.length) {
        this.$router.push({
          path: '/addorder',
          query: {
            id: this.houseId,
            liveTime: this.liveTime,
            leaveTime: this.leaveTime,
            houseDetail: this.houseDetail
          }
        })
      } else {
        alert('你所选时间段已有订单，请返回重新选择，避开已订时间段')
      }
    }
	}
}
</script>

<style scoped>
  .wrapper {
    margin-top: 20px;
    font-size: 14px;
  }
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .swiper-container {
    margin: 0;
  }
  .houseHeader {
    display: flex;
  }
  .swiperWrapper {
    width: 550px;
    height: 300px;
    position: relative;
    margin-right: 20px;
  }
  .swiper-img {
    width: 550px;
  }
  .swiper-pagination {
    position: absolute;
    color: #fff;
  }
  .iconContainer img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .iconWrapper {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 22px;
  }
  .iconDesc {
    margin: 0;
  }
  .houseIntroduce {
    margin-top: 20px;
  }
  .houseName {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  .price {
    font-size: 16px;
    color: #9E0101;
    font-weight: 600;
  }
  h4 {
    font-size: 16px;
    font-weight: 600;
  }
  .facilities {
    width: 1000px;
  }
  .btnWrapper {
    display: flex;
    justify-content: center;
  }
  .addOrderBtn {
    width: 150px;
    height: 33px;
    border-radius: 6px;
    background-color: #5B61D2;
    color: #fff;
    margin-left: 30px;
    width: 94px;
    padding: 0;
  }
  .hasOrder {
    font-size: 10px;
    color: #fff;
    background-color: #B22222;
    border-radius: 5px;
    padding: 5px 8px;
  }
  .title {
    font-size: 24px;
    font-weight: 600px;
    margin: 0;
  }
</style>