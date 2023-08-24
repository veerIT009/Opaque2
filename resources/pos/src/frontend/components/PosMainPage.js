import React, {useState, useEffect, useRef} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap-v5';
import {connect, useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useReactToPrint} from 'react-to-print';
import Category from './Category';
import Brands from './Brand';
import Product from './product/Product';
import ProductCartList from './cart-product/ProductCartList';
import {posSearchNameProduct, posSearchCodeProduct} from '../../store/action/pos/posfetchProductAction';
import ProductSearchbar from './product/ProductSearchbar';
import {prepareCartArray} from '../shared/PrepareCartArray';
import ProductDetailsModel from '../shared/ProductDetailsModel';
import CartItemMainCalculation from './cart-product/CartItemMainCalculation';
import PosHeader from './header/PosHeader';
import {posCashPaymentAction} from '../../store/action/pos/posCashPaymentAction';
import PaymentButton from './cart-product/PaymentButton';
import CashPaymentModel from './cart-product/paymentModel/CashPaymentModel';
import PrintData from './printModal/PrintData';
import PaymentSlipModal from './paymentSlipModal/PaymentSlipModal';
import {fetchFrontSetting} from '../../store/action/frontSettingAction';
import {fetchSetting} from '../../store/action/settingAction';
import {calculateProductCost} from '../shared/SharedMethod';
import {BarcodeScanner} from '@itexperts/barcode-scanner';
import {fetchBrandClickable, posAllProduct} from "../../store/action/pos/posAllProductAction";
import TabTitle from "../../shared/tab-title/TabTitle";
import HeaderAllButton from "./header/HeaderAllButton";
import RegisterDetailsModel from './register-detailsModal/RegisterDetailsModel';
import PrintRegisterDetailsData from "./printModal/PrintRegisterDetailsData";
import {fetchTodaySaleOverAllReport} from "../../store/action/pos/posRegisterDetailsAction";
import { getFormattedMessage, getFormattedOptions } from '../../shared/sharedMethod';
import { paymentMethodOptions } from '../../constants';
import TopProgressBar from '../../shared/components/loaders/TopProgressBar';
import CustomerForm from './customerModel/CustomerForm';

