import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import axios from 'axios';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import LineChart from "./line-chart";
import RevenueChart from "./revenue-chart";
import SalesAnalytics from "./sales-analytics";
import ScatterChart from "./scatter-analytics";
// import "./datatables.scss";
import { RotatingLines } from 'react-loader-spinner'


const axiosAPI = axios.create();

const Technical = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedPassoutYear, setSelectedPassoutYear] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const series = [70]
  const [gendercount, setgendercount] = useState([]);
  const [collegecount,setcollegecount]=useState([]);
  const [passoutcount,setpassoutcount]=useState([]);
  const [branchcount,setbranchcount]=useState([]);
  const [loader,Setloader] = useState(false);

  useEffect(() => { 
    Setloader(true)

    axiosAPI.get("http://localhost:5001/thub-users-list").then((response)=>{
      console.log(response.data.users);

      let temp = response.data.users;
      let temp1 = temp.map((ele)=>{
        return {
          "name":ele.distinct_user.name,
        "roll_no":ele.distinct_user.roll_no,
        "mobile":ele.distinct_user.mobile,
        "branch":ele.distinct_user.branch,
        "year":ele.distinct_user.year,
        "college":ele.distinct_user.college,
        "course":ele.distinct_user.course,
        "course_type":ele.distinct_user.course_type,
        "gender":ele.distinct_user.gender,
        "shirt":ele.distinct_user.shirt,
        "attendance_eligibility":ele.distinct_user.attendance_eligibility,
      }
    })
    setData(temp1);
    setFilteredData(temp1);
    // console.log(temp1);
    Setloader(false)

    //
    
  })
  }, []);

  useEffect(()=>{
    axiosAPI.get("http://localhost:5001/thub-gender").then((response)=>{
      setgendercount(response.data.users);
    })
    axiosAPI.get("http://localhost:5001/thub-college").then((response)=>{
      setcollegecount(response.data.users);
    })
    axiosAPI.get("http://localhost:5001/thub-year").then((response)=>{
      setpassoutcount(response.data.users);
      console.log(response.data.users);
    })
    axiosAPI.get("http://localhost:5001/thub-branch").then((response)=>{
      setbranchcount(response.data.users);
      // console.log(response.data.users);
  
    })
  },[])
  
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    filterData(selectedBranch, selectedPassoutYear, selectedGender, event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    filterData(event.target.value, selectedPassoutYear, selectedGender, selectedCollege);
  };

  const handlePassoutYearChange = (event) => {
    setSelectedPassoutYear(event.target.value);
    filterData(selectedBranch, event.target.value, selectedGender, selectedCollege);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    filterData(selectedBranch, selectedPassoutYear, event.target.value, selectedCollege);
  };

  const filterData = (branch, passoutYear, gender, college) => {
    let filtered = data;

    if (branch) {
      filtered = filtered.filter(item => item.branch === branch);
    }

    if (passoutYear) {
      filtered = filtered.filter(item => item.year === passoutYear);
    }

    if (gender) {
      filtered = filtered.filter(item => item.gender === gender);
    }

    if (college) {
      filtered = filtered.filter(item => item.college === college);
    }

    setFilteredData(filtered);
  };
  const dataTable = {
   columns : [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Roll_no",
      field: "roll_no",
      sort: "asc",
      width: 150,
    },
    {
      label: "Mobile",
      field: "mobile",
      sort: "asc",
      width: 100,
    },
    {
      label: "Branch",
      field: "branch",
      sort: "asc",
      width: 150,
    },
    {
      label: "Year",
      field: "year",
      sort: "asc",
      width: 200,
    },
    {
      label: "College",
      field: "college",
      sort: "asc",
      width: 150,
    },
    {
      label: "Course",
      field: "course",
      sort: "asc",
      width: 150,
    },
    {
      label: "Course_type",
      field: "course_type",
      sort: "asc",
      width: 150,
    },
    {
      label: "Gender",
      field: "gender",
      sort: "asc",
      width: 100,
    },
    {
      label: "Shirt_size",
      field: "shirt",
      sort: "asc",
      width: 150,
    },
    {
      label: "Attendance_eligibility",
      field: "attendance_eligibility",
      sort: "asc",
      width: 150,
    }, 
    
  ], rows: filteredData
};

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Technical Hub" breadcrumbItem="Thub data" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between mb-3">
                  <select className="form-select" value={selectedCollege} onChange={handleCollegeChange}>
                    <option value="">Select College</option>
                    <option value="AEC">AEC</option>
                    <option value="ACET">ACET</option>
                    <option value="ACOE">ACOE</option>
                  </select>
                  <select className="form-select" value={selectedBranch} onChange={handleBranchChange}>
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                    <option value="EEE">EEE</option>
                    <option value="IOT">IOT</option>
                    <option value="AIML">AIML</option>
                    <option value="MECH">MECH</option>
                  </select>
                  <select className="form-select" value={selectedPassoutYear} onChange={handlePassoutYearChange}>
                    <option value="">Select Passout Year</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                  <select className="form-select" value={selectedGender} onChange={handleGenderChange}>
                    <option value="">Select Gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
          <ScatterChart />
            
          </Col>
          <Col lg={6}>
            <RevenueChart />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <SalesAnalytics />
          </Col>
          <Col lg={6}>
          <LineChart />
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            {/* Add your other components here */}
            {/* <LatestTransaction /> */}
          </Col>
        </Row>
        <Row>
          <Card>
            <CardBody>
              {/* <MDBDataTable responsive bordered data={{ columns, rows: filteredData }} /> */}
              {loader ? 
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                /> :

              <MDBDataTable responsive bordered data={dataTable} noBottomColumns />
}
            </CardBody>
          </Card>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Technical;