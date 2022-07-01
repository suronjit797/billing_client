
import Logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="navbar navbar-expand bg_custom-primary">
            <div className="container">
                <Link to='/'>
                    <img src={Logo} alt="logo" style={{ maxWidth: '120px' }} />
                </Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    Paid Total : 0
                </ul>
            </div>
        </nav>
    );
}

export default Header;