const PosMainPage = (props) => {
    const {
        onClickFullScreen,
        posAllProducts,
        customCart,
        posCashPaymentAction,
        frontSetting,
        fetchFrontSetting,
        settings,
        fetchSetting,
        paymentDetails,
        allConfigData,
        fetchBrandClickable,
        posAllTodaySaleOverAllReport
    } = props;
    const componentRef = useRef();
    const registerDetailsRef = useRef();
    // const [play] = useSound('https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3');
    const [opneCalculator, setOpneCalculator] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [updateProducts, setUpdateProducts] = useState([]);
    const [isOpenCartItemUpdateModel, setIsOpenCartItemUpdateModel] = useState(false);
    const [product, setProduct] = useState(null);
    const [cartProductIds, setCartProductIds] = useState([]);
    const [newCost, setNewCost] = useState('');
    const [paymentPrint, setPaymentPrint] = useState({});
    const [cashPayment, setCashPayment] = useState(false);
    const [modalShowPaymentSlip, setModalShowPaymentSlip] = useState(false);
    const [modalShowCustomer, setModalShowCustomer] = useState(false);
    const [productMsg, setProductMsg] = useState(0);
    const [brandId, setBrandId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cartItemValue, setCartItemValue] = useState({
        discount: 0,
        tax: 0,
        shipping: 0
    });
    const [cashPaymentValue, setCashPaymentValue] = useState({notes: ''});
    const [errors, setErrors] = useState({notes: ''});
    // const [searchString, setSearchString] = useState('');
    const [keyDown, setKeyDown] = useState(false)

    //total Qty on cart item
    const localCart = updateProducts.map((updateQty) => Number(updateQty.quantity));
    const totalQty = localCart.length > 0 && localCart.reduce((cart, current) => {
        return cart + current
    });

    //subtotal on cart item
    const localTotal = updateProducts.map((updateQty) => calculateProductCost(updateQty).toFixed(2) * updateQty.quantity);
    const subTotal = localTotal.length > 0 && localTotal.reduce((cart, current) => {
        return cart + current
    });

    //grand total on cart item
    const discountTotal = subTotal - cartItemValue.discount
    const taxTotal = discountTotal * cartItemValue.tax / 100
    const mainTotal = discountTotal + taxTotal
    const grandTotal = (Number(mainTotal) + Number(cartItemValue.shipping)).toFixed(2);

    useEffect(() => {
        setPaymentPrint({
            ...paymentPrint,
            barcode_url: paymentDetails.attributes && paymentDetails.attributes.barcode_url,
            reference_code: paymentDetails.attributes && paymentDetails.attributes.reference_code
        })
    }, [paymentDetails])

    useEffect(() => {
        setSelectedCustomerOption(settings.attributes && {
            value: Number(settings.attributes.default_customer),
            label: settings.attributes.customer_name
        });
        setSelectedOption(settings.attributes && {
            value: Number(settings.attributes.default_warehouse),
            label: settings.attributes.warehouse_name
        });
    }, [settings]);

    useEffect(() => {
        fetchSetting();
        fetchFrontSetting();
        fetchTodaySaleOverAllReport()
    }, []);

    useEffect(() => {
        setUpdateProducts(updateProducts);
    }, [quantity, grandTotal]);

    let options = {
        timeOut: 130,
        characterCount: 13
    }

    let barcodeScanner = new BarcodeScanner(options);
    barcodeScanner.addEventListener('scan', function (e) {
        let barcode = e.detail;
        setKeyDown(true)
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if ((cashPaymentValue['notes'] && cashPaymentValue['notes'].length > 100)) {
            errorss['notes'] = 'The notes must not be greater than 100 characters';
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    //filter on category id
    const setCategory = (item) => {
        setCategoryId(item)
    };

    useEffect(() => {
        if (selectedOption) {
            fetchBrandClickable(brandId, categoryId, selectedOption.value && selectedOption.value);
        }
    }, [selectedOption, brandId, categoryId]);

    //filter on brand id
    const setBrand = (item) => {
        setBrandId(item);
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setCashPaymentValue(inputs => ({...inputs, [e.target.name]: e.target.value}));
    };

    // payment type dropdown functionality
    const paymentTypeFilterOptions = getFormattedOptions(paymentMethodOptions)
    const paymentTypeDefaultValue = paymentTypeFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })
    const [paymentValue, setPaymentValue] = useState({
        pyment_type: paymentTypeDefaultValue[0]
    });
    const onPaymentTypeChange = (obj) => {
        setPaymentValue({...paymentValue, pyment_type: obj});
    };

    const onChangeCart = (event) => {
        const {value} = event.target;
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split('.');
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }
        setCartItemValue(inputs => ({...inputs, [event.target.name]: value}));
    };

    //payment slip model onchange
    const handleCashPayment = () => {
        setCashPayment(!cashPayment);
    };

    const updateCost = (item) => {
        setNewCost(item);
    };

    //product details model onChange
    const openProductDetailModal = () => {
        setIsOpenCartItemUpdateModel(!isOpenCartItemUpdateModel);
    };

    //product details model updated value
    const onClickUpdateItemInCart = (item) => {
        setProduct(item);
        setIsOpenCartItemUpdateModel(true);
    };

    const onProductUpdateInCart = () => {
        const localCart = updateProducts.slice();
        updateCart(localCart);
    };

    //updated Qty function
    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const updateCart = (cartProducts) => {
        setUpdateProducts(cartProducts);
    };

    //cart item delete
    const onDeleteCartItem = (productId) => {
        const existingCart = updateProducts.filter((e) => e.id !== productId)
        updateCart(existingCart);
    };

    //product add to cart function
    const addToCarts = (items) => {
        updateCart(items);
    };

    // create customer model
    const customerModel = (val) => {
        setModalShowCustomer(val)
    }

    //prepare data for print Model
    const preparePrintData = () => {
        const formValue = {
            products: updateProducts,
            discount: cartItemValue.discount ? cartItemValue.discount : 0,
            tax: cartItemValue.tax ? cartItemValue.tax : 0,
            cartItemPrint: cartItemValue,
            taxTotal: taxTotal,
            grandTotal: grandTotal,
            shipping: cartItemValue.shipping,
            subTotal: subTotal,
            frontSetting: frontSetting,
            customer_name: selectedCustomerOption,
            settings: settings,
            note: cashPaymentValue.notes,
        }
        return formValue
    };

    //prepare data for payment api
    const prepareData = (updateProducts) => {
        const formValue = {
            date: moment(new Date()).format('YYYY-MM-DD'),
            customer_id: selectedCustomerOption && selectedCustomerOption[0] ? selectedCustomerOption[0].value : selectedCustomerOption && selectedCustomerOption.value,
            warehouse_id: selectedOption && selectedOption[0] ? selectedOption[0].value : selectedOption && selectedOption.value,
            sale_items: updateProducts,
            grand_total: grandTotal,
            payment_status: 1,
            payment_type: paymentValue.pyment_type.value,
            discount: cartItemValue.discount,
            shipping: cartItemValue.shipping,
            tax_rate: cartItemValue.tax,
            note: cashPaymentValue.notes,
            status: 1
        }
        return formValue
    };

    //cash payment method
    const onCashPayment = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            posCashPaymentAction(prepareData(updateProducts), setUpdateProducts, setModalShowPaymentSlip, posAllProduct, {
                brandId,
                categoryId,
                selectedOption
            });
            // setModalShowPaymentSlip(true);
            setCashPayment(false);
            setPaymentPrint(preparePrintData);
            setCartItemValue({
                discount: 0,
                tax: 0,
                shipping: 0
            });
            setCashPaymentValue({notes: ''});
            setCartProductIds('');
        }
    };

    const printPaymentReceiptPdf = () => {
        document.getElementById('printReceipt').click();
    };

    const printRegisterDetails = () => {
        document.getElementById('printRegisterDetailsId').click();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleRegisterDetailsPrint = useReactToPrint({
        content: () => registerDetailsRef.current,
    });

    //payment print
    const loadPrintBlock = () => {
        return (
            <div className='d-none'>
                <button id='printReceipt' onClick={handlePrint}>Print this out!</button>
                <PrintData ref={componentRef}  paymentType={paymentValue.pyment_type.label} allConfigData={allConfigData} updateProducts={paymentPrint}/>
            </div>
        );
    };

    //Register details  slip
    const loadRegisterDetailsPrint = () => {
        return (
            <div className='d-none'>
                <button id='printRegisterDetailsId' onClick={handleRegisterDetailsPrint}>Print this out!</button>
                <PrintRegisterDetailsData ref={registerDetailsRef} allConfigData={allConfigData}  frontSetting={frontSetting} posAllTodaySaleOverAllReport={posAllTodaySaleOverAllReport}
                           updateProducts={paymentPrint}/>
            </div>
        )
    };

    //payment slip
    const loadPaymentSlip = () => {
        return (
            <div className='d-none'>
                <PaymentSlipModal printPaymentReceiptPdf={printPaymentReceiptPdf}
                                  setModalShowPaymentSlip={setModalShowPaymentSlip} frontSetting={frontSetting}
                                  modalShowPaymentSlip={modalShowPaymentSlip} allConfigData={allConfigData} paymentDetails={paymentDetails} updateProducts={paymentPrint}
                                  paymentType={paymentValue.pyment_type.label}/>
            </div>
        )
    };
    const [isDetails, setIsDetails] = useState(null);
    const [lgShow, setLgShow] = useState(false);

    const onClickDetailsModel = (isDetails = null) => {
        setLgShow(true)
    };

    return (
        <Container className='pos-screen px-3' fluid>
            <TabTitle title="POS"/>
            {loadPrintBlock()}
            {loadPaymentSlip()}
            {loadRegisterDetailsPrint()}
            <Row>
            <TopProgressBar />
                <Col lg={5} xxl={4} xs={12}>
                    <PosHeader setSelectedCustomerOption={setSelectedCustomerOption} selectedCustomerOption={selectedCustomerOption}
                               setSelectedOption={setSelectedOption} selectedOption={selectedOption} customerModel={customerModel}
                               updateCustomer={modalShowCustomer}
                    />
                    <div className='left-content custom-card mb-3 p-3'>
                        <div className='main-table overflow-auto'>
                            <Table className="mb-0">
                                <thead className='position-sticky top-0'>
                                <tr>
                                    <th style={{minWidth: '164px'}}>{getFormattedMessage("pos-product.title")}</th>
                                    <th style={{minWidth: '118px'}}>{getFormattedMessage('pos-qty.title')}</th>
                                    <th style={{minWidth: '140px'}}>{getFormattedMessage('pos-price.title')}</th>
                                    <th style={{minWidth: '135px'}}
                                        colSpan='2'>{getFormattedMessage('pos-sub-total.title')}</th>
                                </tr>
                                </thead>
                                <tbody className='border-0'>
                                {updateProducts && updateProducts.length ? updateProducts.map((updateProduct, index) => {
                                    return <ProductCartList singleProduct={updateProduct} index={index}
                                                            posAllProducts={posAllProducts}
                                                            onClickUpdateItemInCart={onClickUpdateItemInCart}
                                                            updatedQty={updatedQty} updateCost={updateCost}
                                                            onDeleteCartItem={onDeleteCartItem} quantity={quantity}
                                                            frontSetting={frontSetting} newCost={newCost} allConfigData={allConfigData}
                                                            setUpdateProducts={setUpdateProducts}/>
                                }):  <tr>
                                <td colSpan={4} className='custom-text-center text-gray-900 fw-bold py-5'>{getFormattedMessage('sale.product.table.no-data.label')}</td>
                            </tr>}
                                </tbody>
                            </Table>
                        </div>
                         <CartItemMainCalculation totalQty={totalQty} subTotal={subTotal} grandTotal={grandTotal}
                                                  cartItemValue={cartItemValue} onChangeCart={onChangeCart}
                                                  allConfigData={allConfigData}
                                                  frontSetting={frontSetting}/>
                        <PaymentButton updateProducts={updateProducts} setUpdateProducts={setUpdateProducts} setCartItemValue={setCartItemValue} setCashPayment={setCashPayment}
                                           cartItemValue={cartItemValue} grandTotal={grandTotal} subTotal={subTotal}/>
                    </div>
                </Col>
                <Col lg={7} xxl={8} xs={12} className='ps-lg-0'>
                    <div className='right-content mb-3'>
                        <div className="d-sm-flex align-items-center">
                            <ProductSearchbar customCart={customCart} setUpdateProducts={setUpdateProducts}
                                              updateProducts={updateProducts}
                                // handleOnSelect={handleOnSelect} handleOnSearch={handleOnSearch}
                                // searchString={searchString}
                            />
                            <HeaderAllButton goToDetailScreen={onClickDetailsModel} onClickFullScreen={onClickFullScreen} opneCalculator={opneCalculator} setOpneCalculator={setOpneCalculator}/>
                        </div>
                        <div className='custom-card h-100'>
                            <div className='p-3'>
                                <Category setCategory={setCategory} brandId={brandId} selectedOption={selectedOption}/>
                                <Brands categoryId={categoryId} setBrand={setBrand} selectedOption={selectedOption}/>
                            </div>
                            <Product cartProducts={updateProducts} updateCart={addToCarts} customCart={customCart}
                                     setCartProductIds={setCartProductIds} cartProductIds={cartProductIds}
                                     settings={settings} productMsg={productMsg} selectedOption={selectedOption}/>
                        </div>
                    </div>
                </Col>
            </Row>
            {isOpenCartItemUpdateModel &&
            <ProductDetailsModel openProductDetailModal={openProductDetailModal} productModelId={product.id}
                                 onProductUpdateInCart={onProductUpdateInCart} updateCost={updateCost}
                                 cartProduct={product} isOpenCartItemUpdateModel={isOpenCartItemUpdateModel}
                                 frontSetting={frontSetting}/>
            }
            {cashPayment &&
            <CashPaymentModel cashPayment={cashPayment} totalQty={totalQty} cartItemValue={cartItemValue}
                              onChangeInput={onChangeInput}
                              cashPaymentValue={cashPaymentValue} allConfigData={allConfigData}
                              subTotal={subTotal} onPaymentTypeChange={onPaymentTypeChange}
                              grandTotal={grandTotal} onCashPayment={onCashPayment} taxTotal={taxTotal}
                              handleCashPayment={handleCashPayment} settings={settings} errors={errors}
                              paymentTypeDefaultValue={paymentTypeDefaultValue}
                              paymentTypeFilterOptions={paymentTypeFilterOptions}
            />
            }
            {lgShow && <RegisterDetailsModel printRegisterDetails={printRegisterDetails} frontSetting={frontSetting}
                                             lgShow={lgShow} setLgShow={setLgShow}/>}
            {modalShowCustomer && <CustomerForm  show={modalShowCustomer} hide={setModalShowCustomer} />}
        </Container>
    )
};

const mapStateToProps = (state) => {
    const {posAllProducts, frontSetting, settings, cashPayment, allConfigData, posAllTodaySaleOverAllReport} = state;
    return {posAllProducts, frontSetting, settings, paymentDetails: cashPayment, customCart: prepareCartArray(posAllProducts), allConfigData, posAllTodaySaleOverAllReport}
};

export default connect(mapStateToProps, {
    fetchSetting,
    fetchFrontSetting,
    posSearchNameProduct,
    posCashPaymentAction,
    posSearchCodeProduct,
    posAllProduct,
    fetchBrandClickable,
})(PosMainPage);
