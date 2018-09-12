<template>
  <div id="singleOrder">
    <div>
    	<div class="dropdown">
  		  <button class="btn btn-primary dropdown-toggle selectBtn" type="button" id="orderSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  		    订单筛选
  		  </button>
  		  <div class="dropdown-menu" aria-labelledby="orderSelect">
          <button class="dropdown-item" type="button" @click="searchAll">所有订单</button>
  		    <button class="dropdown-item" type="button" @click="unPayOrder">待付款订单</button>
  		    <button class="dropdown-item" type="button" @click="alreadyPayOrder">已付款订单</button>
  		    <button class="dropdown-item" type="button" @click="refundOrder">退款订单</button>
  		    <button class="dropdown-item" type="button" @click="completeOrder">已完成订单</button>
  		  </div>
  		</div>
    	<table class="table table-hover" v-if="this.orders.length">
  		  <thead>
  		    <tr class="trData">
  		      <th scope="col">订单ID</th>
  		      <th scope="col">用户ID</th>
  		      <th scope="col">房源名称</th>
  		      <th scope="col">入住时间</th>
  		      <th scope="col">离开时间</th>
  		      <th scope="col">金额</th>
  		      <th scope="col">订单状态</th>
  		      <th scope="col">操作</th>
  		    </tr>
  		  </thead>
  		  <tbody>
  		    <tr class="trData" v-for="item of orders" :key="item.id">
  		      <th scope="row">{{item.id}}</th>
  		      <td v-if="item.userId">{{item.userId}}</td>
            <td v-else>线下订单</td>
  		      <td>{{item.houseName}}</td>
  		      <td>{{item.liveTime}}</td>
  		      <td>{{item.leaveTime}}</td>
  		      <td>￥{{item.price}}</td>
  		      <td>{{item.status}}</td>
  		      <td><button type="button" class="btn btn-default" data-toggle="modal" data-target="#details" @click="searchDetails(item.id)">查看详情</button></td>
  		    </tr>
  		  </tbody>
      </table>
      <div class="modal fade" id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  		  <div class="modal-dialog" role="document">
  		    <div class="modal-content">
  		      <div class="modal-header">
  		        <h5 class="modal-title" id="exampleModalLabel">订单详细信息</h5>
  		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  		          <span aria-hidden="true">&times;</span>
  		        </button>
  		      </div>
  		      <div class="modal-body">
  		      	<p v-if="orderDetails.userId">用户ID： {{orderDetails.userId}}</p>
              <p v-else>用户ID：线下订单</p>
  		        <p>订单号： {{orderDetails.id}}</p>
  		        <p>下单时间： {{orderDetails.createTime}}</p>
  		        <p>房源名称： {{orderDetails.houseName}}</p>
  		        <p>入住时间： {{orderDetails.liveTime}}</p>
  		        <p>离开时间： {{orderDetails.leaveTime}}</p>
  		        <p>订单金额： ￥{{orderDetails.price}}</p>
  		        <p>订单状态： {{orderDetails.status}}</p>
  		        <p>联系人： {{orderDetails.linkman}}</p>
  		        <p>手机号： {{orderDetails.phone}}</p>
  		        <p>入住登记人： {{orderDetails.trueName}}</p>
  		        <p>登记身份证号： {{orderDetails.idcard}}</p>
              <button
                type="button"
                class="btn btn-outline-primary"
                v-if="!orderDetails.userId && orderDetails.status === '已付款'"
                @click="sendPassWord"
              >发送开房密码</button>
              <div v-if="orderDetails.status === '待付款'">
                <button
                  type="button"
                  class="btn btn-outline-primary alreadyPayBtn"
                  @click="alreadyPayClick"
                >客户已付款</button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="alreadyCancelClick"
                >取消该订单</button>
              </div>
  		      </div>
  		      <div class="modal-footer">
  		        <button type="button" class="btn btn-outline-primary" data-dismiss="modal">退出</button>
  		      </div>
  		    </div>
  		  </div>
      </div>
      <div v-if="!this.orders.length">
        现在还没有任何订单！
      </div>
    </div>
    <!-- 分页按钮 -->
    <div v-if="totalPages > 1 && this.orders.length" class="dividePageBtn">
      <div class="btn-group" role="group" aria-label="First group">
        <button type="button" class="btn btn-default" @click="goPrePage">上一页</button>
        <button type="button" class="btn btn-default">{{pageNow}}</button>
        <button type="button" class="btn btn-default" @click="goNextPage">下一页</button>
        <button type="button" class="btn btn-default">共 {{totalPages}} 页</button>
      </div>
      <div class="page-input-wrapper">
        到第<input type="text" class="page-input" v-model="pageNow" />页
        <button type="button" class="btn btn-default confirmBtn"  @click="goSelectPage">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Content',
	data() {
	  return {
	  	orders: [],
	  	orderDetails: '',
      pageNow: 1,
      totalPages: 0,
	  }
	},
	mounted() {
    this.searchAll()
	},
	methods: {
    searchAll() {
      axios.get('/webOrder/findAll', {
      params: {
        page: 0,
        size: 9
      }
    }).then(this.SearchAllSucc)
      .catch(this.SearchAllFail)
    },
    SearchAllSucc(res) {
      this.orders = res.data.obj;
      if (res.data.obj.length) {
        this.totalPages = res.data.obj[0].totalPage;
      }
    },
    SearchAllFail() {
    	alert('查询出错')
    },
    searchDetails(id) {
    	axios.get('/webOrder/detail', {
        params: {
          id: id
        }
      })
      .then(this.SearchDetailSucc)
      .catch(this.SearchDetailFail)
    },
    SearchDetailSucc(res) {
      this.orderDetails = res.data.obj;
    },
    SearchDetailFail() {
    	alert('查询出错')
    },
    unPayOrder() {
      axios.get('/webOrder/findByStatus', {
        params: {
          status: 'dfk',
          page: 0,
          size: 9
        }
      })
      .then(this.unPaySucc)
      .catch(this.unPayFail)
    },
    unPaySucc(res) {
      this.orders = res.data.obj;
      if (res.data.obj.length) {
        this.totalPages = res.data.obj[0].totalPage;
      }
    },
    unPayFail() {
    	alert('查询待付款订单出错')
    },
    alreadyPayOrder() {
      axios.get('/webOrder/findByStatus', {
        params: {
          status: 'yfk',
          page: 0,
          size: 9
        }
      })
      .then(this.alreadyPaySucc)
      .catch(this.alreadyPayFail)
    },
    alreadyPaySucc(res) {
      this.orders = res.data.obj;
      if (res.data.obj) {
        this.totalPages = res.data.obj[0].totalPage;
      }
    },
    alreadyPayFail() {
      alert('查询已付款订单出错')
    },
    refundOrder() {
      axios.get('/webOrder/findByStatus', {
        params: {
          status: 'tk',
          page: 0,
          size: 9
        }
      })
      .then(this.refundSucc)
      .catch(this.refundFail)
    },
    refundSucc(res) {
      this.orders = res.data.obj;
      if (res.data.obj.length) {
        this.totalPages = res.data.obj[0].totalPage;
      }
    },
    refundFail() {
      console.log('查询退款订单出错')
    },
    completeOrder() {
      axios.get('/webOrder/findByStatus', {
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
      this.orders = res.data.obj;
      if (res.data.obj.length) {
        this.totalPages = res.data.obj[0].totalPage;
      }
    },
    completeFail() {
    	alert('查询已完成订单出错')
    },
    goPrePage() {
      if (this.pageNow > 1) {
        this.pageNow-=1;
        axios.get('/webOrder/findAll', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.SearchAllSucc)
        .catch(this.SearchAllFail)
      } else {
        alert('已经是首页了！')
      }
    },
    goNextPage() {
      if (this.pageNow < this.totalPages) {
        this.pageNow+=1;
        axios.get('/webOrder/findAll', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.SearchAllSucc)
        .catch(this.SearchAllFail)
      } else {
        alert('已经是最后一页了！')
      }
    },
    goSelectPage() {
      if (this.pageNow <= this.totalPages && this.pageNow >= 1) {
        axios.get('/webOrder/findAll', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.SearchAllSucc)
        .catch(this.SearchAllFail)
      } else {
        this.pageNow = 1;
        alert('页码超出范围')
      }
    },
    sendPassWord() {
      axios.get('/sms/identifying', {
          params: {
            id: this.orderDetails.id
          }
        })
        .then(this.sendPassWordSucc)
        .catch(this.sendPassWordFail)
    },
    sendPassWordSucc(res) {
      if (res.data.code === "1") {
        alert("发送密码成功")
      } else if (res.data.code === "-1") {
        alert("只有入住期间才能给客户发送密码，请客户入住期间再来发送！")
      }
    },
    sendPassWordFail() {
      alert("发送密码失败，请联系人员。")
    },
    alreadyPayClick() {
      axios.get('/webOrder/modify', {
        params: {
            id: this.orderDetails.id,
            status: 'yfk'
        }
      })
        .then(this.alreadyPayClickSucc)
        .catch(this.alreadyPayClickFail)
    },
    alreadyPayClickSucc(res) {
      this.searchAll();
      this.searchDetails(res.data.obj.id);
    },
    alreadyPayClickFail() {
      alert('修改状态失败')
    },
    alreadyCancelClick() {
      axios.get('/webOrder/modify', {
        params: {
            id: this.orderDetails.id,
            status: 'yqx'
        }
      })
        .then(this.CancelClickSucc)
        .catch(this.CancelClickFail)
    },
    CancelClickSucc(res) {
      this.searchAll();
      this.searchDetails(res.data.obj.id);
    },
    CancelClickFail() {
      alert('取消订单出错！')
    }
	}
}
</script>

<style scoped>
  #singleOrder {
  	flex: 1;
  	margin-right: 10px;
  }
  .selectBtn {
  	margin-top: 20px;
  	margin-bottom: 20px;
    height: 33px;
    border-radius: 6px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #5B61D2;
  }
  .dividePageBtn {
    display: flex;
    justify-content: flex-end;
    margin-right: 150px;
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
  .btn-group button {
    background-color: #5B61D2;
    color: #fff;
    box-shadow:none;    
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
    color: #fff;
  }
  .alreadyPayBtn {
    margin-right: 30px;
  }
</style>