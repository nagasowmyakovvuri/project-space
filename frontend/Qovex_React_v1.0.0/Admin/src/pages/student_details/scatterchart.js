import React, { Component } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import axios from 'axios';

import  { useState, useEffect } from "react";
const axiosAPI = axios.create();
const Scatter = () => {
  const [collegecount, setCollegeCount] = useState([]);

  useEffect(() => {
    axiosAPI.get("http://localhost:5001/college-college").then((response)=>{
      setCollegeCount(response.data.users);
      console.log(response.data.users);
      
    })
  }, []);
 
  const series = collegecount.slice(0, 3).map((item) => item.count);
     const  options={
        labels: ["Ace", "Acet", "Acoe"],
        plotOptions: {
          pie: {
            donut: {
              size: '75%'
            }
          }
        },
      
        legend: {
          show: false,
        },
        colors: ['#3b5de7', '#45cb85', '#eeb902'],
  }
  const  acecount=series[0],acetcount=series[1],acoecount=series[2];
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">college</h4>

            <Row className="align-items-center">
              <Col sm={6}>
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={245}
                  className="apex-charts"
                />
              </Col>
              <Col sm={6}>
                <div>
                  <Row>
                    <div className="col-6">
                      <div className="py-3">
                        <p className="mb-1 text-truncate"><i
                          className="mdi mdi-circle text-primary me-1"></i>{" "}Ace
                            </p>
                           
                        <h5>{acecount}</h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="py-3">
                        <p className="mb-1 text-truncate"><i
                          className="mdi mdi-circle text-success me-1"></i>{" "}Acet</p>
                        <h5>{acetcount}</h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="py-3">
                        <p className="mb-1 text-truncate"><i
                          className="mdi mdi-circle text-warning me-1"></i>{" "}Acoe</p>
                        <h5>{acoecount}</h5>
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  
}

export default Scatter
