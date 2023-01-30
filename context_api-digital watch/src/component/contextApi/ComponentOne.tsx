import React, { useState } from "react";
import ComponentTwo from "./ComponentTwo";
import userContext from "./userContext"
interface IState{
    user:{
        name:string;
        age:number;
    }
}
interface IProps{

}
let ComponentOne:React.FC<IProps>=()=>{
    let[userState, setUserState ]= useState({
        user:{
            name:"Vishal Verma",
            age:28
        }
    })
        return(
        <React.Fragment>
                <h2>ComponentOne</h2>
                <pre>{JSON.stringify(userState.user)}</pre>
                <userContext.Provider value={userState.user}>
                <ComponentTwo/>

                </userContext.Provider>
        </React.Fragment>
    )
}
export default ComponentOne;