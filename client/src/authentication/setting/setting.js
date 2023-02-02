import React from 'react'
import './settings.css';
const Settings = () => {
    return (
        <div className='container settings'>
            <div className='header_text'><span>Settings</span></div>
            <div className='row'>
                <div className='col-8 offset-1'>
                    <div className='element_list'>

                        <span>Change Password</span>
                        <span>Change Historial Events API</span>
                        <button>Delete Account</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Settings