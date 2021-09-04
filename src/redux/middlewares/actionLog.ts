import { Middleware } from 'redux'
export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log('当前state的状态', store.getState())
  console.log('触发的action', action)
  next(action)
  console.log('更新后的store状态',store.getState()) 
}