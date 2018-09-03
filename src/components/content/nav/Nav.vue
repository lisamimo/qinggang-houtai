<template>
  <div id="nav">
    <ul id="sider">
      <li data-target="#orderManage" data-toggle="collapse" class="list-unstyled sider-item" id="orderTitle">
        <button class="firstTitle">订单管理</button>
        <i class="fas fa-angle-down" ></i>
        <i class="fas fa-angle-up invisible"></i>
      </li>
      <ul class="sider-item-list nav collapse" style="height: 0px;" id="orderManage">
        <router-link tag="li" to="/singleorder"><button class="secondTitle">个人预订</button></router-link>
        <router-link tag="li" to="/teamorder"><button class="secondTitle">团体预订</button></router-link>
      </ul>
      <li data-target="#houseManage" data-toggle="collapse" class="sider-item list-unstyled">
        <button class="firstTitle">房源管理</button>
        <i class="fas fa-angle-down"></i>
        <i class="fas fa-angle-up invisible"></i>
      </li>
      <ul id="houseManage" class="sider-item-list nav collapse" style="height: 0px;">
        <router-link tag="li" to="/housesearch" class="hover"><button class="secondTitle">查询房源</button></router-link>
      </ul>
      <li data-target="#feedback" data-toggle="collapse" class="sider-item list-unstyled">
        <button class="firstTitle">建议反馈</button>
        <i class="fas fa-angle-down"></i>
        <i class="fas fa-angle-up invisible"></i>
      </li>
      <ul id="feedback" class="sider-item-list nav collapse" style="height: 0px;">
        <router-link tag="li" to="/feedback" class="hover"><button class="secondTitle">用户反馈</button></router-link>
      </ul>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
	name: 'Nav',
  data() {
    return {
    }
  },
  activated() {
    //控制上下箭头转换
    $(".sider-item").click(function(){
      $(this).children('.fa-angle-down').toggleClass('invisible');
      $(this).children('.fa-angle-up').toggleClass('invisible');
    })
  },
  methods: {
    orderClick() {
   
    }
  }
}
</script>

<style scoped>
  #nav{
    width: 130px;
    height: 883px;
    margin-right: 10px;
    background-color: #3c4145;
  }

  #sider {
    position: relative;
    left: -30px;
    top: 10px;
    color: #fff;
    line-height: 40px;
  }
  .sider-item {
    font-size: 14px;
    position: relative;
  }
  #orderTitle:visited {
    color: #fff;
  }
  .sider-item-list {
    font-size: 12px;
  }
  .fa-angle-down {
    position: absolute;
    top: 12px;
    left: 100px;
  }
  .fa-angle-up {
    position: absolute;
    top: 12px;
    left: 100px;
  }
  .firstTitle {
    background-color: transparent;
    border-style: none;
    outline: none;
    width: 120px;
    height: 40px;
    text-align: left;
    padding: 0;
    color: #d8d9d9;
  }
  .firstTitle:focus {
    color: #fff;
    font-weight:600;
    outline: none;
  }
  .secondTitle {
    background-color: transparent;
    border-style: none;
    outline: none;
    width: 120px;
    height: 40px;
    text-align: left;
    padding: 0;
    color: #d8d9d9;
    font-weight: 600;
  }
  .secondTitle:focus {
    color: #fff;
    font-weight: 600;
    outline: none;
  }
</style>