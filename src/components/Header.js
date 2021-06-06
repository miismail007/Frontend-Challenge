import React from 'react'
import './css/header.css';
import MaterialIcon from 'material-icons-react';
function Header() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark background">
            <div className="container headerContainer">
                <div className="userNameLogo">
                    <div className="userLogo">
                        <MaterialIcon icon="person" color={"#fff"}/>
                    </div>
                    <div className="userName">
                        <h5>Aditya Prasad</h5>
                    </div>
                </div>
                <div className="optiondots" onClick={()=>{
                }}>
                    <MaterialIcon icon="more_horiz" color={"#000"}/>
                </div>
            </div>
            
        </nav>
    )
}

export default Header
