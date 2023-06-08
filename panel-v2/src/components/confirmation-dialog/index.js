import React from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import Desktop from './desktop';
import Mobile from './mobile';

export default function Index(props) {
    return (
        <>
            <MobileView>
                <Mobile{...(props)}/>
            </MobileView>
            <BrowserView>
                <Desktop {...(props)}/>
            </BrowserView>
        </>
    )
}