import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any; // 请求返回到的数据
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductAction = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  }
}

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  }
}

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  }
}
// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰


/**
 * redux还有其他的异步流管理方案 redux-thunk, redux-promise,redux_saga
 * redux 中间件公式
 * const middleware = (store) => (next)=>(action)=>{}
 */
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> => async (dispatch, getState)=> {
  dispatch(fetchRecommendProductStartActionCreator())
  try {
    const { data } = await axios.get(`http://123.56.149.216:8080/api/productCollections`)
    console.log('.......', data)
    // this.setState({
    //   productList: data,
    //   loading: false,
    //   error: null
    // })
    // this.props.fetchSuccess(data)
    dispatch(fetchRecommendProductSuccessActionCreator(data))
  } catch (error: any) {
    // this.setState({
    //   loading: false,
    //   error: '请求失败'
    // })
    // this.props.fetchFail(error.message)
    dispatch(fetchRecommendProductFailActionCreator(error.message))

  }
}