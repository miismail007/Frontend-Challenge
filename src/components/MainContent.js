import React,{useEffect} from 'react'
import './css/MainContent.css';
import axios from '../axios';
import phone from '../assets/images/phone.png'
import laptop from '../assets/images/laptop.png'
import {datachange} from '../store/actions';
import MaterialIcon from 'material-icons-react';
import {useSelector,useDispatch} from 'react-redux'
import {activities} from '../store/actions';
import {Doughnut} from 'react-chartjs-2'
function MainContent(props) {
    const dispatch = useDispatch();
    const getdata = async () =>{
      await axios
      .get('mock68182/screentime')
      .then((res) => {
        dispatch(datachange(res.data));
      });
    };
    useEffect(()=>{
        const url = new URL(document.URL);
        const urlsp = url.searchParams;
        var type = encodeURI(urlsp.get("type"));
        dispatch(
            type === 'all' ? activities({
                key:"all",
                text:"All"
            }) : type === 'class' ? activities({
                key:"class",
                text:"Class-time only"
            }) : type === 'study' ? activities({
                key:"study",
                text:"Study-time only"
            }) : type === 'free' ? activities({
                key:"free",
                text:"Free-time only"
            }) : activities({
                key:"all",
                text:"All"
            })
        )
        getdata()
    },[])
    const data = useSelector((state)=>state)
    const {activity,maindata} = data
    const classTime = maindata[0].chartData.classTime.total
    const studyTime = maindata[0].chartData.studyTime.total
    const freeTime = maindata[0].chartData.freeTime.total
    const totalTime = maindata[0].chartData.totalTime.total
    const classTimeUsage = maindata[0].deviceUsage.classTime
    const studyTimeUsage = maindata[0].deviceUsage.studyTime
    const freeTimeUsage = maindata[0].deviceUsage.freeTime
    const totalTimeUsage = maindata[0].deviceUsage.totalTime
    const freeTimeMaxUsage = maindata[0].freeTimeMaxUsage
    return (
        <div className="container maindiv">
            <h5>Activities Summary</h5>
            <div className="actionDiv">
                <div className="actionBtn" onClick={()=> props.setpopup()} style={
                    {
                        backgroundColor: activity.key !== 'all' ? "blue" : "#fff",
                    }
                }>
                    <p style={
                        {
                            color: activity.key !== 'all' ? "#fff" : "blue",
                        }
                    }>{activity.text}</p>
                    <MaterialIcon icon="keyboard_arrow_down" color={activity.key === 'all' ? "blue" : "white"}/>
                </div>
            </div>
            <div className="summaryDiv">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 innerCol">
                            <p className="colHeading">
                                {
                                    activity.key === 'all' ? "All Screen Time" : 
                                    activity.key === 'class' ? "Class Time" : 
                                    activity.key === 'study' ? 'Study Time' : 
                                    'Free Time'
                                }
                            </p>
                            {activity.key === 'all' && 
                                <Doughnut data={
                                    {
                                        datasets: [{
                                            
                                            data: [classTime,studyTime,freeTime],
                                            backgroundColor: [
                                            '#2d82fe',
                                            '#ff9e57',
                                            '#61f17b'
                                            ],
                                            hoverOffset: 4
                                        }],
                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                        labels: [
                                            `Class - ${Math.floor(classTime/60)+'h '+classTime%60+'m'}`,
                                            `Study - ${Math.floor(studyTime/60)+'h '+studyTime%60+'m'}`,
                                            `Free-time - ${Math.floor(freeTime/60)+'h '+freeTime%60+'m'}`,
                                        ],
                                        text:'hey',
                                    }
                                    
                                }
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                                />}
                                {activity.key === 'class' && 
                                <Doughnut data={
                                    {
                                        datasets: [{
                                            
                                            data: [classTime,totalTime-classTime],
                                            backgroundColor: [
                                            '#2d82fe',
                                            'grey',
                                            ],
                                            hoverOffset: 4
                                        }],
                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                        labels: [
                                            `Class - ${Math.floor(classTime/60)+'h '+classTime%60+'m'}`,
                                            `Total - ${Math.floor((totalTime-classTime)/60)+'h '+(totalTime-classTime)%60+'m'}`,
                                        ],
                                        text:'hey',
                                    }
                                    
                                }
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                                />}
                                {activity.key === 'study' && 
                                <Doughnut data={
                                    {
                                        datasets: [{
                                            
                                            data: [studyTime,totalTime-studyTime],
                                            backgroundColor: [
                                            '#ff9e57',
                                            'grey',
                                            ],
                                            hoverOffset: 4
                                        }],
                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                        labels: [
                                            `Class - ${Math.floor(studyTime/60)+'h '+studyTime%60+'m'}`,
                                            `Total - ${Math.floor((totalTime-studyTime)/60)+'h '+(totalTime-studyTime)%60+'m'}`,
                                        ],
                                        text:'hey',
                                    }
                                    
                                }
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                                />}
                                {activity.key === 'free' && 
                                <Doughnut data={
                                    {
                                        datasets: [{
                                            
                                            data: [freeTime,totalTime-freeTime],
                                            backgroundColor: [
                                            '#61f17b',
                                            'grey',
                                            ],
                                            hoverOffset: 4
                                        }],
                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                        labels: [
                                            `Class - ${Math.floor(freeTime/60)+'h '+freeTime%60+'m'}`,
                                            `Total - ${Math.floor((totalTime-freeTime)/60)+'h '+(totalTime-freeTime)%60+'m'}`,
                                        ],
                                        text:'hey',
                                    }
                                    
                                }
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                                />}
                            <h5 style={{textAlign:'center'}}>{"Total time - "+Math.floor(totalTime/60)+'h '+totalTime%60+'m'}</h5>
                        </div>
                        {(activity.key === 'all' || activity.key === 'free') &&
                        <div className="col-md-4 innerCol">
                            <p className="colHeading">Free time Usage</p>
                            <div className="progressDiv">
                                <div className="progressDivHeading">
                                    <div>
                                        <p className="progressTitle">Used</p>
                                        <p className="progressValue">{Math.floor(freeTimeMaxUsage/60)+'h '+freeTimeMaxUsage%60+'m'}</p>
                                    </div>
                                    <div>
                                        <p className="progressTitle">Max</p>
                                        <p className="progressMax">{Math.floor(totalTime/60)+'h '+totalTime%60+'m'}</p>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{backgroundColor:"#61f17b",width:Math.floor((freeTimeMaxUsage/totalTime)*100) + "%",color:"#61f17b"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>}
                        <div className="col-md-4 innerCol">
                            <p className="colHeading">By Devices</p>
                            <div className="deviceDiv">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6" style={{display:'flex',justifyContent:'center'}}>
                                        <img alt="" src={phone} width="30" style={{objectFit:'contain'}} />
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <p style={{margin:0}}>Adi's phone</p>
                                        <p style={{color:'blue'}}>{activity.key === "all" && Math.floor(totalTimeUsage.mobile/60)+'h '+totalTimeUsage.mobile%60+'m'}</p>
                                        <p style={{color:'blue'}}>{activity.key === "class" && Math.floor(classTimeUsage.mobile/60)+'h '+classTimeUsage.mobile%60+'m'}</p>
                                        <p style={{color:'blue'}}>{activity.key === "study" && Math.floor(studyTimeUsage.mobile/60)+'h '+studyTimeUsage.mobile%60+'m'}</p>
                                        <p style={{color:'blue'}}>{activity.key === "free" && Math.floor(studyTimeUsage.mobile/60)+'h '+studyTimeUsage.mobile%60+'m'}</p>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-6 col-sm-6" style={{display:'flex',justifyContent:'center'}}>
                                        <img alt="" src={laptop} width="80" style={{objectFit:'contain'}} />
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <p style={{margin:0}}>Adi's laptop</p>
                                        <p style={{color:'blue'}}>{activity.key === "all" && Math.floor(totalTimeUsage.laptop/60)+'h '+totalTimeUsage.laptop%60+'m'}</p>
                                        <p style={{color:'blue'}}>{activity.key === "class" && Math.floor(classTimeUsage.laptop/60)+'h '+classTimeUsage.laptop%60+'m'}</p>
                                        <p style={{color:'blue'}}>{activity.key === "study" && Math.floor(studyTimeUsage.laptop/60)+'h '+studyTimeUsage.laptop%60+'m'}</p>
                                        <p style={{color:'blue'}}>{activity.key === "free" && Math.floor(studyTimeUsage.laptop/60)+'h '+studyTimeUsage.laptop%60+'m'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContent
