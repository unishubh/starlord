import React from 'react';


function CreateExam(){




    return(
        <div>
             <section class="contact-section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2 class="contact-title">Create Exam</h2>
                    </div>
                    <div class="col-lg-8">
                        <form class="form-contact contact_form"  id="contactForm" novalidate="novalidate">
                            <div class="row">
                                {/* <div class="col-12">
                                    <div class="form-group">
                                        <textarea class="form-control w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message"></textarea>
                                    </div>
                                </div> */}
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input class="form-control valid" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter exam name'" placeholder="Enter exam name" />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input class="form-control valid" name="number" id="number" type="number" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Number of questions'" placeholder="Number of Question"/>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <textarea class="form-control" cols="30" rows="9" name="description" id="description" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Description'" placeholder="Enter Description"/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <button type="submit" class="button button-contactForm boxed-btn">Save</button>
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