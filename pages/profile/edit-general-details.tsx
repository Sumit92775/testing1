import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, message, Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';

const { Option } = Select;

const EditGeneralDetails = (props: any) => {

    const { t } = useTranslation('validator');
    const [form] = Form.useForm();

    const [firstname, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setdob] = useState('' as any);
    const [gender, setGender] = useState(1);
    
    function handleChange(value: any) {
        console.log(`selected ${value}`);
        if(value === "Male"){
            props.setGender(1);
        }
        else if(value === "Female"){
            props.setGender(2);
        }else{
            props.setGender(3);
        }
    }

    useEffect(() =>{
        setFirstname(props?.firstName);
        setLastName(props?.lastName);
        setdob(props?.dob);
    },[props.firstName, props.lastName]);

    let genders = [
        {
            id: 1,
            value: "Male"
        },
        {
            id: 2,
            value: "Female"
        },
        {
            id: 3,
            value: "Other"
        },
    ]

    function onChange(date:any, dateString:any) {
        console.log(date, dateString);
        props.setDob(dateString);
        setdob(dateString)
      }

      const checkUserName = (rule: any, value: any, callback: any) => {
        let name = value;
        if(name){
            if(name.charAt(0) === ' '){
                callback(t('First character never be space', {field: 'First Name'}));
            }else{
                for(let i = 0 ; i < name.length ; i++){
                    let ch = name.charAt(i);
                    if(parseInt(ch)){
                        callback('Number not allowed', {field: 'First Name'})
                    }else{
                        callback();
                    }
                }
            }
        }else{
        }
    };
      
    const checkLastName = (rule: any, value: any, callback: any) => {
        let name = value;
        if(name){
            if(name.charAt(0) === ' '){
                callback(t('First character never be space', {field: 'Last Name'}));
            }else{
                for(let i = 0 ; i < name.length ; i++){
                    let ch = name.charAt(i);
                    if(parseInt(ch)){
                        callback('Integer not allowed', {field: 'Last Name'})
                    }else{
                        callback();
                    }
                }
            }
        }else{

        }
    };

    return(
        <div>
            <Form>
                <Form.Item>
                    <div className="grid-view grid-2 colgap-30">
                        <Form.Item label="First Name">
                            <Input value={firstname} maxLength={20} onChange={(event) =>{props.setFirstName(event.target.value);
                            setFirstname(event.target.value);
                            }}></Input>
                        </Form.Item>
                        
                        <Form.Item  label="Last Name">
                            <Input value={lastName} maxLength={30} onChange={(event) =>{props.setLastName(event.target.value);
                            setLastName(event.target.value)}}></Input>
                        </Form.Item>
                    </div>
                </Form.Item>
                
                <Form.Item className="mt-10">
                    <div className="grid-view grid-2 colgap-30">
                        <Form.Item className="mt-10" label="Date of Birth">
                            <DatePicker placeholder={props.dob} value={moment(dob)} onChange={onChange} />
                            {/* <Input value={props.dob} onChange={(event) => props.setDob(event.target.value)}></Input> */}
                        </Form.Item>

                        <Form.Item className="mt-10" label="Gender">
                            <Select defaultValue={props.gender === 1 ? "Male" : props.gender === 2 ? "Female" : "Other"} onChange={(event) =>handleChange(event)}>
                                
                                {genders.map((gender) =>{
                                    return(
                                        <Option key={gender.id} value={gender.value}>{gender.value}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditGeneralDetails;