import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import './Loader.scss';

export default function Loader(){
    const loadingStatus = useSelector((state) => state.heroes.status)
    if(loadingStatus === 'loading'){
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
            const loader = document.getElementsByClassName('loader')[0]
            if(loader) loader.classList.remove('fade-in')
        }, 1000)
    }else{
        const loader = document.getElementsByClassName('loader')[0]
        if(loader){
            loader.classList.add('fade-out')
            document.body.style.overflow = ''
        }
    }
    return (
        <div>
            {loadingStatus === 'loading' ? 
                <div className="loader fade-in">
                    <div className="background"></div>
                    <div className="container-spinner">
                        <Spinner animation="grow" /> : <div></div>
                        <label>Loading characters!</label>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    )
}