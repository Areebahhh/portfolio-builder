import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import "./profilecv.css"

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

   const userId = parseInt(useLocation().pathname.split("/")[2]);
  //  taking user id
 
 

  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId], 
    
    queryFn: () => makeRequest.get(`/users/find/${userId}`)
            .then(res => res.data)
            .catch(error => {
                console.error("Error fetching data:", error);
                throw error; // This makes sure errors are handled by `error` in useQuery.
            }),

  });
  


  const { isLoading: rIsLoading, error: rError, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: () => makeRequest.get(`/relationships?followeduserid=${userId}`).then(res => res.data),
    onError: (error) => {
      console.error("Error fetching relationship data:", error);
    }
  });
  

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (isFollowing) => {
      // Use the isFollowing flag to decide between follow and unfollow actions
      if (isFollowing) {
        return makeRequest.delete(`/relationships?userId=${userId}`);
      } else {
        return makeRequest.post("/relationships", { userId });
      }
    },
    onSuccess: () => {
      // Invalidate and refetch relationship data to reflect the change
      queryClient.invalidateQueries(["relationship"]);
    },
  });
  

const handleFollow = () => {
  // Determine if the current user is already followed by checking if their ID is included in relationshipData

  mutation.mutate(relationshipData.includes(currentUser.id));
};



  //  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (following) => {
  //     if (following)
  //       return makeRequest.delete("/relationships?userId=" + userId);
  //     return makeRequest.post("/relationships", { userId });
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["relationship"]);
  //     },
  //   }
  // );

  // const handleFollow = () => {
  //   mutation.mutate(relationshipData.includes(currentUser.id));
  // };


  // cv functionality related code

   // Existing states and hooks
   const [cvData, setCvData] = useState({
    education: '',
    experience: '',
    skills: '',
    // Add more fields as necessary
  });

  // Function to handle changes in the form inputs
  const handleCvChange = (e) => {
    const { name, value } = e.target;
    setCvData(prevCvData => ({
      ...prevCvData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleCvSubmit = (e) => {
    e.preventDefault();
    // Perform the API call to save the CV data
    // You might need to adapt this part based on your backend setup
    console.log(cvData);
  };



// cv functionality related code


  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>

          <div className="images">
            {/* <img src="https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="cover" /> */}
            {/* <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="profilePic" /> */}
             <img src={"/upload/"+data.coverPic} alt="" className="cover" />
             {/* <img src={data.coverPic} alt="" className="cover" /> */}
            <img src={"/upload/"+data.profilePic} alt="" className="profilePic" /> 
            {/* <img src={data.profilePic} alt="" className="profilePic" />  */}
          </div>
          
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
              {/* https://www.facebook.com/ */}
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                {/* <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a> */}
              </div>

              <div className="center">
                
                {/* <span>Ammar </span> */}
                <span>{data.name}</span>
                
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    {/* <span>Pakistan</span> */}
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    {/* <span>Ammar.com</span> */}
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) :
                 userId === currentUser.id ? (
                  
                   <button onClick={() => setOpenUpdate(true)}>update</button>
                  // <button >update</button>
                ) : (

            
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
               
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts Puserid={userId} />
          {/* <Posts/> */}
          
          </div>
        
        </>
        )}

     
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}


      <div className="cvContainer">
  <h2 className="cvTitle">Curriculum Vitae</h2>
  <div className="cvContent">
    <div className="personalInfo">
      <h3>Personal Information</h3>
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong> john.doe@example.com</p>
      <p><strong>Profession:</strong> Software Developer</p>
    </div>
    <div className="experienceSection">
      <h3>Experience</h3>
      <ul>
        <li>Senior Developer at XYZ Corp - 2019-present</li>
        <li>Mid-Level Developer at ABC Inc - 2015-2019</li>
      </ul>
    </div>
    <div className="educationSection">
      <h3>Education</h3>
      <ul>
        <li>BSc in Computer Science from University of Somewhere - 2011-2015</li>
        <li>High School Diploma from Some High School - 2007-2011</li>
      </ul>
    </div>
    <div className="skillsSection">
      <h3>Skills</h3>
      <p>Programming Languages: JavaScript, Python, Java</p>
      <p>Frameworks: React, Angular, Django</p>
      <p>Tools: Docker, Git, Jenkins</p>
    </div>
  </div>
</div>



    </div> // entire profile page div
    
  );
};

export default Profile;
