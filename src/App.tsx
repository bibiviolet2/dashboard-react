import * as React from 'react';
import PageContainer from './components/containers/PageContainer';
import useAppState from './hooks/useAppState';
import { AppStateProvider } from './hooks/useAppStateContext';
import { IntlProvider } from 'react-intl';
import langConfig from './config/lang.json';
import useLang from './hooks/useLang';
import flatten from 'flat';
import { LangContextProvider } from './hooks/useLangContext';
import { HashRouter } from 'react-router-dom';

const App: React.FC = () => {
    const { appState, increasePostsLimit, getPostsCount } = useAppState();
    const { lang, setLang } = useLang();

    return (
        <AppStateProvider
            appState={appState}
            getPostsCount={getPostsCount}
            increasePostsLimit={increasePostsLimit}
        >
            <IntlProvider
                messages={flatten((langConfig as Record<string, any>)[lang])}
                locale={lang}
            >
                <LangContextProvider lang={lang} setLang={setLang}>
                    <HashRouter>
                        <PageContainer></PageContainer>
                    </HashRouter>
                </LangContextProvider>
            </IntlProvider>
        </AppStateProvider>
    );
};

export default App;
