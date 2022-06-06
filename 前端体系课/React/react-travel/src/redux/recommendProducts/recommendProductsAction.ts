import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息api调用失败

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any;
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any;
}

export type RecommendProductAction =
    | FetchRecommendProductsStartAction
    | FetchRecommendProductsSuccessAction
    | FetchRecommendProductsFailAction;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    };
};

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

export const giveMeDataActionCreator = (): ThunkAction<void, RootState, null, RecommendProductAction> =>
    async (dispetch, getState) => {
        dispetch(fetchRecommendProductStartActionCreator());
        try {
            const { data } = await axios.get(
                "http://123.56.149.216:8080/api/productCollections"
            );
            dispetch(fetchRecommendProductSuccessActionCreator(data));
        } catch (error: any) {
            dispetch(fetchRecommendProductFailActionCreator(error.message));
        }
    }