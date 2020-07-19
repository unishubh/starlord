import React, { useContext } from 'react';
import {UserContext} from '../UserContext';

function Admin()
{
    const {token,setToken} = useContext(UserContext);

    return(
    <div>
        <div className="slider-area ">
            <div className="slider-height2 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap hero-cap2 text-center">
                                <h2>HI {token ? <>Admin</> : <>Sign In</>} </h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    

    );
}

export default Admin;