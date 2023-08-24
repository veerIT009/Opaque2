import React, { useEffect } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { useNavigate } from "react-router-dom";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import { addTransfer } from "../../store/action/transfersAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import TransferForm from "./TransferForm";

const CreateTransfer = (props) => {
    const {
        addTransfer,
        warehouses,
        fetchAllWarehouses,
        fetchAllSuppliers,
        suppliers,
    } = props;
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllWarehouses();
        fetchAllSuppliers();
    }, []);

    const addTtansferData = (formValue) => {
        addTransfer(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle
                title={getFormattedMessage("transfer.create.title")}
                to="/admin/pos/transfers"
            />
            <TransferForm
                addTtansferData={addTtansferData}
                warehouses={warehouses}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { warehouses, suppliers, totalRecord } = state;
    return { warehouses, suppliers, totalRecord };
};

export default connect(mapStateToProps, {
    addTransfer,
    fetchAllWarehouses,
    fetchAllSuppliers,
})(CreateTransfer);
