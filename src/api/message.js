import request from "@/utils/request";
 
// 获取所有评论
export function getAllMessage(page=1,limit=10) {
  return request({
    url: '/api/message',
    method: 'get',
    params : {
      page,
      limit 
    }
  })
}


// 删除评论id 留言id
export function delOneMessage(id){ 
  return request.delete(`/api/message/${id}`);
}