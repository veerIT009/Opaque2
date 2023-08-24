import apiConfig from "../../config/apiConfig";
import { apiBaseURL, warehouseActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchWarehouses =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.WAREHOUSES;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter);
        }
        apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: warehouseActionType.FETCH_WAREHOUSES,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
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
            });
    };

export const fetchWarehouse =
    (warehouseId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        apiConfig
            .get(apiBaseURL.WAREHOUSES + "/" + warehouseId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: warehouseActionType.FETCH_WAREHOUSE,
                        payload: response.data.data,
                    });
                }

                dispatch(setLoading(false));
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const addWarehouse = (warehouse, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.WAREHOUSES, warehouse)
        .then((response) => {
            if (response) {
                dispatch({
                    type: warehouseActionType.ADD_WAREHOUSE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "warehouse.success.create.message"
                        ),
                    })
                );
                navigate("/admin/pos/warehouse");
                dispatch(addInToTotalRecord(1));
                dispatch(setSavingButton(false));
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            }
        });
};

export const editWarehouse =
    (warehouseId, warehouse, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .patch(apiBaseURL.WAREHOUSES + "/" + warehouseId, warehouse)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: warehouseActionType.EDIT_WAREHOUSE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "warehouse.success.edit.message"
                            ),
                        })
                    );
                    navigate("/admin/pos/warehouse");
                    dispatch(setSavingButton(false));
                }
            })
            .catch(({ response }) => {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const deleteWarehouse = (warehouseId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.WAREHOUSES + "/" + warehouseId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: warehouseActionType.DELETE_WAREHOUSE,
                payload: warehouseId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "warehouse.success.delete.message"
                    ),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchAllWarehouses = () => async (dispatch) => {
    apiConfig
        .get(`warehouses?page[size]=0`)
        .then((response) => {
            dispatch({
                type: warehouseActionType.FETCH_ALL_WAREHOUSES,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchWarehouseDetails =
    (WarehouseId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));

        apiConfig
            .get(apiBaseURL.WAREHOUSE_DETAILS + "/" + WarehouseId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: warehouseActionType.FETCH_WAREHOUSE_DETAILS,
                        payload: response.data.data,
                    });
                }

                dispatch(setLoading(false));
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };
