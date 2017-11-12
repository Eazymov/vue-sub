const isObject = (object) => {
    return typeof object === 'object' && !object.reduce;
};
const isArray = (array) => {
    return !!array.reduce;
};
const isValidObservers = (observers) => {
    if (!isObject(observers))
        return false;
    return every(Object.keys(observers), (key) => {
        const handlers = observers[key];
        if (!isArray(handlers))
            return false;
        return every(handlers, (handler) => {
            return typeof handler === 'function';
        });
    });
};
const forEach = (array, handler) => {
    for (let i = 0; i < array.length; i++)
        handler(array[i], i);
};
const every = (array, checker) => {
    for (let i = 0; i < array.length; i++) {
        if (!checker(array[i], i))
            return false;
    }
    return true;
};
export { isObject, isArray, isValidObservers, forEach, every, };
