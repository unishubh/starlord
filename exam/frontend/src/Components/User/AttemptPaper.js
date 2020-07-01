import React, { useEffect, useState } from 'react';
import {useHistory,useParams} from 'react-router-dom';

function AttemptPaper(){
    const history = useHistory();
    const {paperID} = useParams();
    const [isLoading, setIsLoding] = useState(false);
    useEffect(
        () => {

        },[]
    );
    return(
        <div>
            <h1 align="center">Paper - Name</h1>
            {/* {isLoading ?
            <div>isLoading...</div> : <div>PreviewPaper</div> } */}
        <div class="whole-wrap">
		<div class="container box_1170">
            <div className="section-top-border">
					<h3 className="mb-30">Question No.</h3>
					<div className="row">
						<div className="col-lg-12">
							<blockquote className="generic-blockquote">
								“Recently, the US Federal government banned online casinos from operating in America by
								making it illegal to
								transfer money to them through any US bank or payment system. As a result of this law, most
								of the popular
								online casino networks such as Party Gaming and PlayTech left the United States. Overnight,
								online casino
								players found themselves being chased by the Federal government. But, after a fortnight, the
								online casino
								industry came up with a solution and new online casinos started taking root. These began to
								operate under a
								different business umbrella, and by doing that, rendered the transfer of money to and from
								them legal. A major
								part of this was enlisting electronic banking systems that would accept this new
								clarification and start doing
								business with me. Listed in this article are the electronic banking”
                            <br/><br/>
                            <div className="col-lg-3 col-md-4 mt-sm-30">
                                <div className="switch-wrap d-flex justify-content-between">
									<div className="primary-checkox" >
										<input type="checkbox" id="primary-checkbox" checked={true}/>
										<label for="primary-checkbox"></label>
                                    </div>
                                    <p>02. Primary Color radio</p>
								</div>
                            </div>
                            <div className="col-lg-3 col-md-4 mt-sm-30">
                                <div className="switch-wrap d-flex justify-content-between">
									<div className="primary-checkox" >
										<input type="checkbox" id="primary-checkbox" checked={false}/>
										<label for="primary-checkbox"></label>
                                    </div>
                                    <p>02. Primary Color radio</p>
								</div>
                            </div>
							</blockquote>
						</div>
					</div>
				</div>
        </div>
        </div>
        </div>
    );
}

export default AttemptPaper;