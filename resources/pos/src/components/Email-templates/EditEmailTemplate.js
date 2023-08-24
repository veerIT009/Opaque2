import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWarehouse } from "../../store/action/warehouseAction";
import HeaderTitle from "../header/HeaderTitle";
import MasterLayout from "../MasterLayout";
import { getFormattedMessage } from "../../shared/sharedMethod";
import TopBarProgress from "react-topbar-progress-indicator";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import EmailTemplateForm from "./EmailTemplateForm";
import { fetchEmailTemplate } from "../../store/action/emailTemplatesAction";

const EditEmailTemplate = (props) => {
    const { fetchEmailTemplate, emailTemplates } = props;
    const { id } = useParams();

    useEffect(() => {
        fetchEmailTemplate(id);
    }, []);

    const itemsValue =
        emailTemplates &&
        emailTemplates.length === 1 &&
        emailTemplates.map((emailTemplate) => ({
            name: emailTemplate.attributes.template_name,
            content: emailTemplate.attributes.content,
            id: emailTemplate.id,
        }));

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("email-template.edit.title")}
                to="/admin/pos/email-templates"
            />
            {emailTemplates.length === 1 && (
                <EmailTemplateForm singleEmailTemplate={itemsValue} id={id} />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { emailTemplates } = state;
    return { emailTemplates };
};

export default connect(mapStateToProps, { fetchEmailTemplate })(
    EditEmailTemplate
);
