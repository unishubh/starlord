import React, { useState,useEffect } from 'react';
import {useHistory,useParams} from 'react-router-dom';
import swal from 'sweetalert';
import Select from 'react-select';

function AddQestion(){
    const types = [
        {value:'mcq',label:'MCQ'},
        {value:'int',label:'INTEGER'}
    ];
    const {paperID} = useParams();
    // console.log("Add Question PE aagye");
    // console.log(paperid);
    // const [questions,setQuestions] = useState([]);
    const [question,setQuestion] = useState("");
    const [options,setOptions] = useState([]);
    const [optionsfake,setOptionsfake] = useState([]);
    const [option,setOption] = useState("");
    // const [option1,setOption1] = useState("");
    // const [option2,setOption2] = useState("");
    // const [option3,setOption3] = useState("");
    // const [option4,setOption4] = useState("");
    const [correct,setCorrect] = useState(null);
    const [type,setType] = useState("");
    const [posMark,setPosMark]=useState(null);
    const [negMark,setNegMark]=useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const history = useHistory();
   
    const [questionError,setQuestionError] = useState("");
    const [optionsError,setOptionsError] = useState("");
    const [correctError,setCorrectError] = useState("");
    const [posMarkError,setPosMarkError] = useState("");
    const [negMarkError,setNegMarkError] = useState("");
    const [typeError,setTypeError] = useState("");
    const [count,setCount]=useState(-1);
  
    
    useEffect(
      ()=>{
        
        setCount(c=>c+1);
        
        let f = 0;
      if(question=="")
      {
        setQuestionError("Write a question");
        f=1;
      }
      else{
        setQuestionError("");
      }
      if(type=="mcq" && options.length<=1)
      {
        setOptionsError("Please provide atleast 2 options");
        f=1;
      }
      else{
        setOptionsError("");
      }
      if(correct=="")
      {
        setCorrectError("Choose a correct option");
        if(type=='int')
        setCorrectError("write the correct answer");
        f=1;
      }
      else{
        setCorrectError("");
      }
      if(type=="")
      {
        setTypeError("Choose a correct option");
        f=1;
      }
      else{
        setTypeError("");
      }
      if(posMark<=0)
      {
        setPosMarkError("Provide a Pos number");
        f=1;
      }
      else{
        setPosMarkError("");
      }
      if(negMark>0 || negMark==null)
      {
        setNegMarkError("Provide non-pos number");
        f=1;
      }
      else{
        setNegMarkError("");
      }
      },[question,type,correct,options,posMark,negMark,option]
    );
  
  
    const Validate = ()=>{
      let f = 0;
      if(question=="")
      {
        setQuestionError("Write a question");
        f=1;
      }
      else{
        setQuestionError("");
      }
      if(type=="mcq" && options.length<=1)
      {
        setOptionsError("Please provide atleast 2 options");
        f=1;
      }
      else{
        setOptionsError("");
      }
      if(correct=="")
      {
        setCorrectError("Choose a correct option");
        if(type=='int')
        setCorrectError("write the correct answer");
        f=1;
      }
      else{
        setCorrectError("");
      }
      if(type=="")
      {
        setTypeError("Choose a correct option");
        f=1;
      }
      else{
        setTypeError("");
      }
      if(posMark<=0)
      {
        setPosMarkError("Provide a Pos number");
        f=1;
      }
      else{
        setPosMarkError("");
      }
      if(negMark>0 || negMark==null)
      {
        setNegMarkError("Provide non-pos number");
        f=1;
      }
      else{
        setNegMarkError("");
      }
      if(f==1)
        return false;
      return true;
    }
    const handleSubmit = (event) => {
        console.log(question);
        event.preventDefault();
        setIsLoading(true);
    
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
     event.preventDefault();
    
    let isValid = Validate();
    if(isValid){
    setIsLoading(true);
    console.log("/sjgjs/"+paperID);
    console.log("add question");
    let bodydata;
    if(type=="int"){
      bodydata =  JSON.stringify({
            question: question,
            correct: correct,
            type:type,
            posMark:posMark,
            negMark:negMark
         })
    }
    else{
        bodydata = JSON.stringify({
            question: question,
            options: options,
            correct: correct,
            type:type,
            posMark:posMark,
            negMark:negMark
         })
    }
    setCorrect(null);
    setOptions([]);
    setQuestion(null);
    setPosMark(null);
    setNegMark(null);
    setCount(-1);
    console.log(bodydata);
    const accessToken = localStorage.getItem("token");
    fetch('https://www.mutualfundcalculator.in/starlord/admin/add_questions/'+paperID,{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken,   },
      body: bodydata
    })
      .then(response =>
        {   setIsLoading(false);
             if(response.ok) return response.json();
            else{
                throw new Error(response.status)
            }
        })
      .then(data => {
        console.log("reply",data);
        swal({
            title: "Hayy",
            text: "Question Has Been Added Successfully! " ,
            icon: "success",
            button: "Got it",
          });
        
        history.push("/addquestion/"+paperID);   
 
      
    }).catch(
        error => {
            swal({
                title: "Oops",
                text: "Something went wrong " + error,
                icon: "error",
                button: "Got it",
              });
        }
    );    
    

    }
  };


    return(
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
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="contact-title"> Question Paper </h1>
                        <div className=" mt-3">
                                <button 
                                className="button button-contactForm boxed-btn"
                                onClick={handleSubmit}>Preview Papaer</button>
                            </div>
                            <br/>
                        {/* <h2 className="contact-title"> Total Questions to be added : {questions.length}</h2> */}
                    </div>
                    <div className="col-lg-8">
                    <form className="form-contact contact_form"   >
                            <div className="row">
                                <div class="col-6">
                                    <div class="form-group">
                                    <Select
                                    
                                    onChange={e=> setType(e.value)}
                                    options={types}
                                />
                                { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {typeError}
                                                </div>}
                                        {/* <textarea className="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea> */}
                                    </div>
                                </div>
                               
                            {/* </div> */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" cols="30" rows="9" name="question"
                                        type="text" 
                                         placeholder="Enter Question" value={question} onChange = {e => setQuestion(e.target.value)}/>
                                    { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {questionError}
                                                </div>}
                                    </div>
                                </div>
                            { type !=='int' ? 
                                <>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="option"
                                        type="text"  
                                        placeholder="Enter Option" value={option} onChange = {e => setOption(e.target.value)} />
                                     <div className="button-group-area mt-10">
                                     { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {optionsError}
                                                </div>}
                                    <button  className="genric-btn primary-border small" onClick ={(e)=>{
                                        e.preventDefault();
                                        if(option!='')
                                        options.push(option);
                                        console.log(options);
                                        if(option!='')
                                        optionsfake.push({'value':option,'label':option})
                                        else{
                                            setCount(1);
                                            setOptionsError("Option Can't be null");
                                        }
                                        setOption("");
                                    }} >Add Option</button>
                                    </div>
                                    </div>

                                </div>
                            
                                </> : <></>
                            }
                                <div className="col-sm-6">
                                   { type==='int'? <div className="form-group">
                                        <input className="form-control"  name="correct"
                                        type="number"
                                        placeholder="Enter Correct Answer" value={correct} onChange = {e => setCorrect(e.target.value)}/>
                                   { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {correctError}
                                                </div>}
                                    </div> :
                                <Select
                                    
                                onChange={e=> setCorrect(e.value)}
                                options={optionsfake}
                                placeholder="select correct option"
                            > 
                            { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {correctError}
                                                </div>}
                            </Select>
                            
                                }
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="posMark"
                                        type="number"
                                        placeholder="Postive Mark" value={posMark} onChange = {e => setPosMark(e.target.value)}/>
                                   { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {posMarkError}
                                                </div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control"  name="negMark"
                                        type="number"
                                        placeholder="Negative Mark" value={negMark} onChange = {e => setNegMark(e.target.value)}/>
                                   { count<=0 ? <></> : <div style={{fontSize :12,color:"red"}}>
                                                    {negMarkError}
                                                </div>}
                                    </div>
                                </div>
                                {/* <div className="col-sm-6">
                                    <div className="form-group">
                                        <select className="form-control"  name="type"
                                        placeholder="Enter Type" value={type} onChange = {e => {setType(e.target.value);console.log(e.target.value)}}>
                                        <option value="mcq" selected>MCQ</option> 
                                        <option value="int">INT</option>   
                                        </select>

                                    </div>*/}
                                {/* </div>  */}
                                
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
            
            }
            
        </div>
    );
}

export default AddQestion;