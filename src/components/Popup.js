import React from 'react'
import './css/Popup.css'
import {useDispatch,useSelector} from 'react-redux'
import {activities} from '../store/actions';
import { Link } from 'react-router-dom';
function Popup(props) {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state)
    const {activity} = data
    return (
        <div className="popupWrapper">
            <div className="popupTop" onClick={()=>{
                props.setpopup()
            }}></div>
            <div className="popupBottom">
                <div className="container">
                    <p className="popupHeading">Activities during which time is shown?</p>
                    <Link to="/summary?type=all"
                    style={{color:"#000",textDecoration:"none",cursor:'pointer'}}
                        onClick={()=>{
                                dispatch(
                                    activities({
                                        key:"all",
                                        text:"All"
                                    })
                                )}}>
                    <div className="popOptions">
                        <div className="popText">
                            <p className="optionTitle">All</p><br/>
                            <p className="optionDescription">Activities during class-time, study-time and play-time are shown here.</p>
                        </div>
                        <div className="popRadioBtn">
                            <input type="radio" name="option" defaultChecked={activity.key === 'all' ? true : false} />
                        </div>
                    </div>
                    </Link>
                    <Link to="/summary?type=class"
                    style={{color:"#000",textDecoration:"none",cursor:'pointer'}}
                        onClick={()=>{
                                dispatch(
                                    activities({
                                        key:"class",
                                        text:"Class-time only"
                                    })
                                )}}>
                    <div className="popOptions">
                        <div className="popText">
                            <p className="optionTitle">Class-time only</p><br/>
                            <p className="optionDescription">Only the activities during the times you scheduled as class-time are shown.</p>
                        </div>
                        <div className="popRadioBtn">
                            <input type="radio" name="option" defaultChecked={activity.key === 'class' ? true : false} />
                        </div>
                        
                    </div>
                    </Link>
                    <Link to="/summary?type=study"
                    style={{color:"#000",textDecoration:"none",cursor:'pointer'}}
                        onClick={()=>{
                                dispatch(
                                    activities({
                                        key:"study",
                                        text:"Study-time only"
                                    })
                                )}}>
                    <div className="popOptions">
                        <div className="popText">
                            <p className="optionTitle">Study-time only</p><br/>
                            <p className="optionDescription">Only the activities during the times you scheduled as study-time or when manually switched to study-mode from the node page are shown.</p>
                        </div>
                        <div className="popRadioBtn">
                            <input type="radio" name="option" defaultChecked={activity.key === 'study' ? true : false} />
                        </div>
                    </div>
                    </Link>
                    <Link to="/summary?type=free"
                    style={{color:"#000",textDecoration:"none",cursor:'pointer'}}
                        onClick={()=>{
                                dispatch(
                                    activities({
                                        key:"free",
                                        text:"Free-time only"
                                    })
                                )
                                }}>
                    <div className="popOptions">
                        <div className="popText">
                            <p className="optionTitle">Free-time only</p><br/>
                            <p className="optionDescription">Only the activities during the times you scheduled as free-time or when manually switched to free-mode from the node page are shown.</p>
                        </div>
                        <div className="popRadioBtn">
                            <input type="radio" name="option" defaultChecked={activity.key === 'free' ? true : false}/>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Popup
