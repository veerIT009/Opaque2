import React, {useEffect} from 'react'
import { currencySymbolHendling, getFormattedMessage } from '../../../shared/sharedMethod';
import Modal from 'react-bootstrap/Modal';
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {fetchTodaySaleOverAllReport} from "../../../store/action/pos/posRegisterDetailsAction";
import moment from "moment";


function RegisterDetailsModel(props) {
    const { lgShow, setLgShow, posAllTodaySaleOverAllReport,printRegisterDetails,  fetchTodaySaleOverAllReport, frontSetting, allConfigData} = props;

    useEffect(()=> {
       fetchTodaySaleOverAllReport()
    },[]);

    const onsetLgShow = () => {
        setLgShow(false)
    }

    const currencySymbol = frontSetting && frontSetting.value && frontSetting.value.currency_symbol
    const sumOfProductQuantity = posAllTodaySaleOverAllReport?.today_total_products_sold?.reduce((acc, o) => acc + parseInt(o.total_quantity), 0)
    const sumOfBrandQuantity = posAllTodaySaleOverAllReport?.today_brand_report?.reduce((acc, o) => acc + parseInt(o.total_quantity), 0)

    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="example-custom-modal-styling-title"
                show={lgShow}
                onHide={() => onsetLgShow()}
                className='registerModel-content'
            >
                <Modal.Header closeButton className='p-4'>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {getFormattedMessage("register.details.title")} ({moment(Date()).format('MMMM Do YYYY')})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-3' >
                    <Table responsive bordered hover className='m-0 registerModel'>
                        <tbody>
                            <tr>
                                {/* <th>#</th> */}
                                <th>{getFormattedMessage("select.payment-type.label")}</th>
                                <th>{getFormattedMessage("expense.input.amount.label")}</th>
                            </tr>
                            <tr>
                                {/* <td>2</td> */}
                                <td>{getFormattedMessage("cash.label")}: </td>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_cash_payment)}</td>
                            </tr>
                            <tr>
                                {/* <td>3</td> */}
                                <td>{getFormattedMessage("payment-type.filter.cheque.label")}: </td>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_cheque_payment)}</td>
                            </tr>
                            <tr>
                                {/* <td>5</td> */}
                                <td>{getFormattedMessage("payment-type.filter.bank-transfer.label")}: </td>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_bank_transfer_payment)}</td>
                            </tr>
                            <tr>
                                {/* <td>4</td> */}
                                <td>{getFormattedMessage("payment-type.filter.other.label")}: </td>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_other_payment)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr className='m-1'></hr>
                    <Table responsive bordered hover className='m-0 registerModel'>
                        <tbody>
                            <tr>
                                {/* <td>#</td> */}
                                <td>{getFormattedMessage("register.total-sales.label")}:</td>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_total_amount)}</td>
                            </tr>
                            <tr>
                                <th>{getFormattedMessage("register.total-refund.title")}</th>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_total_return_amount)}</td>
                            </tr>
                            <tr>
                                <th>{getFormattedMessage("register.total-payment.title")}</th>
                                <td>{currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.today_sales_payment_amount)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr className='m-1'></hr>
                    <Modal.Title className='p-0 py-3' id="example-modal-sizes-title-lg">
                        {getFormattedMessage("register.product.sold.title")}
                    </Modal.Title>
                    <Table responsive bordered hover className='m-0 registerModel'>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>SKU</th>
                                <th>{getFormattedMessage("product.title")}</th>
                                <th>{getFormattedMessage("dashboard.stockAlert.quantity.label")}</th>
                                <th>{getFormattedMessage("pos-total-amount.title")}</th>
                            </tr>
                            { posAllTodaySaleOverAllReport?.today_total_products_sold?.map((pro, index)=> {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{pro.reference_code}</td>
                                        <td>{pro.name}</td>
                                        <td>{pro.total_quantity}</td>
                                        <td>{currencySymbolHendling(allConfigData, currencySymbol, pro.grand_total)}</td>
                                    </tr>
                                )
                            })}
                            <tr className='p-sold'>
                                <th colSpan={3}>#</th>
                                <th>{sumOfProductQuantity}</th>
                                <th><span>{getFormattedMessage("globally.detail.discount")}: (-) {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_discount_amount)}</span><br />
                                    <span>{getFormattedMessage("globally.detail.tax")}: (+) {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_tax_amount)}</span><br />
                                    <span>{getFormattedMessage("globally.detail.shipping")}: (+) {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_shipping_amount)}</span><br />
                                <span>{getFormattedMessage("globally.detail.grand.total")}: {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_grand_total_amount)}</span></th>
                            </tr>
                        </tbody>
                    </Table>
                    <hr  className='m-1'></hr>
                    <Modal.Title className='p-0 py-3' id="example-modal-sizes-title-lg">
                        {getFormattedMessage("register.product.sold.by.brand.title")}
                    </Modal.Title>
                    <Table responsive bordered hover className='m-0 registerModel'>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>{getFormattedMessage("brand.title")}</th>
                                <th>{getFormattedMessage("dashboard.stockAlert.quantity.label")}</th>
                                <th>{getFormattedMessage("pos-total-amount.title")}</th>
                            </tr>
                            { posAllTodaySaleOverAllReport?.today_brand_report?.map((pro, index)=> {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{pro.name}</td>
                                        <td>{pro.total_quantity}</td>
                                        <td>{currencySymbolHendling(allConfigData, currencySymbol, pro.grand_total)}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th colSpan={2}>#</th>
                                <th>{sumOfBrandQuantity}</th>
                                <th><span>{getFormattedMessage("globally.detail.discount")}: (-) {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_discount_amount)}</span><br />
                                    <span>{getFormattedMessage("globally.detail.tax")}: (+) {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_tax_amount)}</span><br />
                                    <span>{getFormattedMessage("globally.detail.shipping")}: (+) {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_shipping_amount)}</span><br />
                                    <span>{getFormattedMessage("globally.detail.grand.total")}: {currencySymbolHendling(allConfigData, currencySymbol, posAllTodaySaleOverAllReport?.all_grand_total_amount)}</span></th>
                            </tr>
                        </tbody>
                    </Table>
                    <hr  className='m-1'></hr>
                </Modal.Body>
                <Modal.Footer className='justify-content-end pt-2 pb-3'>
                 <button className='btn btn-primary text-white'
                         onClick={printRegisterDetails}
                 >{getFormattedMessage("print.title")}</button>
                <button className='btn btn-secondary'
                        onClick={() => setLgShow(false)}>{getFormattedMessage("pos-close-btn.title")}
                </button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {posAllTodaySaleOverAllReport, allConfigData} = state;
    return {posAllTodaySaleOverAllReport, allConfigData}
};

export default connect(mapStateToProps, {fetchTodaySaleOverAllReport})(RegisterDetailsModel);
