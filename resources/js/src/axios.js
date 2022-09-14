// axios
import axios from 'axios'

const baseURL = 'https://scoolio-backend-dev.track-progress.com/api';

const request = axios.create({
  baseURL,
  headers:{
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjNiOGQxOWM3ODQwZTA4NWI1MGI1MWE4MmI1N2VkOWMzMjUwZjNiM2Q5MTVjMjkzOWNhMjcyYTQzODZlOTk5OTY2NThlYmQ5MDc3NTIyN2I4IiwiaWF0IjoxNjYxMzgzMzM0LCJuYmYiOjE2NjEzODMzMzQsImV4cCI6MTY5MjkxOTMzNCwic3ViIjoiMTQ1MCIsInNjb3BlcyI6W119.korUh7_N7LwuWU9WsNjJtKocLmJKUcQy5qwm809M7X_DLag7QH_LvDp7vtV295vJojqDIBVwQat1Mg7uUkJSLmQh8qryH2Ht88B6dqQuOjVtwiGgZMww-9USmmScCd4u3d1cNQ-8JMmjgXTy3o4Xduv0MxVBvT65AXjKeEjRaxk_MooTlq5qFAScEc4QC8YeV20mAr4AqsfnrZ-NGQ243zEy8qMyyaIwtwniuDRbs_84U1HP6CoVOMNJULwd2WGSftpYfMB8oMspPmvVlg-KE_NxNFJngdinyz2cP_-NBc3YPvbgabac1gywrlZo5yE0qE8CjA8u-6_8O15sCssdeaCzIgHFz4FPMJxZ_J8tph9rRga1fPCNKlBAZWEWlcIY28zQGQhM8qLTiiE3Dlbr1CuiTGWrPgQ1r2DlsplFGsLLJkRAOvknwsSi8L9a-DnETINSJnUNvKI0-JRoOOx0XB-rYt__3Ft5kbILSE7geebzx3VZaEBQKpyEvzyE4x9ZeBFg7EJ58IHgKxaSI37OB2CEhNwCalGS7g_i2rUaWFNpVVJqDrS9Np1EhjnExoRq2b_OsLVFterOSlymyjd5j3mrzNH6GX_zemUgHezjbHHpeTFHHRcIel-6hr2Ww_86v4aUY5saQyAw3binALGPhJkg_palVmlaDzrDFNJvtvU"
  }
}) 

export default request

export function UploadImage (payload, customer_id) {
  return request({
    url:`/file/upload/${customer_id}`,
    method:'POST',
    data:payload
  })
}

export function getUploadedFilesId (payload) {
  return request({
    url:'/file/upload/add',
    method:'POST',
    data:payload,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function repoDetails (customer_id, repo_id) {
  return request({
    url: `/file/repository/show/${customer_id}/${repo_id}`,
    method: 'GET'
  })
}

export function saveUploadFileApi (payload) {
  return request({
    url: 'certificate/file/save',
    method: 'POST',
    data:payload
  })
}
