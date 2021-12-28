import request from '@/HttpCommon.js'


class UserApi {
    //获取任务列表接口
    login(data) {
        return request.post('/login/', data)
    }

    //获取任务详情接口
    logout(data) {
        return request.delete('/login/',data)
    }

}

export default new UserApi()