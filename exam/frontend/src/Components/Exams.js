import React from 'react';

function Exams(){
    const exams = [{'sr':'01', 'name': 'JEE-ADVANCED', 'number':313,'description':'exam hai bhai'},
    {'sr':'02', 'name': 'JEE-ADVANCED', 'number':15*15,'description':'exam hai bhai'}]
    return( 
    <div>
        <div className="slider-area">
            <div className="slider-height2 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap hero-cap2 text-center">
                                <h2>Your Exams</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="whole-wrap"> 
            <div className="container box_1170">
                <div className="section-top-border">
                        <h3 className="mb-30"></h3>
                        <div className="progress-table-wrap">
                            <div className="progress-table">
                                <div className="table-head">
                                    <div className="serial">#</div>
                                    <div className="country">Exam</div>
                                    <div className="visit">Number of Questions</div>
                                    <div className="percentage">Description</div>
                                </div>
                               { exams.map((exam,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{exam.sr}</div>
                                    <div className="country"> {exam.name}</div>
                                    <div className="visit">{exam.number}</div>
                                    <div className="visit">{exam.description}</div>
                                    {/* <div className="percentage">
                                        <div className="progress">
                                            <div className="progress-bar color-1" role="progressbar" style={{width: "80%"}}
                                                aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div> */}
                                </div>
                                ))}
                                
                            </div>
                        </div>
                </div>
            </div>
        </div> 
    </div>
    );
}

export default Exams;