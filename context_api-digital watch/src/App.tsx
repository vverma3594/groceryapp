import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DigitalWatch from './component/DigitalWatch';
import ComponentOne from './component/contextApi/ComponentOne';
// import Table from './component/Table';


function App() {
  return (
    <React.Fragment>
{/* <Table/> */}
<DigitalWatch />
<ComponentOne />
    </React.Fragment>
  );
}

export default App;
