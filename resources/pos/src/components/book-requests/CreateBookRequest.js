import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BookRequestForm from "./BookRequestForm";
import Modal from "../../shared/components/Modal";
import { addBookRequest } from "../../admin/store/actions/bookRequestAction";

const CreateBookRequest = (props) => {
    const { addBookRequest, toggleModal } = props;

    const onSaveBookRequest = (formValues) => {
        addBookRequest(formValues);
    };

    const prepareFormOption = {
        onSaveBookRequest,
        onCancel: toggleModal,
    };

    return (
        <Modal
            {...props}
            content={<BookRequestForm {...prepareFormOption} />}
        />
    );
};

CreateBookRequest.propTypes = {
    addBookRequest: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookRequest })(CreateBookRequest);
