import React from 'react'
import Title from '../Title';

const Contact = () => {
    return (
        <section className='py-5'>
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                <Title title="contact us" />
                    <form  className="mt-5" action="https://formspree.io/me3dun@gmail.com" method="POST">
                        <div className="form-group">
                            <input type="text" name="firstName" placeholder="John Doe" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="email@example.com" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="subject" placeholder="important" className="form-control"/>
                        </div>
                        <div className="form">
                            <textarea name="message" placeholder="hello there" rows="10" className="form-control"/>
                        </div>
                        <div className="form-group mt-3">
                            <input type="submit" className="form-control bg-primary text-white" value="Send"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
