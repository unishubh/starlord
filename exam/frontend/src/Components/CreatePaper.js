import React, { useState ,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';




function CreatePaper(props){

    useEffect(()=> {
        console.log("USEEFFECT")
        // fetch exams here first 
    },[]);

    const [options,setOptions] = useState([
        { value: 'advanced', label: 'JEE-ADVANCED' },
        { value: 'main', label: 'JEE-MAIN' },
        { value: 'neet', label: 'NEET' },
      ]);
    const [name,setName] = useState("");
    const [examID,setExamID] = useState("");
    const [totalQns,setTotalQns] = useState(0);
    const history = useHistory();
  const handleSubmit = (event) => {

    console.log("create paper");
    // history.push('/');
    
   console.log(name);
   console.log(examID);
   console.log(totalQns);
    
  
    fetch('https://localhost:3001/create_paper',{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'token' : 'Bearer ' + " "   },
      body: JSON.stringify({
        name: name,
        examID: examID,
        totalQns: totalQns,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);

       
      
    });    
    const paperID=1241;
    history.push('addquestion/'+paperID);
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
    );
}

export default CreatePaper;