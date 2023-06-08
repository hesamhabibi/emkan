import { SnackbarProvider } from "notistack";
import {styled} from "@mui/material/styles";
import {withStyles} from "@material-ui/styles";


const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
    '& .notistack-MuiContent': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

// const CustomSnackbar = styled('div')(({ theme }) => ({
//     background: '#F1416C',
//     color: 'white',
// }));
// const styles = {
//     success: { backgroundColor: "#7d7c7d" },
//     info: { backgroundColor: "#D71920" },
//     error:{backgroundColor:'#F1416C'}
// };

const Index = ({children}) => {

    return (
        <StyledSnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            // classes={{
            //     variantCustom: CustomSnackbar,
            // }}
            // classes={{
            //     variantSuccess: classes.success,
            //     variantInfo: classes.info,
            //     variantError:classes.error
            // }}
        >
            {children}
        </StyledSnackbarProvider>
    );
};
export default Index
