import { FormattedMessage } from 'react-intl';
import { useLangContext } from '../../hooks/useLangContext';
import React from 'react';
import styles from './LangSwitcher.module.scss';

const LangSwitcher: React.FC = () => {
    const { lang, setLang } = useLangContext();

    return (
        <div className={styles.langSwitcher}>
            <button
                onClick={() => {
                    setLang('cs');
                }}
                disabled={'cs' === lang}
            >
                <FormattedMessage defaultMessage="Česky" id="lang.cs" />
            </button>
            <button
                onClick={() => {
                    setLang('en');
                }}
                disabled={'en' === lang}
            >
                <FormattedMessage defaultMessage="English" id="lang.en" />
            </button>
        </div>
    );
};

export default LangSwitcher;
