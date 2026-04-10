import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '@/components/button';
import styles from '@/components/header/auth-element/index.module.css';
import Link from 'next/link';

const AuthElement = () => {
    const { data: session, status } = useSession();
    return (
        <>
            <div>
                {status === 'authenticated' ? (
                    <div>
                        <p>Welcome, {session.user.name}!</p>
                        <nav className={styles.root}>
                            <Link
                                href={
                                    '/list/' + session.user.fdlst_private_userId
                                }
                            >
                                <Button disabled={false} variant='outline'>
                                    Wish List
                                </Button>
                            </Link>
                            <Button
                                disabled={false}
                                variant='blue'
                                clickHandler={() => signOut()}
                            >
                                Sign Out
                            </Button>
                        </nav>
                    </div>
                ) : (
                    <div>
                        <Button
                            disabled={false}
                            variant='blue'
                            clickHandler={() => signIn()}
                        >
                            Sign In
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AuthElement;
