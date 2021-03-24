import q from 'query-string';

import { API_URL } from './constant'

export const getQueryParams = (key = '', queryString = window.location.search) => {
    const values = q.parse(queryString);
    return key ? values[key] : values;
}

export const setQueryStringValue = (params, queryString = window.location.search) => {
    const values = q.parse(queryString);
    const newQsValue = q.stringify({ ...values, ...params });
    console.log("valuesvalues", values, "newQsValuenewQsValuenewQsValue", newQsValue, "params", params);
    const path = `${window.location.pathname}?${newQsValue}`;
    if (window.history.pushState) {
        var newurl = window.location.protocol + '//' + window.location.host + path;
        window.history.pushState({ path: newurl }, '', newurl);
    }
};

export const FetchData = (cb, state, params = {}) => {
    setQueryStringValue(params, {});
    let qString = q.stringify({ ...params });
    fetch(API_URL + `&${qString}`)
        .then(response => response.json())
        .then(res => cb({ ...state, data: res, isLoading: false }))
        .catch(err => console.log("i am error", err))
}

