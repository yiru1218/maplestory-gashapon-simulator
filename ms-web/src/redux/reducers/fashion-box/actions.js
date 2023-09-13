/**
 * @description 增加箱子數量、金額
 * @param {string} count
 * @return {{type: int, payload: {count: int}}} action 物件
 */
export function addBox(count) {
    return {
        type: 'buyFashionBox/boxAdded',
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
        type: 'buyFashionBox/priceAdded',
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
        type: 'buyFashionBox/boxDeleted',
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
        type: 'currentUseFashionBox/currentBoxAdded',
        payload: {
            count
        }
    }
}

