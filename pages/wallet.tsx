import React, { useState } from 'react'
import { Button, Divider, Tabs, Menu, Modal } from 'antd';
import styles from '../styles/components/Payment.module.scss';
import { useRouter } from 'next/router';
import TransactionCard from '../components/Common/TransactionCard';
// import EditPreferences from '../components/Product-Details/edit-preferences-modal';
import RaiseDisputes from '../components/Payments/raise-dispute';
import ViewDetails from '../components/Payments/view-details';
import Dispute from '../components/Payments/dispute';
import OutsideKsa from '../components/Payments/outside-ksa';
import WithinKsa from '../components/Payments/within-ksa';


const { TabPane } = Tabs;


const Wallet = () => {


    const [selectedModalName, setSelectedModalName] = useState("");
    const [selectedModal, setSelectedModal] = useState(false);
    
    const [selectedModal1, setSelectedModal1] = useState(false);
    
    const [activeksa, setActiveksa] = useState('');

    const router = useRouter(),
    { slug } = router.query,
    selected_tab = slug && slug[0] ? slug[0] : 'providers',
    

    onTabClick = (key:string, event: any) => {
        setActiveksa(key);
        // router.push(`${process.env.base_url}wallet/${key}`)
    };

    const countryData = {
        title: 'Transaction History',
        columns: [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                styles : 'backgroundColor : "green" ',
            },
            {
                title: 'Transaction',
                dataIndex: 'transaction',
                key: 'transaction'
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount'
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: function action() {
                    return <>
                        <Menu className="table-action-btn" mode="horizontal">
                            <Menu.SubMenu key="SubMenu" title="">
                                <Menu.Item key="View Details" onClick={() =>openModal("View Details")}>View Details</Menu.Item>
                                <Menu.Item key="Raise Dispute" onClick={() =>openModal("Raise Dispute")}>Raise Dispute</Menu.Item>
                                <Menu.Item key="Disputed" onClick={() =>openModal("Disputed")}>Disputed</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </>
                }
            },
        ],
        dataSource: [
            {
                key: '1',
                date: 'Nov 11, 2020 04:21 PM',
                amount: '-$10',
                transaction : "Service Commission Taken for Booking #15912501"
            },
            {
                key: '2',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '3',
                date: 'Nov 11, 2020 04:19 PM',
                amount : '-$100',
                transaction : 'Refund for Booking #15912499',

            },
            {
                key: '4',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '5',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '6',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '7',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '8',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '9',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
            {
                key: '10',
                date: 'Nov 11, 2020 04:20 PM',
                amount : '$100',
                transaction : 'Payment for Booking #15912501',

            },
         
        ]
    }

const handleOk = (evt : any) => {
    console.log('ok clicked', evt);
};

const handleCancel = () => {
    setSelectedModal(false);   
    setSelectedModal1(false);
};

const openModal = (type : any) => {

    console.log(type);
    setSelectedModal(!selectedModal);
    setSelectedModalName(type)
};


    return(
            <div className={styles['your-payment-wallet']}>
                <h5><strong>Your Payments Wallet</strong></h5>
                <div className={styles['payment-modal-container']}>
                    <div className={styles['pmc-left']}>
                        <div className={styles['pmc-left-container']}>

                            <div className={styles['pmc-left-container-top']}>
                                <h5 className="mb-5"><strong>Wallet Balance</strong></h5>
                                <h5 className="mb-5"><strong className="primary-txt">$ 850.20 USD</strong></h5>
                                <h5 className="mb-1"><strong className="primary-txt">SAR 254.20 Saudi Riyal</strong></h5>
                            </div>
                            
                            <Divider className="mt-0"></Divider>

                            <div className={styles['pmc-left-container-bottom']}>
                               <div className={styles['pmc-left-container-bottom-btn']}>
                                   <Button><strong>Add Money</strong></Button>
                                   <Button className="primary" onClick={() => setSelectedModal1(true)}><strong>Request Payout</strong></Button>
                               </div>

                               <div className={styles['pmc-left-container-bottom-anim-1']}></div>
                               <div className={styles['pmc-left-container-bottom-anim-2']}></div>
                               <div className={styles['pmc-left-container-bottom-anim-3']}></div>

                            </div>
                        </div>
                    </div>
                    <div className={styles['pmc-right']}>
                        <TransactionCard table={{columns : countryData.columns, title : countryData.title, dataSource : countryData.dataSource}} />
                    </div>

                    <Modal style={{borderRadius :"15px", overflow : "hidden",width : "fit-content"}} title={
                            <div style={{width : "100%", 
                            height: "100%",
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            alignItems: "center"}}>
                                <h4 className="txt primary">{selectedModalName}</h4>
                            </div>
                    } footer={

                        selectedModalName === "Raise Dispute" ?
                        <div className="pt-20 pb-20 pr-0">
                            <Button className="ant-btn mr-21">Cancel</Button>
                            <Button className="ant-btn primary mr-21">Submit</Button>
                        </div>
                        : 
                        <>
                        </>

                        } visible={selectedModal} onOk={handleOk} onCancel={handleCancel}>
                           
                           {
                           selectedModalName === "Raise Dispute" ? 
                           <RaiseDisputes/> 
                           : 
                           selectedModalName === "View Details" ? 
                           <ViewDetails/> 
                           : 
                           selectedModalName === "Disputed" ? 
                           <Dispute/> 
                           : 
                           <>
                           </>
                           }
                    </Modal>
                    
                    <Modal style={{borderRadius :"15px", overflow : "hidden",width : "fit-content"}} title={
                            <div style={{width : "100%", 
                            height: "100%",
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            alignItems: "center"}}>
                                <h4 className="txt primary">{"Request Payout"}</h4>
                            </div>
                    } footer={

                        <div className="pt-20 pb-20 pr-0">
                            <Button className="ant-btn mr-21" onClick={handleCancel}>Cancel</Button>
                            <Button className="ant-btn primary mr-21">Submit</Button>
                        </div>
                      
                        } visible={selectedModal1} onOk={handleOk} onCancel={handleCancel}>
                           
                           {
                               <div>
                                   <Tabs defaultActiveKey="1" activeKey={activeksa} onTabClick={onTabClick}>
                                       <TabPane tab="Active" key="1">
                                       {/* <h5>Your Active Gift Cards</h5> */}
                        <WithinKsa></WithinKsa>
                        {/* <div className={styles['res-grid']}>
                            {count.map((a, i) => {
                                return <GiftCard key={i} card={a} />
                            })}
                        </div> */}
                                       </TabPane>
                                       <TabPane tab="Expired" key="2">
                                       {/* <h5>Your Active Gift Cards</h5> */}
                        <OutsideKsa></OutsideKsa>
                        {/* <div className={styles['res-grid']}>
                            {count.map((a, i) => {
                                return <GiftCard key={i} card={a} />
                            })}
                        </div> */}
                                       </TabPane>
                                   </Tabs>
                               </div>
                           }
                    </Modal>

                </div>
            </div>
        
    )
}

export default Wallet;
