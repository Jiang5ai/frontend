import request from '@/HttpCommon.js'


class ProjectApi {
    //获取项目列表接口
    getProjects(data) {
        return request.get('/v1/project/', data)
    }

    // 创建项目接口
    createProject(data) {
      return request.post('v1/project/', data)
    }

    // getProject(pid) {
    //   return request.get('/api/v1/project/detail', { id: pid })
    // }

    // deleteProject(pid) {
    //   return request.delete('/api/v1/project/delete', { id: pid })
    // }


    // updateProject(data) {
    //   return request.put('/api/v1/project/update', data)
    // }

}

export default new ProjectApi()