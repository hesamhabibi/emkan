import './App.css';
import {KernelContextProvider} from "./contexts/KernelContextProvider";
import {BrowserView, MobileView} from "react-device-detect";
import DesktopLayout from "./components/layout/desktop";
import MobileLayout from "./components/layout/mobile";
import CheckInternetComponent from "./components/errors/check-internet";
import Routes from "./Routes";
import {BrowserRouter} from "react-router-dom";
import ErrorBoundary from "./components/errors/error-boundray";
import ErrorComponents from "./components/errors/error-components";
import useErrorStatus from "./hooks/CheckError";
import StyledSnackbarProvider from "../src/providers";


function App() {

    const {error} = useErrorStatus();

    // console.log('useErrorStatus', error);
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <KernelContextProvider>
                    <StyledSnackbarProvider>
                        <CheckInternetComponent/>
                        <ErrorComponents/>
                        <MobileView>
                            <MobileLayout>
                                <Routes/>
                            </MobileLayout>
                        </MobileView>
                        <BrowserView>
                            <DesktopLayout>
                                <Routes/>
                            </DesktopLayout>
                        </BrowserView>
                    </StyledSnackbarProvider>
                </KernelContextProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
