import request from "@/utils/request";

// 添加分类
export function setBlogType(data){
    return request({
        url: '/api/blogtype',
        method: 'post',
        data
    })
}

// 获取文章分类
export function getBlogType(){
    return request({
        url: `/api/blogtype`,
        method: 'get', 
    }) 
}

// 获取一个分类
export function findOneBlogType(id){
    return request({
        url: `/api/blogtype/${id}`,
        method: 'get', 
    }) 
}

// 删除文章分类接口
export function delBlogType(id) {
    return request.delete(`/api/blogtype/${id}`);
}

// 修改分类
export function updataOneBlogType(editInfo){
    return request({
        url: `/api/blogtype/${editInfo.id}`,
        method: 'put',
        data: editInfo.data
    })
}

// 发布文章
export function addBlog(data){
    return request({
        url: '/api/blog',
        method: 'post',
        data
    })
}

// 分页获取文章
// page yema 
export function getPageBlog(page=1,limit=10, keyword="", categoryId="-1"){
    console.log("数据数据", page,limit,keyword,categoryId)
    return request({
        url: '/api/blog',
        method: 'get',
        params : {
            page,
            limit,
            keyword,
            categoryId 
        }
    })
}

// 删除文章
export function delOneBlog(id) {
    return request.delete(`/api/blog/${id}`);
}

// 获取单篇文章
export function getOneBlog(id){
    return request({
        url:`/api/blog/${id}`,
        method: 'get',
    })
}

// 修改文章
export function updataBlog(editInfo){
    return request({
        url: `/api/blog/${editInfo.id}`,
        method: 'put',
        data: editInfo.data
    })
}
