<template>
  <div id="feedbackWrapper">
  	<table class="table table-hover" v-if="feedback.length">
		  <thead>
		    <tr class="trData">
		      <th scope="col">用户ID</th>
		      <th scope="col">反馈时间</th>
		      <th scope="col">客户邮箱</th>
		      <th scope="col">联系电话</th>
		      <th scope="col">反馈状态</th>
		      <th scope="col">操作</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr class="trData" v-for="item of feedback" :key="item.id">
		      <th scope="row">{{item.userId}}</th>
		      <td>{{item.time}}</td>
		      <td>{{item.emailAccount}}</td>
		      <td>{{item.phoneNum}}</td>
		      <td v-if="item.ifDispose ==='false'">未处理</td>
		      <td v-else>已处理</td>
		      <td>
		      	<button type="button" class="btn btn-default" data-toggle="modal" data-target="#details" @click="searchDetails(item.id)">查看详情</button>
		      	<div class="modal fade" id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog" role="document">
						    <div class="modal-content">
						      <div class="modal-header">
						        <h5 class="modal-title" id="exampleModalLabel">反馈详细信息</h5>
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div class="modal-body">
						      	<p>用户ID： {{feedbackDetail.userId}}</p>
						        <p>反馈ID： {{feedbackDetail.id}}</p>
						        <p>反馈时间： {{feedbackDetail.time}}</p>
						        <p>反馈意见： {{feedbackDetail.textareaContent}}</p>
						        <p>客户邮箱： {{feedbackDetail.emailAccount}}</p>
						        <p>联系电话： {{feedbackDetail.phoneNum}}</p>
						        <div v-if="feedbackDetail.ifDispose ==='false'">
						          <p>反馈状态： 未处理</p>
						          <div class="form-group">
							          <label for="handleResult">管理员处理意见：</label>
							          <textarea v-model="handleDesc" class="form-control" id="handleResult" rows="3"></textarea>
							         </div>
						        </div>
						        <div v-if="feedbackDetail.ifDispose ==='true'">
						          <p>反馈状态： 已处理</p>
						          <p>管理员处理意见： {{feedbackDetail.remark}}</p>
						          <p>管理员处理时间： {{feedbackDetail.disposeTime}}</p>
						        </div>
						      </div>
						      <div class="modal-footer">
						        <button
						          type="button"
						          class="btn btn-outline-primary"
						          data-dismiss="modal"
						          v-if="feedbackDetail.ifDispose ==='false'"
						          @click = "submitHandle(feedbackDetail.id)"
						        >
						          提交处理意见
						        </button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal" v-else>退出</button>
						      </div>
						    </div>
						  </div>
				    </div>
		      </td>
		    </tr>
		  </tbody>
    </table>
    <!-- 没有反馈时展示的内容 -->
    <div v-if="!feedback.length">
      现在还没有客户的反馈意见或建议！
    </div>
    <div v-if="totalPages > 1" class="dividePageBtn">
      <div class="btn-group" role="group" aria-label="First group">
        <button type="button" class="btn btn-default" @click="goPrePage">上一页</button>
        <button type="button" class="btn btn-default">{{pageNow}}</button>
        <button type="button" class="btn btn-default" @click="goNextPage">下一页</button>
        <button type="button" class="btn btn-default">共 {{totalPages}} 页</button>
      </div>
      <div class="page-input-wrapper">
        到第<input type="text" class="page-input" v-model="pageNow" />页
        <button type="button" class="btn btn-default comfirmBtn"  @click="goSelectPage">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FeedBack',
  data() {
  	return {
      feedback: [],
      feedbackDetail: '',
      handleDesc: '',
      pageNow: 1,
      totalPages: 0,
  	}
  },
  mounted() {
    axios.get('api/webFeedback/select', {
    	params: {
    		page: 0,
        size: 9
    	}
    })
    .then(this.feedbackSucc)
    .catch(this.feedbackFail)
  },
  methods: {
  	feedbackSucc(res) {
      this.feedback = res.data.obj;
      console.log(res.data.obj);
  	},
  	feedbackFail() {
  		console.log('查询意见反馈失败');
  	},
  	searchDetails(id) {
    	axios.get('api/webFeedback/findOne', {
        params: {
          id: id
        }
      })
      .then(this.SearchDetailSucc)
      .catch(this.SearchDetailFail)
    },
    SearchDetailSucc(res) {
      this.feedbackDetail = res.data.obj;
    },
    SearchDetailFail() {
    	console.log('查询出错')
    },
    submitHandle(id) {
      axios.get('api/webFeedback/update', {
        params: {
          id: id,
          remark: this.handleDesc
        }
       })
	    .then(this.feedbackUpdateSucc)
	    .catch(this.feedbackUpdateFail)
    },
    feedbackUpdateSucc(res) {
    	console.log(res.data.obj);
    },
    feedbackUpdateFail() {
    	console.log('更新失败')
    },
    goPrePage() {
      if (this.pageNow > 1) {
        this.pageNow-=1;
        axios.get('api/webFeedback/select', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.feedbackSucc)
        .catch(this.feedbackFail)
      } else {
        alert('已经是首页了！')
      }
    },
    goNextPage() {
      if (this.pageNow < this.totalPages) {
        this.pageNow+=1;
        axios.get('api/webFeedback/select', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.feedbackSucc)
        .catch(this.feedbackFail)
      } else {
        alert('已经是最后一页了！')
      }
    },
    goSelectPage() {
      if (this.pageNow <= this.totalPages && this.pageNow >= 1) {
        axios.get('api/webFeedback/select', {
          params: {
            page: this.pageNow-1,
            size: 9
          }
        })
        .then(this.feedbackSucc)
        .catch(this.feedbackFail)
      } else {
        this.pageNow = 1;
        alert('页码超出范围')
      }
    }
  }
}
</script>

<style scoped>
  #feedbackWrapper {
  	flex: 1;
  	margin-right: 10px;
  }
  .dividePageBtn {
    display: flex;
    justify-content: flex-end;
    margin-right: 230px;
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
  .comfirmBtn {
    height: 33px;
    line-height: 33px;
    border-radius: 6px;
    padding-top: 0;
    margin-left: 10px;
    background-color: #5B61D2;
    color: #fff;
  }
  .page-input-wrapper {
    display: flex;
    line-height: 33px;
  }
</style>