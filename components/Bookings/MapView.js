import React, {useEffect, useState} from 'react';
import { Table, Button, Select, Menu, Input, Form, Modal, Tooltip } from 'antd';
import Image from 'next/image';
import styles from './Style.module.scss';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { MyLocation } from '@material-ui/icons';

Geocode.setApiKey("AIzaSyBKowFDX0jDn687et4wgSmFpXiK-bj5Gj4");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

const MapView = (props) => {
    const [isVisible, toggleVisibility] = useState(false);
    const mapDetails = [
        { 
            title: 'Building Number',
            value: '8228'
        },
        { 
            title: 'Unit Number/Address',
            value: 'King abdul aziz south road'
        },
        { 
            title: 'Street',
            value: 'Street Name'
        },
        { 
            title: 'Square/City',
            value: 'Riyadh'
        },
        { 
            title: 'Zip Code/Postal Code',
            value: '2121'
        },
        { 
            title: 'State/Region',
            value: 'Najd'
        },
        { 
            title: 'Country',
            value: 'Saudi Arabia'
        },
    ]
    
  const [latitude, setLatitude] = useState(parseFloat(props.storeAddress[0].latitude));
  const [longitude, setLongitude] = useState( parseFloat(props.storeAddress[0].longitude));

  const center = {
    lat: latitude,
    lng: longitude
  };
  
const containerStyle = {
    width: '100%',
    height: '400px'
  };


// useEffect(() => {

//     let message= parseInt(props.storeAddress[0].longitude
//     // console.log(parseInt(props.storeAddress[0].latitude+" "+parseInt(props.storeAddress[0].longitude)
// },[]);

    return (
        <>
            {/* <a><span className="material-icons txt dark4" onClick={ () => toggleVisibility(true) }>location_on</span></a> */}
            
                    <div className={ styles["map-container"] }>
                    <div>
            <div className="mb-20" style={{position : "relative"}}>
            <LoadScript
            googleMapsApiKey="AIzaSyBKowFDX0jDn687et4wgSmFpXiK-bj5Gj4"
            >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={20}
                onLoad={map => {
                  const bounds = new window.google.maps.LatLngBounds();
                  map.fitBounds(bounds);
                }}
                options={{
                  // styles: waterStyle,
                  fullscreenControl: false,
                  disableDefaultUI :  true,
                }}>
                <Marker
                position={center}
                />

            </GoogleMap>
            </LoadScript>
            <div  className={styles['myLocationIcon']}><MyLocation></MyLocation></div>
            </div>
        </div>
          

                        <Image layout="fill" src="/dummy-map.png" alt="" />
                    </div>
                    <div className={ styles["map-details"]}>
                        {/* { mapDetails.map(detail => ( */}
                            <span>
                                <span>Add 1</span><br/>
                                <strong>{ props.storeAddress[0].add1 }</strong><br/>
                            </span>
                            
                            <span>
                                <span>Add 2</span><br/>
                                <strong>{ props.storeAddress[0].add2}</strong>
                            </span>
                            
                            <span>
                                <span>City</span><br/>
                                <strong>{ props.storeAddress[0].city}</strong>
                            </span>
                            
                            <span>
                                <span>Zipcode</span><br/>
                                <strong>{ props.storeAddress[0].zipCode}</strong>
                            </span>
                        {/* )) } */}
                    </div>
            {/* <Modal style={{ borderRadius: "15px", overflow: "hidden", width: "fit-content" }} 
                title={null} footer={null} 
                visible={isVisible} 
                onCancel={() => toggleVisibility(false) }>
            </Modal> */}
        </>
    )
}

export default MapView
