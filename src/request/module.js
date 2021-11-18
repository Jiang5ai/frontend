import request from '@/HttpCommon.js'


class ModuleApi {
    //获取模块列表接口
    getModules(data) {
        return request.get('/v1/module/', data)
    }
    //获取单个模块接口
    getModule(mid) {
        return request.get('/v1/module/'+mid+'/')
    }
    // 创建模块接口
    createModule(data) {
        return request.post('/v1/module/', data)
    }
    // 删除模块
    deleteModule(mid) {
        return request.delete('/v1/module/'+mid+'/')
    }

    // 更新模块接口
    updateModule(mid,data) {
        return request.put('/v1/module/'+mid+'/', data)
    }

}

export default new ModuleApi()