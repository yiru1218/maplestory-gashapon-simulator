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
export default function buyPetBoxReducer(state = initialState, action) {

    // 根據不同類型的 action 做處理
    // 在 Redux 概念中所有的 state 更新是不可變的，因此需要複製原有的 state 進行修改
    switch (action.type) {
        case 'buyPetBox/boxAdded': {
            return {
                ...state,
                boxCount: state.boxCount + 10,
            };
        }
        case 'buyPetBox/priceAdded': {
            return {
                ...state,
                totalPrice: state.totalPrice + 499
            }
        }
        case 'buyPetBox/boxDeleted': {
            return {
                ...state,
                boxCount: state.boxCount - 1
            }
        }
        case 'currentUsePetBox/currentBoxAdded': {
            return {
                ...state,
                count: state.count + 1
            }
        }
        default: return state;
    }
}
