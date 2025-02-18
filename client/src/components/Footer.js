import './Footer.css'

function Footer() {
    return (
        <footer className="footer bg-light" style={{borderTop:'solid black 1px'}}>
            <div className='links-wrapper container-fluid'>
                <div className='row'>
                    <div className='footer-logo-wrapper col'>
                        {/* <img src={process.env.PUBLIC_URL + './company.png'}></img> */}
                        <a href="#" className='socialLinks'>
                            <i className="fa fa-facebook-square fa-3x"></i>
                        </a>
                        <a href="#" className='socialLinks'> 
                            <i className="fa fa-google-plus-square fa-3x"></i>
                        </a>
                    </div>
                    <div className='footerlinks col-sm-12 col-lg-3'>
                        <span>Support</span>
                        <ul>
                            <li>
                                <a href="#">Help</a>
                            </li>
                            <li>
                                <a href="#">Advisories</a>
                            </li>
                            <li>
                                <a href="#">Status</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className='footerlinks col-sm-12 col-lg-3'>
                        <span>Company</span>
                        <ul>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Press</a>
                            </li>
                        </ul>
                    </div>
                    <div className='footerlinks col-sm-12 col-lg-3'>
                        <span>Terms & Policies</span>
                        <ul>
                            <li>
                                <a href="#">Policies</a>
                            </li>
                            <li>
                                <a href="#">Terms of Use</a>
                            </li>
                            <li>
                                <a href="#">Code of Conduct</a>
                            </li>
                            <li>
                                <a href="#">Privacy</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col'></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
