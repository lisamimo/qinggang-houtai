<template>
  <div id="teamOrders">
  	<div>
	  	<div class="dropdown">
			  <button class="btn btn-primary dropdown-toggle" type="button" id="orderSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    订单筛选
			  </button>
			  <div class="dropdown-menu" aria-labelledby="orderSelect">
			    <button class="dropdown-item" type="button" @click="unhandled">未处理</button>
			    <button class="dropdown-item" type="button" @click="receivedOrder">已接单</button>
			    <button class="dropdown-item" type="button" @click="refusedOrder">已拒单</button>
			  </div>
			</div>
			<table class="table table-hover" v-if="teamOrders.length">
			  <thead>
			    <tr class="trData">
			    	<th scope="col">订单ID</th>
			      <th scope="col">用户ID</th>
			      <th scope="col">身份证图片</th>
			      <th scope="col">入住时间</th>
			      <th scope="col">离开时间</th>
			      <th scope="col">联系人</th>
			      <th scope="col">联系电话</th>
			      <th scope="col">订单状态</th>
			      <th scope="col">操作</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr class="trData" v-for="item of teamOrders" :key="item.id">
			      <th scope="row">{{item.id}}</th>
			      <th>{{item.userId}}</th>
			      <td>
			      	<img :src="item.idcardFront" class="idcardImg" @click="bigImg"/>
			      </td>
			      <td>{{item.liveTime}}</td>
			      <td>{{item.leaveTime}}</td>
			      <td>{{item.linkman}}</td>
			      <td>{{item.phone}}</td>
			      <td v-if="item.ifReceipt === '0'">未处理</td>
			      <td v-else-if="item.ifReceipt === 'true'">已接单</td>
			      <td v-else-if="item.ifReceipt === 'false'">已拒单</td>
			      <td>
			      	<button
			      	  type="button"
			      	  class="btn btn-default receiveOrder"
			      	  data-toggle="modal"
			      	  data-target="#receiveOrder"
			      	  @click="storeId(item.id)"
			      	  v-if="item.ifReceipt === '0'"
			      	>
			          接单
			        </button>
			      	<button
			      	  type="button"
			      	  class="btn btn-default"
			      	  data-toggle="modal"
			      	  data-target="#refuseOrder"
			      	  @click="storeId(item.id)"
			      	  v-if="item.ifReceipt === '0'"
			      	>
			          拒单
			        </button>
			        <button
			      	  type="button"
			      	  class="btn btn-default"
			      	  data-toggle="modal"
			      	  data-target="#orderDetail"
			      	  @click="orderDetail(item.id)"
			      	  v-if="item.ifReceipt === 'true'"
			      	>
			          接单详情
			        </button>
			        <button
			      	  type="button"
			      	  class="btn btn-default"
			      	  data-toggle="modal"
			      	  data-target="#orderDetail"
			      	  @click="orderDetail(item.id)"
			      	  v-if="item.ifReceipt === 'false'"
			      	>
			          拒单详情
			        </button>
			      	<div class="modal fade" id="receiveOrder" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">团体预订</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
							      	<p>接单后请及时把订单录入系统</p>
							      	<div class="form-group">
	                      <label for="exampleFormControlTextarea1">订单描述：</label>
	                      <textarea v-model="orderDesc" class="form-control" id="exampleFormControlTextarea1" rows="3" @input="orderDescChange"></textarea>
	                      <p v-if="showWarning" class="text-danger">描述不能为空</p>
	                    </div>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-outline-primary" :data-dismiss="isModal" @click="submitOrder">提交团体预订</button>
							      </div>
							    </div>
							  </div>
				    	</div>
				    	<div class="modal fade" id="refuseOrder" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">拒绝该团体预订</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
							      	<p>拒单后请回复一下客户</p>
							      	<div class="form-group">
	                      <label for="exampleFormControlTextarea1">拒单原因描述：</label>
	                      <textarea v-model="orderDesc" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="拒单原因只供内部查看" @input="orderDescChange"></textarea>
	                      <p v-if="showWarning" class="text-danger">描述不能为空</p>
	                    </div>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-outline-primary" :data-dismiss="isModal" @click="refuseOrder">提交拒单</button>
							      </div>
							    </div>
							  </div>
				    	</div>
				    	<div class="modal fade" id="orderDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h5 class="modal-title" id="exampleModalLabel">订单详情</h5>
							        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div class="modal-body">
							      	<div class="form-group">
	                      <p>接/拒单描述：</p>
	                      <p>{{orderDetailInfo.reason}}</p>
	                    </div>
							      </div>
							      <div class="modal-footer">
							        <button type="button" class="btn btn-outline-primary" data-dismiss="modal">退出</button>
							      </div>
							    </div>
							  </div>
				    	</div>
			      </td>
			    </tr>
			  </tbody>
	    </table>
	    <img :src="bigImage"  v-if="showBigImg" class="bigImg" @click="handleBigImgClick">
    </div>
    <div v-if="!teamOrders.length">
    	现在还没有任何订单！
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
	  	teamOrders: [],
	  	showBigImg: false,
	  	bigImage: '',
	  	orderDesc: '',
	  	desc: '',
	  	id: '',
	  	orderDetailInfo: '',
	  	showWarning: false,
	  	isDisabled: '',
	  	pageNow: 1,
      totalPages: 0,
      isModal: ''
	  }
	},
	mounted() {
    axios.get('api/webWhole/findAll', {
    	params: {
    		page: 0,
        size: 9
    	}
    })
    .then(this.findAllSucc)
    .catch(this.findAllFail)
	},
	methods: {
		findAllSucc(res) {
      this.teamOrders = res.data.obj
		},
		findAllFail() {
      console.log('查询所有订单失败')
		},
		unhandled() {
      axios.get('api/webWhole/select', {
        params: {
          status: '0',
          page: 0,
          size: 9
        }
      })
      .then(this.unhandledSucc)
      .catch(this.unhandledFail)
		},
		unhandledSucc(res) {
			this.teamOrders = res.data.obj
		},
		unhandledFail() {
			console.log('查询出错')
		},
		receivedOrder() {
      axios.get('api/webWhole/select', {
        params: {
          status: 'true',
          page: 0,
          size: 9
        }
      })
      .then(this.receivedSucc)
      .catch(this.receivedFail)
		},
		receivedSucc(res) {
      this.teamOrders = res.data.obj
		},
		receivedFail() {
      console.log('查询接单失败')
		},
		refusedOrder() {
      axios.get('api/webWhole/select', {
        params: {
          status: 'false',
          page: 0,
          size: 9
        }
      })
      .then(this.refusedSucc)
      .catch(this.refusedFail)
		},
		refusedSucc(res) {
      this.teamOrders = res.data.obj;
		},
		refusedFail() {
     console.log('查拒单失败')
		},
		orderDetail(id) {
			this.id = id;
			axios.get('api/webWhole/findOne', {
        params: {
          id: id,
        }
      })
      .then(this.orderDetailSucc)
      .catch(this.orderDetailFail)
		},
		orderDetailSucc(res) {
      this.orderDetailInfo = res.data.obj;
		},
		orderDetailFail() {
      console.log('查询详情失败')
		},
		bigImg(e) {
			this.showBigImg = true;
			this.bigImage = e.currentTarget.src;
		},
		handleBigImgClick() {
			this.showBigImg = false
		},
		storeId(id) {
      this.id = id
		},
		submitOrder() {
			if (this.orderDesc !== '') {
	      axios.get('api/webWhole/modify', {
	        params: {
	        	id: this.id,
	          status: 'true',
	          reason: this.orderDesc
	        }
	      })
	      .then(this.handlereceiveOrderSucc)
	      .catch(this.handlereceiveOrderFail)
	    } else {
	    	this.showWarning = true;
	    }
		},
		handlereceiveOrderSucc(res) {
			this.orderDesc = '';
      this.unhandled();
		},
		handlereceiveOrderFail() {
			alert('提交订单失败')
		},
		orderDescChange() {
      if (this.orderDesc !== '') {
      	this.showWarning = false;
      	this.isModal = "modal";
      } else {
      	this.isModal = "";
      }
		},
		refuseOrder() {
			if (this.orderDesc !== '') {
				axios.get('api/webWhole/modify', {
	        params: {
	        	id: this.id,
	          status: 'false',
	          reason: this.orderDesc
	        }
	      })
	      .then(this.refuseOrderSucc)
	      .catch(this.refuseOrderFail)
	    } else {
	    	this.showWarning = true;
	    }
		},
		refuseOrderSucc(res) {
			this.orderDesc = '';
			this.unhandled();
		},
		refuseOrderFail() {
			console.log('提交拒单失败')
		},
		goPrePage() {
      if (this.pageNow > 1) {
        this.pageNow-=1;
        axios.get('api/webWhole/findAll', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.findAllSucc)
        .catch(this.findAllFail)
      } else {
        alert('已经是首页了！')
      }
    },
    goNextPage() {
      if (this.pageNow < this.totalPages) {
        this.pageNow+=1;
        axios.get('api/webWhole/findAll', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.findAllSucc)
        .catch(this.findAllFail)
      } else {
        alert('已经是最后一页了！')
      }
    },
    goSelectPage() {
      if (this.pageNow <= this.totalPages && this.pageNow >= 1) {
        axios.get('api/webWhole/findAll', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.findAllSucc)
        .catch(this.findAllFail)
      } else {
        this.pageNow = 1;
        alert('页码超出范围')
      }
    }
	}
}
</script>

<style scoped>
	#teamOrders {
  	flex: 1;
  	margin-right: 10px;
  	position: relative;
  }

  #orderSelect {
  	margin-top: 10px;
  	margin-bottom: 10px;
  	background-color: #5B61D2;
  }

  .idcardImg {
  	width: 100px;
  	height: 40px;
  }
  
  .bigImg {
  	position: absolute;
  	top: 110px;
  	left: 300px;
  	width: 600px;
  	height: 400px;
  }

  .receiveOrder {
  	margin-right: 20px;
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
</style>