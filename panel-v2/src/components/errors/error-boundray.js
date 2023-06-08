import React from "react";
import FrontError from "./front-error";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: ""
        };
    }

    static getDerivedStateFromError(error) {
        // console.log('getDerivedStateFromError', error);
        return {
            hasError: true,
            error: error
        };
    }

    render() {
        const { hasError, error } = this.state;
        if (hasError) {
            // You can render any custom fallback UI
            return (
                <FrontError error={error}/>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
