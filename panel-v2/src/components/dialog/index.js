import React, {Children, cloneElement, isValidElement, useEffect, useState} from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import Desktop from './desktop';
import Mobile from './mobile';

export default function Index(props) {

    const {children} = props

    const _children_with_props =  Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, {...props, ...child.props});
        }
        return child;
    });

    return (
        <>
            <MobileView>
                <Mobile
                    {...({
                        ...props,
                        children: _children_with_props
                    })}
                />
            </MobileView>
            <BrowserView>
                <Desktop
                    {...({
                        ...props,
                        children: _children_with_props
                    })}
                />
            </BrowserView>
        </>
    )
}