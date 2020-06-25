import React, { useState } from 'react';
import {useHistory,useParams} from 'react-router-dom';

function AddQestion(){

    const {paperID} = useParams();
    // console.log("Add Question PE aagye");
    // console.log(paperid);
    // const [questions,setQuestions] = useState([]);
    const [question,setQuestion] = useState("");
    const [options,setOptions] = useState([
        {"1":"","2":"","3":"","4":""}
    ]);
    // const [option1,setOption1] = useState("");
    // const [option2,setOption2] = useState("");
    // const [option3,setOption3] = useState("");
    // const [option4,setOption4] = useState("");
    const [correct,setCorrect] = useState("");
    const [type,setType] = useState("");
    const [posMark,setPosMark]=useState(null);
    const [negMark,setNegMark]=useState(null);
    const history = useHistory();
    const handleSubmit = (event) => {
        console.log(question);
    
        // questions.push({question,option1,option2,option3,option4,correct});
        // setCorrect("");
        // setOption1("");
        // setOption2("");
        // setOption3("");
        // setOption4("");
        // setQuestion("");
       history.push('/preview/'+paperID);  
    };
    const handleAdd = (event) => {
    console.log("/sjgjs/"+paperID);
    console.log("add question");
    fetch('https://localhost:3001/add_questions/'+paperID,{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'token' : 'Bearer ' + " "   },
      body: JSON.stringify({
         question: question,
         options: options,
         correct: correct,
         type:type
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);

        setCorrect("");
        setOptions("");
        setType({"1":"","2":"","3":"","4":""});
        setQuestion("");
        setNegMark("-1");
        setPosMark(1);
        event.preventDefault();   
      
    })    
    

    console.log("Add Question  ", paperID);
    
    history.push("/addquestion/"+paperID);   
  };


    return(
        <div>
            <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="contact-title"> Question Paper - {paperID} </h1>
                        <div className=" mt-3">
                                <button 
                                className="button button-contactForm boxed-btn"
                                onClick={handleSubmit}>Preview Papaer</button>
                            </div>
                            <br/>
                        {/* <h2 className="contact-title"> Total Questions to be added : {questions.length}</h2> */}
                    </div>
                    <div className="col-lg-8">
                    <form className="form-contact contact_form"  id="contactForm" >
                            <div className="row">
                                {/* <div class="col-12">
                                    <div class="form-group">
                                        <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" cols="30" rows="9" name="question"
                                        type="text" 
                                         placeholder="Enter Question" value={question} onChange = {e => setQuestion(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="option1"
                                        type="text"  
                                        placeholder="Enter Option 1" value={options["1"]} onChange = {e => setOptions({"1":e.target.value})} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="option2"
                                        type="text"
                                        placeholder="Enter Option 2" value={options["2"]} onChange = {e => setOptions({"2":e.target.value})}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="option3"
                                        type="text"
                                        placeholder="Enter Option 3" value={options["3"]} onChange = {e => setOptions({"3":e.target.value})}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="option4"
                                        type="text"
                                        placeholder="Enter Option 4" value={options["4"]} onChange = {e => setOptions({"4":e.target.value})}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="correct"
                                        type="text"
                                        placeholder="Enter Correct Answer" value={correct} onChange = {e => setCorrect(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="posMark"
                                        type="number"
                                        placeholder="Postive Mark" value={posMark} onChange = {e => setPosMark(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="negMark"
                                        type="number"
                                        placeholder="Negative Mark" value={negMark} onChange = {e => setNegMark(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="type"
                                        type="text"
                                        placeholder="Enter Type" value={type} onChange = {e => setType(e.target.value)}/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className=" mt-3">
                                <button 
                                className="button button-contactForm boxed-btn"
                                onClick={handleAdd}>Add</button>
                            </div>
                    </form>    
                    </div>
                </div>
                </div>
                </section>
                
        </div>
    );
}

export default AddQestion;