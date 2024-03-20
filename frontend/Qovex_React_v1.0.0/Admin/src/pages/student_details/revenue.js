// import React from "react";
// import axios from 'axios';
// import ReactApexChart from "react-apexcharts"
// import  { useState, useEffect } from "react";
// import {
//     Card,
//     CardBody,
//   } from "reactstrap"
//   import { connect } from "react-redux"
//   const axiosAPI = axios.create();
// const RevenueChart = (props) => {
//     const [branchcount,setbranchcount]=useState([]);
//     axiosAPI.get("http://localhost:5001/thub-branch").then((response)=>{
//         setbranchcount(response.data.users);
//         // console.log(response.data.users);
    
//       })

//     const series = [{
//         name: 'Series A',

//         data: branchcount.map(item => item.count),
//     },]

//     const options = {
//         chart: {
//             stacked: !0,
//             toolbar: {
//                 show: !1
//             },
//             zoom: {
//                 enabled: !0
//             }
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: !1,
//                 columnWidth: '20%',
//                 endingShape: 'rounded'
//             },
//         },
//         dataLabels: {
//             enabled: !1
//         },
//         xaxis: {
//             categories: ['CSE', 'ECE', 'IT', 'MECH', 'CIVIL', 'EEE',"AIML"],
//         },
//         colors: ['#eef3f7', '#ced6f9', '#3b5de7'],
//         fill: {
//             opacity: 1
//         }
//     }

//     const width = props.layoutWidth === "boxed" ? 260 : 296.828;
    
//     return (
//         <React.Fragment>
//             <Card>
//                 <CardBody>
//                     <h4 className="card-title mb-4">Branch</h4>
//                     <div id="revenuechart">
//                     <ReactApexChart
//                         options={options}
//                         series={series}
//                         width= {width}
//                         height={260}
//                         type="bar"
//                         className="apex-charts"
//                     />
//                     </div>
//                 </CardBody>
//             </Card>
//         </React.Fragment>
//     )
// }


// const mapStateToProps = state => {
//     return { ...state.Layout }
// }


// export default connect(mapStateToProps, null)(RevenueChart)

import React,{ useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts";
import {Card,CardBody} from "reactstrap";
import axios from 'axios';
const axiosAPI=axios.create();
const Revenue = () => {
        const [branchcount,setbranchcount]=useState([]);
    axiosAPI.get("http://localhost:5001/college-branch").then((response)=>{
        setbranchcount(response.data.users);
         console.log(response.data.users);
    
      })

     
    const series = [{
        name: "count",
        type: 'pie',
        data: branchcount.slice(0,6).map((ele)=>ele.count)
        
    }]

    const options = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#45cb85', '#3b5de7'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [4, 0],
        },

        markers: {
            size: 3
        },
        xaxis: {
            categories: ['ECE','CSE','MECH','EEE','IT','CIVIL','AI&ML'],
            title: {
                text: 'branch'
            }
        },

    fill:  {
            type: 'solid',
            opacity: [1, 0.1],
        },

        legend: {
            position: 'top',
            horizontalAlign: 'right',
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Branch</h4>

                    <ReactApexChart
                        options={options}
                        series={series}
                        height="260"
                        type="bar"
                        className="apex-charts"
                    />
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default Revenue