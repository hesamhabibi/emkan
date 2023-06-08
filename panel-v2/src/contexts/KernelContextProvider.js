import { ModeColorContextProvider } from "./ModeColorContext";
import { LanguageContextProvider } from "./LanguagesContext";
import { TimeZoneContextProvider } from "./TimeZoneContext";
import { FooterComponentContextProvider } from "./FooterComponentContext";
import { HeaderComponentContextProvider } from "./HeaderComponentContext";
import { DialogContextProvider } from "./DialogContext";
import { LoadingContextProvider } from "./LodingContext";
import ApolloClientContextProvider from "./ApolloClientContext";
import AuthContextProvider from "./AuthContext";

export const KernelContextProvider = ({ children }) => (
    <AuthContextProvider>
      <ApolloClientContextProvider>
        <LoadingContextProvider>
          <LanguageContextProvider>
            <ModeColorContextProvider>
              <TimeZoneContextProvider>
                <HeaderComponentContextProvider>
                  <FooterComponentContextProvider>
                    <DialogContextProvider>{children}</DialogContextProvider>
                  </FooterComponentContextProvider>
                </HeaderComponentContextProvider>
              </TimeZoneContextProvider>
            </ModeColorContextProvider>
          </LanguageContextProvider>
        </LoadingContextProvider>
      </ApolloClientContextProvider>
    </AuthContextProvider>
);
