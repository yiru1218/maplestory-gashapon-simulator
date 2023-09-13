/**
 * @description 增加箱子數量、金額
 * @param {string} count
 * @return {{type: int, payload: {count: int}}} action 物件
 */
export function addBox(count) {
    return {
        type: 'buyPetBox/boxAdded',
        payload: {
            count
        }
    }
}

/**
 * @description 增加箱子數量、金額
 * @param {string} count
 * @return {{type: int, payload: {price: int}}} action 物件
 */
export function addPrice(price) {
    return {
        type: 'buyPetBox/priceAdded',
        payload: {
            price
        }
    }
}

/**
 * @description 增加箱子數量、金額
 * @param {string} count
 * @return {{type: int, payload: {count: int}}} action 物件
 */
export function drawBox(count) {
    return {
        type: 'buyPetBox/boxDeleted',
        payload: {
            count
        }
    }
}

/**
 * @description 增加箱子數量、金額
 * @param {string} count
 * @return {{type: int, payload: {count: int}}} action 物件
 */
export function addCurrentUseBox(count) {
    return {
        type: 'currentUsePetBox/currentBoxAdded',
        payload: {
            count
        }
    }
}

