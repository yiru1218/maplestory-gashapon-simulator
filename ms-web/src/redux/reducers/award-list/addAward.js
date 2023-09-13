const initialState = {
    chatAwards: [],
    fashionAwards: [],
    petAwards: []
}

/**
 * @description 處理 todos 相關的 reducer 
 * @param {object} state 狀態值，會給予一個初始值 initialState
 * @param {object} action 動作
 */
export default function awardReducer(state = initialState, action) {

    switch (action.type) {
        case 'addAward/awardAdded': {
            return {
                ...state, // 保留未更新的 award 類別
                chatAwards: [
                    ...state.chatAwards, // 在 Redux 概念中所有的 state 更新是不可變的，因此需要複製原有的 state 進行修改
                    {
                        type: action.payload.type,
                        award: action.payload.award
                    }
                ]
            }
        }
        case 'addFashionAward/fashionAwardAdded': {
            return {
                ...state,
                fashionAwards: [
                    ...state.fashionAwards,
                    action.payload.award
                ]
            }
        }
        case 'addPetAward/petAwardAdded': {
            return {
                ...state,
                petAwards: [
                    ...state.petAwards,
                    action.payload.award
                ]
            }
        }
        default: return state
    }
    
    
}