
import Logo from '../../images/logo.png'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg_custom-primary">
            <div className="container">
                <img src={Logo} alt="logo" style={{ maxWidth: '120px' }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        Paid Total : 0
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;