import React, { useContext } from "react"; 

import userContext from "./userContext"
interface IState{

}
interface IProps{

}
let ComponentThree:React.FC<IProps>=()=>{
    let userInfo= useContext(userContext)
    return(
        <React.Fragment>
                <h2> ComponentThree</h2>
            <p>{JSON.stringify(userInfo)}</p>

        </React.Fragment>
    )
}
export default ComponentThree;