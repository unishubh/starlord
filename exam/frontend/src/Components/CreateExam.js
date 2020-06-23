import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

function CreateExam(){


    const [name,setName] = useState("");
    const [number,setNumber] = useState(0);
    const [description,setDescription] = useState("");
    const history = useHistory();
  const handleSubmit = () => {

    console.log("create exam");
    history.push('/');
    
   console.log(name);
   console.log(number);
   console.log(description);
    
  
    fetch('https://localhost:3001/createexam',{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'token' : 'Bearer ' + " "   },
      body: JSON.stringify({
        name: name,
        number: number,
        description: description,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);

       
      
    })    
    console.log("Login Done");

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
                                        <input className="form-control valid" name="name" id="name" 
                                        type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter exam name'" 
                                        placeholder="Enter exam name" value={name} onChange = {e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" name="number" id="number" 
                                        type="number" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Number of questions'" 
                                        placeholder="Number of Question" value={number} onChange = {e => setNumber(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" cols="30" rows="9" name="description" id="description" 
                                        type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Description'"
                                         placeholder="Enter Description" value={description} onChange = {e => setDescription(e.target.value)}/>
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