import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import trailApi from "../../api/trail";
import "./listrail.scss";

const ListTrail = () => {
  const [trails, setTrails] = useState([]);
  useEffect(() => {
    trailApi.listUserTrails({ offset: 0, limit: 15 }).then(res => {
      setTrails(res);
    });
  }, []);
  console.log(trails)
  return (
    <div className="App">
      <div className="container">

        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={`/feed`}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/user`}>Profile</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Trail</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/trail/list`}>My trails</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      
       





              <div className="trail-list">


                <div className="trail-list-picture"></div>

                <div className="trail-list-title"></div>


                {trails.map((trail, index) => {console.log(trail)
                  return (
                  
                  <div className="trail-list-item">
                    
                    
                      <div className="trail-title">{trail.title}</div>
                      <div className="date">{trail.created_at}</div>


                  </div>
                          

 
                  );
                })}

                

                 

          





         
          
          </div>
        </div>
      </div>
   
  );
};



export default ListTrail;
