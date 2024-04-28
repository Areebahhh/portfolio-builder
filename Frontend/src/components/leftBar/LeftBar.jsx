import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import cvicon from "../../assets/cvicon.png"
import portfolioIcon from "../../assets/portfoliosmol.png"
import smoledit from "../../assets/smoledit.png"

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {

   const { currentUser } = useContext(AuthContext);
   const userid= currentUser.id
   
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
               src={"/upload/" +currentUser.profilePic}
              //  src={currentUser.profilePic}
              //src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            {/* <span>Ammar</span> */}
            
            
            {/* <Link to={`/profile/`+userid}><span>{currentUser.name}</span></Link> */}

            <Link to={`/profile/${userid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>{currentUser.name}</span>
            </Link>

          </div>



          {/* ADDING THE LINK TO CV PAGE HERE */}

          {/* <div className="item"> */}
            {/* <img src={Friends} alt="" /> */}
            {/* <img src={cvicon} alt="" />
            
            <Link to={"/CV"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>CV</span>
            </Link>
            
          </div> */}


<div className="item">
            {/* <img src={Friends} alt="" /> */}
            <img src={cvicon} alt="" />
            
            <Link to={"/CVlayout"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>CV</span>
            </Link>
            
          </div>




          {/* ADDING THE LINK TO pprtfolio PAGE HERE */}


          <div className="item">
            {/* <img src={Friends} alt="" /> */}
            <img src={portfolioIcon} alt="" />
            
            <Link to={"/PortfolioPage"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>Portfolio</span>
            </Link>
            
          </div>


          {/* ADDING THE LINK TO editable portfolio HERE */}


            <div className="item">
            {/* <img src={Friends} alt="" /> */}
            <img src={smoledit} alt="" />
            
            <Link to={"/EditablePortfolio"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span>Edit Portfolio</span>
            </Link>
            
          </div>




          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
