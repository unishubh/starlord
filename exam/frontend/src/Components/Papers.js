import React from 'react';
import {Link} from 'react-router-dom';
function Papers(){
    const papers = [{'sr':'01', 'name': 'JEE-ADVANCED', 'paperid':313,'description':'exam hai bhai'},
    {'sr':'02', 'name': 'JEE-ADVANCED', 'paperid':15*15,'description':'exam hai bhai'}]
    return( 
    <div>
        <div className="slider-area">
            <div className="slider-height2 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="hero-cap hero-cap2 text-center">
                                <h2>Your Papers</h2>
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
                                    <div className="country">Paper</div>
                                    <div className="visit">Number of Questions</div>
                                    <div className="visit">Description</div>
                                    <div className="visit">Preview</div>
                                    <div className="visit">Edit</div>
                                </div>
                               { papers.map((paper,key)=>(
                                <div className="table-row" id={key}>
                                    <div className="serial">{paper.sr}</div>
                                    <div className="country"> {paper.name}</div>
                                    <div className="visit">{paper.paperid}</div>
                                    <div className="visit">{paper.description}</div>
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/preview/"+paper.paperid} className="genric-btn primary-border small" >Preview</Link></div>
                                    </div>
                                    <div className="visit">
                                    <div className="button-group-area mt-10">
                                    <Link to={"/addquestion/"+paper.paperid} className="genric-btn primary-border small" >Edit</Link></div>
                                    </div>
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

export default Papers;