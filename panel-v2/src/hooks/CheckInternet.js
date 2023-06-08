import {useEffect, useState} from "react" ;

function useOnlineStatus() {
    const [online, set_online] = useState(window.navigator.onLine)

    useEffect(() => {

        function handleOnline() {
            set_online(true)
        }

        function handleOffline() {
            set_online(false)
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    return online
}

export default useOnlineStatus