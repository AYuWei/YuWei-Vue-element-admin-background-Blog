import request from "@/utils/request";

// 获取所有项目
export function getAllProject(){
    return request({
        url: '/api/project',
        method: 'get', 
    })
}

// 修改项目
export function updataOneProject(projectInfo){
    return request({
        url:   `/api/project/${projectInfo.id}`,
        method: 'put', 
        data : projectInfo.data
    })
}


// 新增项目
export function AddOneProject(data){
    return request({
        url:   `/api/project`,
        method: 'post', 
        data ,
    })
}

// 删除项目
export function delOneProject(id){
    return request.delete(`/api/project/${id}`);
}