import React from 'react';
import layoutStyles from '../containers/layout.module.scss';
import styles from './Header.module.scss';
import { FormattedMessage } from 'react-intl';
import LangSwitcher from '../langSwitcher/LangSwitcher';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={layoutStyles.pageContainer}>
                <h1>
                    <Link to="/">
                        <FormattedMessage
                            defaultMessage="Dashboard"
                            id="header.title"
                        />
                    </Link>
                </h1>
                <LangSwitcher />
            </div>
        </div>
    );
};

export default Header;
