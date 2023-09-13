/**
 * @description 列表增加獎品
 * @param {string} type award
 * @return {{type: string, payload: {award: string}}} action 物件
 */
export function addAward(type, award) {
    return {
        type: 'addAward/awardAdded',
        payload: {
            type,
            award
        }
    }
}

/**
 * @description 列表增加獎品
 * @param {string} award
 * @return {{type: string, payload: {award: string}}} action 物件
 */
export function addFashionAward(award) {
    return {
        type: 'addFashionAward/fashionAwardAdded',
        payload: {
            award
        }
    }
}

/**
 * @description 列表增加獎品
 * @param {string} award
 * @return {{type: string, payload: {award: string}}} action 物件
 */
export function addPetAward(award) {
    return {
        type: 'addPetAward/petAwardAdded',
        payload: {
            award
        }
    }
}