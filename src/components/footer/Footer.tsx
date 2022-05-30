import React from 'react';
import layoutStyles from '../containers/layout.module.scss';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={layoutStyles.pageContainer}>
                Bibiana Bartošová - 2022
            </div>
        </div>
    );
};

export default Footer;
