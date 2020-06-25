import React, { useEffect, useState } from 'react';
import {useHistory,useParams} from 'react-router-dom';

function PreviewPaper(){
    const history = useHistory();
    const {paperID} = useParams();
    const [isLoading, setIsLoding] = useState(false);
    useEffect(
        () => {
       
        },[]
    );
    return(
        <div>
            {isLoading ?
            <div>isLoading...</div> : <div>PreviewPaper</div> }
        </div>
    );
}

export default PreviewPaper;