import mongoose from 'mongoose';

const { isObjectIdOrHexString } = mongoose;

export function _validateID(value, helper, doc) {
    if (!isObjectIdOrHexString(value)) {
        return helper.message(`Invalid ${doc} ID value`)
    }
    return value;
}