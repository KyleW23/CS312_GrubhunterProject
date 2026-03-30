import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/assets/grubhunter-logo.svg';
import styles from 'components/header/logo/index.module.css';

const Logo = () => {
    return (
        <div>
            <Link href='/'>
                <Image
                    src={logo}
                    alt='Grubhunter Logo'
                    className={styles.root}
                />
            </Link>
        </div>
    );
};

export default Logo;

// Still need to do CONFIGURE step
