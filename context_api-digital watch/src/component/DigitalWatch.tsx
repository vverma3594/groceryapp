import React, { useEffect, useState } from "react";

interface IProps{}
interface IState{
    time:string;
}

let DigitalWatch:React.FC<IProps>=()=>{
    let [timeState, setTimeState]= useState({
        time: new Date().toLocaleTimeString()
    })
    useEffect(()=>{
        let timer=setInterval(
            ()=>{
            setTimeState({
                time: new Date().toLocaleTimeString()
            })
        },1000)
        return() =>{
            clearInterval(timer)
        }
    })
    return(
        <React.Fragment>
                <div className="container mt-5">
                    <div className="row">

                        <div className="col-6">
                                 <div className="card">
                            <div className="card-header bg-success text-white">
                                <div className="card-title">Digital watch</div>
                            </div>
                            <div className="card-body">
                               <h1>{timeState.time}</h1>
                            </div>
                        </div>
                        </div>
                   
                    </div>
                </div>
        </React.Fragment>
    )
}
export default DigitalWatch;