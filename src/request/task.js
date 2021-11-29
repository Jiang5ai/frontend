import request from '@/HttpCommon.js'


class TaskApi {
    //获取任务列表接口
    getTasks(data) {
        return request.get('/v1/task/list/', data)
    }

    //获取任务详情接口
    getTaskInfo(tid) {
        return request.get('v1/task/'+tid+'/info/')
    }

    //创建任务接口
    createTask(data){
        return request.post('/v1/task/create/',data)
    }

    //更新任务接口
    updateTask(tid){
        return request.post('/v1/task/'+tid+'/update/')
    }

    //删除任务接口
    deleteTask(tid){
        return request.delete('/v1/task/'+tid+'/delete/')
    }
}

export default new TaskApi()