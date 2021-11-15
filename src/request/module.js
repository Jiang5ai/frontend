import request from '@/HttpCommon.js'


class ModuleApi {
    //获取模块列表接口
    getModules(data) {
        return request.get('/v1/module/', data)
    }
    //获取单个项目接口
    getModule(mid) {
        return request.get('/v1/module/'+mid+'/')
    }
    // 创建项目接口
    createModule(data) {
        return request.post('/v1/module/', data)
    }
    // 删除项目
    deleteModule(mid) {
        return request.delete('/v1/module/'+mid+'/')
    }

    // 更新项目接口
    updateModule(mid,data) {
        return request.put('/v1/module/'+mid+'/', data)
    }

}

export default new ModuleApi()