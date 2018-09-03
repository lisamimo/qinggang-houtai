<template>
  <div class="contentContainer">
  	<img :src="houseDetail.img" class="houseImg">
    <div class="houseDesc">
    	<p class="houseName">{{houseDetail.name}}</p>
    	<p class="houseSimpleDesc">{{houseDetail.houseType}} | 可住{{houseDetail.peopleNum}}人</p>
    </div>
    <div class="inputWrapper">
		  <div class="form-group">
		    <label for="liveDate">入住时间:</label>
		    <input type="date" id="liveDate" class="form-control" v-model="liveTime"/>
		  </div>
      <div class="timeGap">-</div>
		  <div class="form-group">
		    <label for="leaveDate">离开时间:</label>
		    <input type="date" id="leaveDate" class="form-control" v-model="leaveTime"/>
		  </div>
    </div>
    <div class="inputWrapper">
      <div class="form-group input-gap">
        <label for="liveName">入住人数:</label>
        <input type="number" id="liveName" class="form-control" placeholder="必填" v-model="liveNum"/>
      </div>
      <div class="form-group">
        <label for="roomNum">房源数量:</label>
        <input type="text" id="roomNum" class="form-control" :value="houseDetail.roomNum + '间'" readonly="true" />
      </div>
    </div>
    <div class="inputWrapper">
  	  <div class="form-group input-gap">
  	    <label for="contactMan">联系人:</label>
  	    <input type="text" id="contactMan" class="form-control" placeholder="请填入真实姓名" v-model="linkman"/>
  	  </div>
  	  <div class="form-group">
  	    <label for="phoneNum">手机号:</label>
  	    <input type="text" id="phoneNum" class="form-control" placeholder="请输入手机号" v-model="phone"/>
  	  </div>
    </div>
    <div class="inputWrapper">
  	  <div class="form-group input-gap">
  	    <label for="liveMan">入住人(1位即可)：</label>
  	    <input type="text" id="liveMan" class="form-control" placeholder="请填写证件上的姓名" v-model="trueName"/>
  	  </div>
  	  <div class="form-group">
  	    <label for="idCard">身份证号：</label>
  	    <input type="text" id="liveMan" class="form-control" placeholder="请填写正确身份证号码" v-model="idcard"/>
  	  </div>
    </div>
	  <div class="priceDesc">房费总额： <span class="priceNum">￥{{price*day}}</span></div>
  	<button class="btn backBtn" type="button" @click="backToHouseDetail">取消</button>
  	<button class="btn submitBtn" type="button" @click="submitOrder">提交订单</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddOrder',
  data() {
  	return {
  		houseId: '',
  		liveTime: '',
  		leaveTime: '',
  		houseDetail: '',
  		liveNum: '',
      linkman: '',
      phone: '',
      trueName: '',
      idcard: '',
      day: 1,
      price: 0
  	}
  },
  mounted() {
    this.getQuery();
  },
  watch: {
    liveTime(newLiveTime, oldLiveTime) {
      if (this.leaveTime !== '') {
        var day = this.common.countDayMount(newLiveTime, this.leaveTime);
        if ( day > 0 ) {
          this.day = day;
        } else {
          alert('时间选择错误！入住时间必须早于离开时间！')
        }
      }
    },
    leaveTime(newLeaveTime, oldLeaveTim) {
      if (this.liveTime !== '') {
        var day = this.common.countDayMount(this.liveTime, newLeaveTime);
        if ( day > 0 ) {
          this.day = day;
        }  else {
          alert('时间选择错误！入住时间必须早于离开时间！')
        }
      }
    }
  },
  methods: {
  	getQuery() {
      let id = this.$route.query.id;
      let liveTime = this.$route.query.liveTime;
      let leaveTime = this.$route.query.leaveTime;
      let houseDetail = this.$route.query.houseDetail;
      let day = this.common.countDayMount(liveTime, leaveTime);
      this.day = day || 1;
      this.houseId = id;
      this.liveTime = liveTime;
      this.leaveTime = leaveTime;
      this.houseDetail = houseDetail;
      this.price = houseDetail.price;
  	},
  	backToHouseDetail() {
  		this.$router.push({
  			path: '/housedetail',
  			query: {
          id: this.houseId,
          liveTime: this.liveTime,
          leaveTime: this.leaveTime,
        }
  		})
  	},
  	submitOrder() {
      if (this.liveNum === '') {
        alert ('入住人数不能为空！')
      } else if (this.linkman === '') {
        alert ('联系人不能为空！')
      } else if (!/^1\d{10}$/.test(this.phone)) {
        alert('手机号码格式错误！')
      } else if (this.trueName === '') {
        alert('入住人姓名不能为空！')
      } else if (!/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idcard)) {
        alert('身份证号码格式错误！')
      } else if ( this.liveTime === '' || this.leaveTime === '') {
        alert('入住时间和离开时间不能为空')
      } else {
        var day = this.common.countDayMount(this.liveTime, this.leaveTime);
        this.day = day;
    		axios.post('api/webOrder/add', {
          houseId: this.houseId,
          price: this.price*day, //单价乘以入住天数
          liveNum: this.liveNum, 
          liveTime: this.liveTime, 
          leaveTime: this.leaveTime, 
          linkman: this.linkman, 
          phone: this.phone,  
          trueName: this.trueName, 
          idcard: this.idcard,
  	    })
        .then(this.submitOrderSucc)
        .catch(this.submitOrderFail)
      }
  	},
  	submitOrderSucc(res) {
  		alert('提交订单成功');
      this.liveNum = '';
      this.linkman = '';
      this.phone = '';
      this.trueName = '';
      this.idcard = '';
  	},
  	submitOrderFail() {
  		console.log('提交订单失败')
  	}
  }
}
</script>


<style scoped>
  .contentContainer {
  	margin-left: 30px;
  }
 .houseImg {
   width: 550px;
   height: 300px;
   margin-top: 20px;
   margin-bottom: 10px;
 }
 label {
   padding-right: 20px;
 }
  
 .houseNum {
 	margin-top: 20px;
 }
 .backBtn, .submitBtn {
   margin-top: 10px;
   margin-right: 30px;
   border-radius: 6px;
   width: 94px;
   height: 33px;
   padding-top: 5px;
   padding-bottom: 5px;
 }
 .submitBtn {
   background-color: #5B61D2;
   color: #fff;
 }
 .backBtn {
   background-color: #fff;
   color: #5B61D2;
   border-color: #5B61D2;
 }
 .houseDesc {
  display: flex;
  align-items: center;
 }
 .houseName {
  font-size: 18px;
  font-weight: 600;
 }
 .houseSimpleDesc {
  font-size: 14px;
  color: #999;
  margin-left: 20px;
 }
 .inputWrapper {
  display: flex;
  align-items: center;
 }
 input {
  width: 190px;
 }
 .timeGap {
   width: 40px;
   text-align: center;
   margin-top: 10px;
 }
.input-gap {
  margin-right: 40px;
}
label {
  font-size: 14px;
}
input {
  font-size: 14px;
}
.priceDesc {
  font-size: 18px;
  font-weight: 600;
}
.priceNum {
  color: #9E0101
}
</style>