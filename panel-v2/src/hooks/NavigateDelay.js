// import {useNavigate} from "react-router-dom";
import {useLoadingContext} from "../contexts/LodingContext";

function useNavigateDelay() {

    const {set_loading} = useLoadingContext();

    // const navigate = useNavigate();

    const delay_link = (e, to) => {
        e.preventDefault();
        // set_loading(true)
        // setTimeout(() => {
        //     set_loading(false)
        //     navigate(to)
        // }, 700);
    }
    return delay_link
}

export default useNavigateDelay