import React from 'react'

const Footer = () => {
    return (
        
        <footer className='footer'>
            <div className="footer__social-media">
                    <div className='wrapper'>
                        <div className='icon facebook'>
                            <div className='socialName'>Facebook</div>
                            <a href='https://www.facebook.com/' target='_blank' rel='noreferrer' className='footer__socialMedia-icon'>
                            <span><i className='fab fa-facebook-f'/></span>
                            </a>
                        </div>
                    </div>
                    <div className='wrapper'>
                        <div className='icon twitter'>
                            <div className='socialName'>Twitter</div>
                            <a href='https://www.twitter.com/' target='_blank' rel='noreferrer' className='footer__socialMedia-icon'>
                            <span><i className='fab fa-twitter'/></span>
                            </a>
                        </div>
                    </div>
                    <div className='wrapper'>
                        <div className='icon instagram'>
                            <div className='socialName'>Instagram</div>
                            <a href='https://www.instagram.com/' target='_blank' rel='noreferrer' className='footer__socialMedia-icon'>
                            <span><i className='fab fa-instagram'/></span>
                            </a>
                        </div>
                    </div>
                    <div className='wrapper'>
                        <div className='icon github'>
                            <div className='socialName'>Github</div>
                        <a href='https://www.github.com/martinjacobsen93' target='_blank' rel='noreferrer' className='footer__socialMedia-icon'>
                            <span><i className='fab fa-github'/></span>
                        </a>
                        </div>
                    </div>
                <div className='wrapper'>
                    <div className='icon youtube'>
                        <div className='socialName'>Youtube</div>
                        <a href='https://www.youtube.com/' target='_blank' rel='noreferrer' className='footer__socialMedia-icon'>
                        <span><i className='fab fa-youtube'/></span>
                        </a>
                    </div>
                </div>
            </div>

            <p className="footer__copyright">Copyright © | Mobile Imports Inc.</p>
        </footer>
    )
}

export default Footer
