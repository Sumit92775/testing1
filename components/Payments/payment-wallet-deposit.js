import {Form, Select, Input, Slider, Divider, Button, Checkbox} from 'antd';
// import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import styles from '../../styles/components/Payments-Wallet-Deposit.module.scss'
// import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
// import images from 'react-payment-inputs/images';
// import { css } from 'styled-components';
import UserBnkDetails from './user-bnk-details';

const PaymentWalletDeposit = () =>{


    // Select Input
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const validList = [{value : 1},{value : 2}];

    // Slider Input
    const style = {
        display: 'inline-block',
        height: 'fit-content',
        width : '98.6%',
      };
      
      const marks = {
        0: '0',
        20: '250',
        40: '500',
        60: {
          label: 1000,
        },
        80: '1500',
         100: {
             style : {
                transform: 'translateX(-92%)',
             },
             label : 2000,
         } ,
      };

      function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }

    return(
        <div>
            <span><span className="material-icons">arrow_back_ios</span>Go Back</span>
            <div className={styles['wallet-deposit-container']}>

                <div className="mb-20" style={{height : 'fit-content'}}>
                    <div className="card card2 p-0 mb-10" style={{height : "fit-content", position : "relative"}}>
                        <h5 className="mt-22 pb-21 pl-27 pr-27" style={{borderBlockEnd : "var(--border-neutral-3)"}}>Deposit Money</h5>
                        <Form className="ml-36 mr-36">
                            <Form.Item className="mt-19" label="Currency">
                                <Select className="h43" onChange={handleChange}>
                                    {validList.map((obj)=>{
                                        return <Option key={`${obj.value}`} value={`${obj.value}`}>{obj.value}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item className="mt-18" label="Amount">
                                <Input className="ht43" placeholder="Basic usage" style={{height : "45px"}}/>
                            </Form.Item>
                            
                            <Form.Item className="mt-43">
                                <div style={style}>
                                    <Slider dots={false} range marks={marks}/>
                                </div>
                            </Form.Item>
                        
                            <Form.Item className="mt-15">
                                <Divider></Divider>
                            </Form.Item>
                            
                            <Form.Item>
                                <div className={styles['total-price']}>
                                    <h5><strong>Total</strong></h5>
                                    <h5><strong>$500.00</strong></h5>
                                </div>
                            </Form.Item>

                            <Form.Item className="mt-26 mb-36">
                                <Button className="primary full-width">Confirm &amp; Deposit $ 50.00</Button>
                            </Form.Item>

                        </Form>

                    </div>  
                    <span className={styles['tac']}>By confirming deposit you agree to the terms and conditions of saloon plus</span>
                </div>
                {/* <div className={styles['payment-method-modal']}> */}
                    <div className="card card2 p-0" style={{height : "fit-content"}}>
                        <h5 className="mt-22 pb-21 pl-27 pr-27" style={{borderBlockEnd : "var(--border-neutral-3)"}}>Payment Method</h5>
                        <div className={styles['payment-card-detail-container']}>
                            <div className={styles['card-details']}>
                                <div className={styles['top-container']}>
                                    <div className={styles['top-container-top']}>
                                        <span className="fz-11 lh-11">Account Holder</span>
                                        <span><strong>Halais</strong></span>
                                        
                                    </div>
                                    <div className={styles['top-container-bottom']}>
                                        <div className={styles['top-container-bottom-left']}>
                                           <div className={styles['top-container-bottom-left-checkbox']}>
                                               <Checkbox></Checkbox>
                                           </div>

                                           <div className={styles['top-containe-bottom-left-card-details']}>
                                                {/* <PaymentInputsWrapper {...wrapperProps} styles={{inputWrapper : {base : css`height : 49px !important;border-radius : 6px;border: var(--border-2) !important;display : grid !important; grid-template-columns : 60% auto auto !important`},fieldWrapper: { base: css`height: 33px !important;padding-bottom : 10px !important`},input: { base: css`height: 30px !important;border: none;border : none !important;box-shadow : none !important;width : 80%`, cardNumber : css`width : 90%`, provider : css`font-size : 43px !important`}}}>
                                                    <input {...getCardNumberProps()}  />
                                                    <input {...getExpiryDateProps()}/>
                                                    <svg {...getCardImageProps({ images })} fontSize="23px" />
                                                </PaymentInputsWrapper> */}
                                                <Input></Input>
                                                <div className={styles['cvp-container']}>
                                                    <span>Card Number</span>
                                                    <span>Valid Thru</span>
                                                    <span>Provider</span>
                                                </div>
                                           </div>

                                        </div>

                                    </div>
                                </div>
                                <div className={styles['or-container']}>
                                    <h5 className=""><strong>Or</strong></h5>
                                </div>

                                <h5 className="mt-30"><strong>Add New Payment Method</strong></h5>
                                <UserBnkDetails></UserBnkDetails>
                                {/* <Checkbox onChange={onChange} className="mt-32"><span><strong>Debit/Credit Card</strong></span></Checkbox>
                                
                                <Form>
                                    <Form.Item label="Card Number" className="mt-30">
                                        <PaymentInputsWrapper {...wrapperProps} styles={{inputWrapper : {base : css`height : fit-content;border-radius : 6px;border: var(--border-2) !important;`},fieldWrapper: { base: css`height: 33px;`},input: { base: css`height: 33px;border: none;border : none !important;box-shadow : none !important;width : 80%`, cardNumber : css`width : 90%`}}}>
                                            <input {...getCardNumberProps()} />
                                            <svg {...getCardImageProps({ images })} fontSize="23px"/>
                                        </PaymentInputsWrapper>
                                    </Form.Item>

                                    <Form.Item label="Card Holder" className="mt-40">
                                        <Input style={{height : "43px !important"}}></Input>
                                    </Form.Item>
                                    <Form.Item className="mt-27">
                                        <div className={styles['expiry-cvv-container']}>
                                            <Form.Item label="Expiry">
                                                <PaymentInputsWrapper {...wrapperProps} styles={{inputWrapper : {base : css`height : fit-content !important;border-radius : 6px;border: var(--border-2) !important;`},fieldWrapper: { base: css`height: 33px !important;`},input: { base: css`height: 33px !important;border: none;border : none !important;box-shadow : none !important;width : 80%`, cardNumber : css`width : 90%`}}}>
                                                    <input {...getExpiryDateProps()} />
                                                </PaymentInputsWrapper>
                                            </Form.Item>

                                            <Form.Item label="CVV">
                                                <PaymentInputsWrapper {...wrapperProps} styles={{inputWrapper : {base : css`height : fit-content;border-radius : 6px;border: var(--border-2) !important;`},fieldWrapper: { base: css`height: 33px;`},input: { base: css`height: 33px;border: none;border : none !important;box-shadow : none !important;width : 80%`, cardNumber : css`width : 90%`}}}>
                                                    <input {...getCVCProps()} />
                                                </PaymentInputsWrapper>
                                            </Form.Item>
                                        </div>

                                    </Form.Item>

                                    <Form.Item>
                                        <div className={styles['btm-btn-container']}>
                                            <Button className="mr-30">Cancel</Button>
                                            <Button className="primary">Save New Payment Method</Button>
                                        </div>
                                    </Form.Item>

                                </Form>
                                 */}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </div>
  
  )
}

export default PaymentWalletDeposit;