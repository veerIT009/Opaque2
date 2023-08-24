import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";

const Toast = (props) => {
    const { onCancel, language } = props;

    useEffect(() => {
        setTimeout(() => onCancel(), 2000);
    }, []);

    return (
        <ToastContainer
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={language === "ar" ? true : false}
            draggable
            pauseOnFocusLoss
        />
    );
};

Toast.propTypes = {
    onCancel: PropTypes.func,
};

export default Toast;
