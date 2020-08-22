// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import UserForm from "./adminComponents/userForm";
// import PostContest from "./PostContest";
// import Tabs from "../profile/tabs/tabs";

// import Modal from "../Modal/modal";
// import "./Admin.css";

// class Admin extends Component {
//   state = {
//     photos: [],
//     currentProfile: null
//   };
//   componentDidMount() {
//     axios
//       .get("/api/admin/photos")
//       .then(res => {
//         this.setState({ photos: res.data });
//       })
//       .catch(err => console.log(err));
//   }
//   showModal = imgData => {
//     this.setState({ show: true, currentProfile: imgData });
//   };
//   hideModal = () => {
//     this.setState({ show: false });
//   };

//   render() {
//     let photos;
//     if (this.state.photos.length === 0) {
//       photos = <h1>there are no photos</h1>;
//     } else {
//       photos = this.state.photos.map(img => {
//         return (
//           <Fragment>
//             {this.state.show ? (
//               <Modal show={this.state.show} handleClose={this.hideModal}>
//                 <UserForm imgData={this.state.currentProfile} />
//               </Modal>
//             ) : null}
//             <div>
//               <img
//                 style={{ width: "20rem" }}
//                 src={img.imageUrl}
//                 onClick={() => this.showModal(img)}
//                 alt=""
//               />
//               <Link to={`/profile/${img.owner}`} className="btn btn-info">
//                 {img.name}{" "}
//               </Link>
//             </div>
//           </Fragment>
//         );
//       });
//     }
//     return (
//       <Fragment>
//         <div style={{ backgroundColor: "#ff0061" }}>
//           <Tabs style="center">
//             <div label="All Users Artwork">
//               <div className="photos_collage">{photos}</div>;
//             </div>

//             <div label="PROJECT & CONTEST">
//               <PostContest />
//             </div>
//           </Tabs>
//         </div>
//       </Fragment>
//     );
//   }
// }
// export default Admin;
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import AllDesigns from "./adminComponents/AllDesigns";
import ManageDesigners from "./adminComponents/ManageDesigners";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "spaceEvenly",
    height: "100vh"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    justifyContent: "spaceEvenly",
    height: "100%"
  },
  font: {
    fontSize: "1.5rem"
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <div style={{ position: "fixed", height: "100%" }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab className={classes.font} label="All Designs" {...a11yProps(0)} />
          <Tab
            className={classes.font}
            label="Manage Designers"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.font}
            label="Manage payments"
            {...a11yProps(2)}
          />
          <Tab
            className={classes.font}
            label="Manage Projects"
            {...a11yProps(3)}
          />
          <Tab
            className={classes.font}
            label="Designer Messages"
            {...a11yProps(4)}
          />
          <Tab
            className={classes.font}
            label="Notification"
            {...a11yProps(5)}
          />
        </Tabs>
      </div>
      <div style={{ marginLeft: "16rem", padding: "4rem" }}>
        <TabPanel value={value} index={0}>
          <AllDesigns />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManageDesigners />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
      </div>
    </div>
  );
}
