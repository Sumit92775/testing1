import React from 'react';
import {Form} from 'antd';
const ViewDetails = () =>{
    return(
        <div className="vd-container">
            <Form>
                <Form.Item>
                    <div className="flex center-content">
                        <span className="pt-8 pr-8 pb-8 pl-8 txt dark1 mb-10" style={{backgroundColor : "pink", borderRadius : "6px"}}>Paid to:</span>
                        <span className="pt-8 pr-8 pb-8 pl-8 txt dark1 mb-10">Ninny</span>
                    </div>
                </Form.Item>
                <Form.Item className="mb-20">
                    <div className="flex center-content direction">
                        <h2>$60</h2>
                        <span>For order. xyz</span>
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className="grid-view grid-2">
                        <div className="flex center-content direction">
                            <span><strong className="txt dark1">Txn. Id</strong></span>
                            <span>xxxxxxxxxx</span>
                        </div>
                        <div className="flex center-content direction">
                            <span><strong className="txt dark1">Time</strong></span>
                            <span>12:00 PM</span>
                        </div>
                    </div>
                </Form.Item>

            </Form>
        </div>
    )
}

export default ViewDetails;