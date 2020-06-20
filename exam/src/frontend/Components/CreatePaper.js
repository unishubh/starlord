import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';




function CreatePaper(props){


    const options = [
        { value: 'advanced', label: 'JEE-ADVANCED' },
        { value: 'main', label: 'JEE-MAIN' },
        { value: 'neet', label: 'NEET' },
      ];
    const [name,setName] = useState("");
    const [exam,setExam] = useState("");
    const [description,setDescription] = useState("");
    const history = useHistory();
  const handleSubmit = (event) => {

    console.log("create paper");
    // history.push('/');
    
   console.log(name);
   console.log(exam);
   console.log(description);
    
  
    // fetch('https://localhost:3001/createpaper',{
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json',
    //             'token' : 'Bearer ' + " "   },
    //   body: JSON.stringify({
    //     name: name,
    //     type: type,
    //     description: description,
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     localStorage.setItem("token", data.token);

       
      
    // });    
    console.log("Create PAper done");
   

  };
 

    return(
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
                                    
                                    onChange={e=> setExam(e.value)}
                                    options={options}
                                />
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" cols="30" rows="9" name="description" id="description" 
                                        type="text" 
                                         placeholder="Enter Description" value={description} 
                                         onChange = {e => {setDescription(e.target.value); console.log(e.target.value)}}/>
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

export default CreatePaper;