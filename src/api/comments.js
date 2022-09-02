import request from "@/utils/request";
 
// 获取所有评论
export function getAllComments(page=1,limit=10,blogid=-1,keyword=null) {
  return request({
    url: '/api/comment',
    method: 'get',
    params : {
      page,
      limit, 
      blogid,
      keyword
    }
  })
}


// 删除评论
export function delOneComment(id){ 
  return request.delete(`/api/comment/${id}`);
}