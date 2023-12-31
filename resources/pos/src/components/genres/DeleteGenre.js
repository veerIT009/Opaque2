import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../shared/components/Modal";
import DeleteAction from "../../shared/action-buttons/DeleteAction";
import { deleteGenre } from "../../admin/store/actions/genreAction";
import { Filters } from "../../constants";

const DeleteGenre = (props) => {
    const { genreId, deleteGenre, toggleModal, totalRecord } = props;

    const onDeleteGenre = () => {
        deleteGenre(genreId, Filters.OBJ, totalRecord);
    };

    return (
        <Modal
            {...props}
            actions={
                <DeleteAction onDelete={onDeleteGenre} onCancel={toggleModal} />
            }
        />
    );
};

DeleteGenre.propTypes = {
    genreId: PropTypes.number,
    deleteGenre: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteGenre })(DeleteGenre);
