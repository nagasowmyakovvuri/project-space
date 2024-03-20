import React, { Component } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import  { useState, useEffect } from "react";
import axios from 'axios';
const axiosAPI = axios.create();
const SalesAnalytics = () => {
  const [gendercount, setGenderCount] = useState([]);

  useEffect(() => {
    axiosAPI.get("http://localhost:5001/thub-gender").then((response)=>{
      setGenderCount(response.data.users);
      // console.log(response.data.users);
    })
  }, []);
 
  const series = gendercount.map((item) => item.count);

  const options = {
    labels: ["Female", "Male"],
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3b5de7", "#45cb85", "#f7b84b"],
  };

  
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Gender</h4>

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
                          className="mdi mdi-circle text-primary me-1"></i>{" "}Female
                            </p>
                        <h5>{series[0]}</h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="py-3">
                        <p className="mb-1 text-truncate"><i
                          className="mdi mdi-circle text-success me-1"></i>{" "}Male</p>
                        <h5>{series[1]}</h5>
                      </div>
                    </div>
                    {/* <div className="col-6">
                      <div className="py-3">
                        <p className="mb-1 text-truncate"><i
                          className="mdi mdi-circle text-warning me-1"></i>{" "}Others</p>
                        <h5>{series[2]}</h5>
                      </div>
                    </div> */}
                  </Row>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }


export default SalesAnalytics
