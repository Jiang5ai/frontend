import request from '@/HttpCommon.js'


class ProjectApi {
    //获取项目列表接口
    getProjects(data) {
        return request.get('/v1/project/', data)
    }
    //获取单个项目接口
    getProject(pid) {
        return request.get('/v1/project/'+pid+'/')
    }
    // 创建项目接口
    createProject(data) {
      return request.post('/v1/project/', data)
    }
    // 删除项目
    deleteProject(pid) {
      return request.delete('/v1/project/'+pid+'/')
    }

    // 更新项目接口
    updateProject(pid,data) {
      return request.put('/v1/project/'+pid+'/', data)
    }

}

export default new ProjectApi()