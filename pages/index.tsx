import React, { useEffect } from 'react';
import Router from 'next/router';
import Home from './home';

export default function Index() {
    
    // useEffect(() => {
    //     Router.push('/admin/dashboard');
    // });

    return <Home />;
}