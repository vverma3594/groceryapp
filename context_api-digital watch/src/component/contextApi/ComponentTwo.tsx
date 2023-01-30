import React from "react";
import ComponentThree from "./ComponentThree";
interface IState{

}
interface IProps{

}
let ComponentTwo:React.FC<IProps>=()=>{
    return(
        <React.Fragment>
               <h2> ComponentTwo</h2>
                <ComponentThree/>
        </React.Fragment>
    )
}
export default ComponentTwo;