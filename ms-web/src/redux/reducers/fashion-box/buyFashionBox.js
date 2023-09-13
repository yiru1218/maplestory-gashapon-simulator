// state 初始值
const initialState = {
    boxCount: 0,
    totalPrice: 0,
    count: 0,
}

/**
 * @description 處理 todos 相關的 reducer 
 * @param {object} state 狀態值，會給予一個初始值 initialState
 * @param {object} action 動作
 */
export default function buyFashionBoxReducer(state = initialState, action) {

    // 根據不同類型的 action 做處理
    // 在 Redux 概念中所有的 state 更新是不可變的，因此需要複製原有的 state 進行修改
    switch (action.type) {
        case 'buyFashionBox/boxAdded': {
            return {
                ...state,
                boxCount: state.boxCount + 10,
            };
        }
        case 'buyFashionBox/priceAdded': {
            return {
                ...state,
                // totalPrice: state.totalPrice + action.payload.price
                totalPrice: state.totalPrice + 270
            }
        }
        case 'buyFashionBox/boxDeleted': {
            return {
                ...state,
                boxCount: state.boxCount - 1
            }
        }
        case 'currentUseFashionBox/currentBoxAdded': {
            return {
                ...state,
                count: state.count + 1
            }
        }
        default: return state;
    }
}
