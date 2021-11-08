import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/Card-Template.module.scss'
import EditIcon from '@material-ui/icons/Edit';
import {Form, Select, Input, Slider, Divider, Button, Checkbox, Modal, message} from 'antd';
import astyles from './Styles.module.scss'
import { editUserProfile } from '../../services/addresses';
import EditGeneralDetails from './edit-general-details';

const CardTemplate = (props : any) =>{

    const [chooseModal, setchooseModal] = useState(false);

    const handleOk = (evt : any) => {
        console.log('ok clicked', evt)
    };

    const handleCancel = () => {
        setchooseModal(false);
    };

    const openModal = (type : any) => {
        setchooseModal(true);
    };

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState(1);
    
    useEffect(() =>{
        setfirstName(props?.itemList?.firstName);
        setLastName(props?.itemList?.lastName);
        setDob(props?.itemList?.dateOfBirth);
        setGender(props?.itemList?.gender);
    },[props.itemList?.firstName, props.itemList?.dateOfBirth, props.itemList?.gender, props.itemList?.lastName]);


    const handleEditUserById = async (obj: any) =>{
      
        console.log(firstName+" "+lastName+" "+dob+" "+gender);
        let data = await editUserProfile({
            "firstName": firstName,
            "lastName": lastName,
            "gender": ""+gender,    
            "dateOfBirth": dob,
       })

       if(data){
           if(data.status){
               message.success(data.message);
               props.setUserDetailsArray({
                "firstName": firstName,
                "lastName": lastName,
                "gender": gender,
                "dateOfBirth": dob,
                "email": props?.email,
                "phoneNumber": props?.mobileNumber,
                "userName": props?.userName,
               })
               handleCancel();
            }else{
                handleCancel();
           }
       }else{
           console.log("Error Cart Template: ",data);           
           message.error(data.message);
           handleCancel();
       }
    }

    return(
        <div className="card card2 p-0 mt-40" style={{height : "fit-content", position : "relative", boxShadow : "none"}}>
            <div className={styles['card-header-container']}>
                <h5 className="mt-10 mb-10 pl-20 pr-27 fz-18">{"Edit General Details"}</h5>
                <Divider className="mt-5 mb-0"></Divider>
            </div>
        
        <main>
            <div className="pt-10 pl-27 pr-37">
                <div className={astyles['anpa-container-content']}>
                <div className={astyles['main-content-container']}>
                            
                            <div>
                                <strong>{"Username"}</strong>
                                <span>{props.itemList?.userName}</span>
                            </div>
    
                            <div>
                                <strong>{"First Name"}</strong>
                                <span>{props.itemList?.firstName}</span>
                            </div>
                            
                            <div>
                                <strong>{"Last Name"}</strong>
                                <span>{props.itemList?.lastName}</span>
                            </div>
                            
                            <div>
                                <strong>{"Date of Birth"}</strong>
                                <span>{props.itemList?.dateOfBirth}</span>
                            </div>
                            
                            <div>
                                <strong>{"Gender"}</strong>
                                <span>{props.itemList?.gender === 1 ? "Male" : props.itemList?.gender === 2 ? "Female" : "Other"}</span>
                            </div>

                    </div>
                </div>
            </div>

        </main>

        <Divider className="mt-12 mb-12"></Divider>
        <div className={styles['bottom-btn-container']}>
        <div>
            <Button className="primary small mr-33" type="link" onClick={openModal}><span className="icon-wrap" onClick={() =>handleEditUserById}><EditIcon /></span>Edit Details</Button>
        </div>
    </div>

    <Modal style={{borderRadius :"15px", overflow : "hidden",width : "fit-content"}} title={
                            <div style={{width : "100%", 
                            height: "100%",
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            alignItems: "center"}}>
                                <h4 className="txt primary">{"Edit Profile"}</h4>
                            </div>
                    } footer={
                        <div className="pt-20 pb-20 pr-0">
                            <Button className="mr-20" onClick={handleCancel}>Cancel</Button>
                            <Button className="ant-btn primary mr-21" onClick={handleEditUserById}>Save Chages</Button>
                        </div>
                        }
                    visible={chooseModal} onOk={handleOk} onCancel={handleCancel}>
                        {
                            <EditGeneralDetails setGender={setGender} handleEditUserById={handleEditUserById} setFirstName={setfirstName} setLastName={setLastName} setDob={setDob} firstName={props?.itemList?.firstName} lastName={props?.itemList?.lastName} dob={props?.itemList?.dateOfBirth} gender={props?.itemList?.gender}></EditGeneralDetails>
                        }
                    </Modal>
    </div>

    )

}
export default CardTemplate;

