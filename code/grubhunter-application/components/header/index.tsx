import Logo from 'components/header/logo/index';
import AuthElement from './auth-element';

const Header = () => {
    return (
        <header>
            <div className='layout-grid'>
                <Logo />
                <AuthElement />
            </div>
        </header>
    );
};

export default Header;
