import { configureStore } from '@reduxjs/toolkit'
import buyFashionBoxReducer from './reducers/fashion-box/buyFashionBox'
import buyPetBoxReducer from './reducers/pet-box/buyPetBox'
import awardReducer from './reducers/award-list/addAward'

// 教學：https://www.tpisoftware.com/tpu/articleDetails/2820

export default configureStore({
    reducer: {
        buyFashionBox: buyFashionBoxReducer,
        buyPetBox: buyPetBoxReducer,
        addAward: awardReducer,
    }
})