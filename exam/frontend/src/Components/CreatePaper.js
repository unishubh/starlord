import React, { useState ,useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import { UserContext } from './UserContext';
import swal from 'sweetalert';




function CreatePaper(props){
    const {token,setToken} = useContext(UserContext);
    const [options,setOptions] = useState([]);
    useEffect(
        
        ()=>{
            
            fetch('https://www.mutualfundcalculator.in/starlord/user/getallexams'
                )
                .then(response =>{
                // console.log(response);
                  if(response.ok)
                  return response.json();
                  else{
                    alert(response.status)
                    throw new Error(response.status);
                  }
                })
                .then(data => {
                  console.log(data);
                  data.examdata.map((exam,key) => {
                    
                      if(exam.agencyID === token.agencyID){
                        options.push({'value':exam.id,'label':exam.name})
                       
                        
                      }
                      
                    });
                
                setIsLoading(false);
              
                }
              ).catch(
                (error) => {
                  swal({
                    title: "Oops",
                    text: "Something went wrong " + error,
                    icon: "success",
                    button: "Got it",
                  });
                //   history.push('/');  

                }
              )

              console.log(options);
        },[]
    );


   
    const [name,setName] = useState("");
    const [examID,setExamID] = useState("");
    const [totalQns,setTotalQns] = useState(null);
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("create paper");
    // history.push('/');
   console.log(name);
   console.log(examID);
   console.log(totalQns);
   const accessToken = localStorage.getItem("token");
   fetch('https://www.mutualfundcalculator.in/starlord/admin/create_paper',{
     method: 'POST',
     headers: {'Content-Type': 'application/json',
               'Authorization' : 'Bearer ' + accessToken   },
     body: JSON.stringify({
        name: name,
        examID: examID,
        totalQns: totalQns,
     })
   })
     .then(response =>{
       setIsLoading(false);
       if(response.ok)  
       return response.json();
       else{
           throw new Error(response.status)
       }
     } )
     .then(data => {
       console.log(data);
       console.log(data.message);
       swal({
           title: "Hey Yaayy !!",
           text: "Paper Has Been Created",
           icon: "success",
           button: "Got it",
         });
         history.push('/addquestion/' + data.message.id);

   }).catch(
       (error)=>{
           swal({
               title: "Oh Ohhh",
               text: "Check your details",
               icon: "error",
               button: "Got it",
             });
       }
   )
  
    

  };
 

    return(
    <div> 
       <div>
            { 
    isLoading ?  
     <div>
         
        <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
                <div className="preloader-circle"></div>
                <div className="preloader-img pere-text">
                    <img src="assets/img/logo/loder.png" alt=""/>
                </div>
            </div>
        </div>

    </div>
      : 
      
      <div>
       <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Create Paper</h2>
                    </div>
                    <div className="col-lg-8">
                        <form className="form-contact contact_form"  id="contactForm" >
                            <div className="row">
                                {/* <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                                    </div>
                                </div> */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" name="name" id="name" 
                                        type="text"  
                                        placeholder="Enter exam name" value={name} onChange = {e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                <Select
                                    
                                    onChange={e=> setExamID(e.value)}
                                    options={options}
                                />
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <input className="form-control"  name="totalQns" id="totalQns" 
                                        type="number" 
                                         placeholder="Total Questions" value={totalQns} 
                                         onChange = {e => {setTotalQns(e.target.value); console.log(e.target.value)}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" 
                                className="button button-contactForm boxed-btn"
                                onClick={handleSubmit}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                </section>
                                
        </div>
            }
      </div>
      </div>

    );
}

export default CreatePaper;