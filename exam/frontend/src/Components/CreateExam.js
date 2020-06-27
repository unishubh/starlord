import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

function CreateExam(){


    const [name,setName] = useState("");
    const [maxMarks,setMaxMarks] = useState(null);
    const [details,setDetails] = useState("");
    const [time,setTime] = useState("");
    const history = useHistory();
  const handleSubmit = (event) => {

    console.log("create exam");
    
    
   console.log(name);
   console.log(maxMarks);
   console.log(time);
    
    const accessToken = localStorage.getItem("token");
    fetch('https://www.mutualfundcalculator.in/starlord/admin/create_exam',{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken   },
      body: JSON.stringify({
        name: name,
        maxMarks: maxMarks,
        details: details,
        time:time
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.message);
        if(data.message == " Missing Authorization Header")
        {
            alert(data.message)
        }
        else{
            console.log("Hello JI");
            history.push('/');
        }

       
      
    })  
    console.log("Login Done");
    event.preventDefault();

  };


    return(
        <div>
             <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Create Exam</h2>
                    </div>
                    <div className="col-lg-8">
                        <form className="form-contact contact_form"  id="contactForm" >
                            <div className="row">
                                {/* <div class="col-12">
                                    <div class="form-group">
                                        <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                                    </div>
                                </div> */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  
                                        type="text"  
                                        placeholder="Enter exam name" value={name} onChange = {e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  
                                        type="number"
                                        placeholder="Maximum Marks" value={maxMarks} onChange = {e => setMaxMarks(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  
                                        type="time"
                                        placeholder="Time Limit" value={time} onChange = {e => setTime(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" cols="30" rows="9" name="description"
                                        type="text" 
                                         placeholder="Enter Details" value={details} onChange = {e => setDetails(e.target.value)}/>
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
    );
}

export default CreateExam;