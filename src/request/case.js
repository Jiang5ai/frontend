import request from '@/HttpCommon.js'


class CaseApi {
    //获取用例列表接口
    getCases(data) {
        return request.get('/v1/case/list', data)
    }
    //获取单个用例接口
    getCase(cid) {
        return request.get('/v1/case/'+cid+'/info')
    }
    // 创建用例接口
    createCase(data) {
        return request.post('/v1/case/create', data)
    }
    // 删除用例
    deleteCase(cid) {
        return request.delete('/v1/case/'+cid+'/delete')
    }

    // 更新用例接口
    updateCase(cid,data) {
        return request.put('/v1/case/'+cid+'/update', data)
    }

}

export default new CaseApi()