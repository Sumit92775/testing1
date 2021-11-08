import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './ServiceCard.module.scss';
import { Checkbox, Button, Select, Image, message } from 'antd';
import { newId } from '../../services/auth';
import { addToCart, deleteFromCart, getItemInCart } from '../../services/items';

const ServiceCard = ({item, resetUI, setKeyValueArray, setServiceDetail}) => {

    const [items, setItems] = useState({});
    const [serviceValue, setServiceValue] = useState([]);
    const [modifiedServiceArray, setModifiedServiceArray] = useState([]);
    const [keyArray, setKeyArray] = useState([]);
    const [chooseCartProperty, setChooseCartProperty] = useState(false);

    useEffect(() =>{
        setItems(item);
        if(item.alreadyAdded){
            setChooseCartProperty(true);
        }else{
            setChooseCartProperty(false);
        }

        console.log("Item: ",item);

        let keyArray = [];
        let valueArray = [];
        let valueArray1 = [];
        let data = item?.ServiceProperties;
        let KeyValueArray = [];
        for(let i = 0; i < data.length; i++){
            keyArray.push(data[i].key);
            valueArray1 = (data[i].value).split(",");

            console.log("arr: ",valueArray1);
            if(valueArray1.length > 1){
                // valueArray[i] = "NA";
                KeyValueArray.push({
                    key: data[i].key,
                    value: ''
                })
            }else{
                valueArray[i] = data[i].value;
                KeyValueArray.push({
                    key: data[i].key,
                    value: data[i].value
                })
            }
        }

        console.log("KeyValueArray: ",KeyValueArray);

        setModifiedServiceArray();
        setKeyArray(keyArray);
        console.log("KeyArray: ",keyArray);
        console.log("ValueArray",valueArray);
        setServiceValue(KeyValueArray);

    },[])

    const checkIsArray = (value) =>{
        let data = value.split(",");
        if(data.length > 1){
            let check = Array.isArray(data);
            return({
                status: check,
                result: data
            })
        }

        // setServiceValue(serviceValue.push(data[0]));
        return({
            status: false
        })
    }

    const addItemInCart = (itemId) =>{

        console.log("KeysArray: ",keyArray);
        console.log("idx: ",itemId);
        
        let newValueArray = [];
        for(let i = 0 ; i < serviceValue.length ; i++){
            newValueArray.push(serviceValue[i].value);
        }

        console.log("serviceValue: ",newValueArray);

        try{
            addToCart({
                itemid: itemId,
                serviceValue: newValueArray,
                keyArray: keyArray
            }).then(res =>{
                if(res.status){
                    console.log(res);
                    setKeyValueArray(prev => [...prev, serviceValue])
                    resetUI();
                }else{
                    console.log(res.status);
                }
            });

            

        }catch(error){
            message.error(error)
            console.log(error);
        }
    }


    const deleteItemFromCart = async (itemId) =>{
        try{
            let res = await getItemInCart();
            if(res.status){
                let itemArray = res.data;
                for(let i = 0 ; i < itemArray.length ; i++){
                    if(itemArray[i].serviceId === items.id){
                        let deleteItemId = itemArray[i].id;
                        let res1 = await deleteFromCart(deleteItemId);
                        if(res1.status){
                            setItems({           
                                    "id": items.id,
                                    "storeId": items.storeId,
                                    "categoryId": items.categoryId,
                                    "subcategoryId": items.subcategoryId,
                                    "parent": items.parent,
                                    "primaryServiceName": items.primaryServiceName,
                                    "secondaryServiceName": items.secondaryServiceName,
                                    "primaryLanguageDesc": items.primaryLanguageDesc,
                                    "secondaryLanguageDesc": items.secondaryLanguageDesc,
                                    "variationName": items.variationName,
                                    "price": items.price,
                                    "createdAt": items.createdAt,
                                    "ServiceProperties": items.ServiceProperties,
                                })
                                resetUI();
                                setKeyValueArray([]);

                        }else{
                            message.error(res1.status);
                        }

                        break;
                    }
                }   
            }else{

            }

        }catch(error){
            console.log(error);
        }
    }

    const handleValueSelected = (itemId, propertyKey, selectedValue) =>{
        let serviceArray = serviceValue;
        let newArray = serviceArray;
        for (const key in serviceArray) {
            if (serviceArray[key].key === propertyKey) {
                newArray[key].value = selectedValue
            }
        }
        
        console.log("NewArray: ",newArray);
        setServiceValue(newArray);
        
    }


    let itemTesting = {
        ServiceProperties: [
            {key: 'type', value: 'machine,Hand,Blade'},
        {key: 'duration', value: '30'},
        {key: 'duration', value: '30'},
        {key: 'duration', value: '30'},
        {key: 'type', value: 'machine,Hand,Blade'},
        {key: 'type', value: 'machine,Hand,Blade'},
    ],
        length: 2,
        categoryId: 1,
        createdAt: "2021-10-21T09:08:53.000Z",
        id: 2,
        parent: 0,
        price: "50",
        primaryLanguageDesc: "product1",
        primaryServiceName: "product1",
        secondaryLanguageDesc: "product1",
        secondaryServiceName: "product1",
        storeId: 2,
        subcategoryId: 1,
        variationName: "regular"
    }

    return (
        <div className={ styles['item'] }>
            {/* { sponsored } */}
            <div className={ cx(styles['item-image'], 'cover') }>
                <Image className="cover"  src="/Subscription-banner.png" alt="src" />
            </div>
            <div className={ cx(styles['item-info']) }>
                <div>
                    <h5>{ item.primaryServiceName }
                        <span className="ml-5 fz-14 txt weight400">{ item.variationName }</span>
                    </h5>
                </div>
                <p className="txt dark1 weight500 mt-10 mb-10">{ item.primaryLanguageDesc }</p>
                <div>
                    <strong className="pull left mb-10">{ process.env.currency }{ item.price }</strong>
                </div>

                <div className={ cx('grid-view', styles['item-options'])}>
                    {item.ServiceProperties.map((obj) =>{
                        return(
                            
                            <div className="flex" key={obj}>
                                {
                                    checkIsArray(obj?.value).status == true ? 
                                <>
                                </>
                                : 
                                <>
                                <div className="flex mr-10">
                                    <span className="pull left mr-5"><strong>{obj.key}:</strong></span>
                                    {() => setServiceValue(prev => [...prev, obj?.value])}
                                    <span>{obj?.value}</span>
                                </div>
                                </>
                                }
                            </div> 
                        )
                    })}
                </div>
               
                <div className={ cx('grid-view colgap-20 mt-10', styles['item-options'])}>
                    
                    {item?.ServiceProperties.map((obj) =>{
                        return(
                            <div className="flex" key={obj} style={{width: '150px'}}>
                                {
                                    checkIsArray(obj?.value).status == true ? 
                                <div className="flex">
                                    <span className="pull left mr-10">{obj.key}: </span>
                                    <Select className="medium" style={{maxWidth: "200px !important"}} onChange={(event) => {
                                        handleValueSelected(item.id, obj.key, event)
                                        // setServiceValue(prev => [...prev, event]);
                                        }} disabled={item.alreadyAdded ? true : false}>
                                        {checkIsArray(obj?.value).result.map(option => (
                                            <Select.Option key={option} value={option}>{option}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                : 
                                <>
                                </>
                                }
                            </div>
                            
                        )
                    })}

                    <div>                    
                        {item.alreadyAdded === "true" ? 
                            <Button className="medium full-width primary rounded" onClick={() =>deleteItemFromCart(item?.id)}>Remove</Button> 
                        : 
                            <Button className="medium full-width primary rounded" onClick={() =>addItemInCart(item?.id)}>Add</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard