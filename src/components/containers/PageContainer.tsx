import * as React from 'react';
import ListContainer from './ListContainer';
import layoutStyles from './layout.module.scss';
import Header from '../header/Header';
import { Routes, Route, useLocation, Location } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DetailContainer from './DetailContainer';
import Footer from '../footer/Footer';

const PageContainer: React.FC = () => {
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState<Location>(location);
    const [transitionStage, setTransitionStage] = useState('fadeIn');

    useEffect(() => {
        if (location === displayLocation) {
            return;
        }
        setTransitionStage('fadeOut');
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [location, displayLocation]);

    return (
        <>
            <Header />
            <div className={layoutStyles.pageContainer}>
                <div
                    className={
                        'fadeOut' === transitionStage
                            ? layoutStyles.fadeOut
                            : layoutStyles.fadeIn
                    }
                    onAnimationEnd={() => {
                        if ('fadeOut' === transitionStage) {
                            setTransitionStage('fadeIn');
                            setDisplayLocation(location);
                        }
                    }}
                >
                    <Routes location={displayLocation}>
                        <Route path="/" element={<ListContainer />} />
                        <Route path="/:id" element={<DetailContainer />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PageContainer;
