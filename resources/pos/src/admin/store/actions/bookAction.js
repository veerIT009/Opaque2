import { bookActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { apiBaseURL, Routes } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";

export const fetchBooks =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.BOOK;
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                }
                isLoading ? dispatch(setLoading(false)) : null;
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                isLoading ? dispatch(setLoading(false)) : null;
            });
    };

export const fetchCommingBooks =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.UPCOMMING_BOOKS;
        if (
            !_.isEmpty(filter) &&
            (filter.limit || filter.order_By || filter.search)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_UPCOMMING_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                }
                isLoading ? dispatch(setLoading(false)) : null;
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                isLoading ? dispatch(setLoading(false)) : null;
            });
    };
export const fetchBook =
    (bookId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(isLoading));
        await apiConfig
            .get(apiBaseURL.BOOK + "/" + bookId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOK,
                        payload: response.data.data,
                    });
                }
                dispatch(setLoading(false));
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                dispatch(setLoading(false));
            });
    };

export const addBook = (book, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData
        .post(apiBaseURL.BOOK, book)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.ADD_BOOK,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "books.success.create.message"
                        ),
                    })
                );
                // history("/admin" + Routes.BOOKS);
            }
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
            dispatch(setLoading(false));
        });
};

export const editBook =
    (bookId, book, history = null) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfigWthFormData
            .post(apiBaseURL.BOOK + "/" + bookId, book)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.EDIT_BOOK,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "books.success.edit.message"
                            ),
                        })
                    );
                    if (history) {
                        history(Routes.BOOKS);
                    } else {
                        dispatch(toggleModal());
                    }
                }
                dispatch(setLoading(false));
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                dispatch(setLoading(false));
            });
    };

export const deleteBook =
    (bookId, filterObj = {}) =>
    async (dispatch) => {
        await apiConfig
            .delete(apiBaseURL.BOOK + "/" + bookId)
            .then(() => {
                dispatch(fetchBooks(filterObj));
                dispatch({ type: bookActionType.DELETE_BOOK, payload: bookId });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "books.success.delete.message"
                        ),
                    })
                );
                dispatch(toggleModal());
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
            });
    };

export const exportBook =
    (cb, isLoading = true) =>
    async (dispatch) => {
        isLoading ? dispatch(setLoading(true)) : null;
        let url = apiBaseURL.BOOKS_EXPORT;
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.EXPORT_BOOK,
                        payload: response.data.data,
                    });
                    isLoading ? dispatch(setLoading(false)) : null;
                    dispatch(addToast({ text: response.data.message }));
                    cb({ url: response.data.data });
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
                isLoading ? dispatch(setLoading(false)) : null;
            });
    };
