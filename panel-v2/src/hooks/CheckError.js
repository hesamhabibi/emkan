import {useEffect, useState} from 'react';

const custom_error_event = 'custom_error_event'
const clear_custom_error_event = 'clear_custom_error_event'

function useCheckError() {
    const [error, set_error] = useState(undefined)

    const reset_error = () => {
        window.dispatchEvent(new Event(clear_custom_error_event))
    }

    const empty_error = () => {
        set_error(undefined)
    }

    const handle_error = e => {
        if (e.type === custom_error_event) {
            set_error(e.detail)
        } else {
            set_error(e)
        }
    }

    // listener error events
    useEffect(() => {
        window.addEventListener("error", handle_error)
        window.addEventListener(custom_error_event, handle_error)
        window.addEventListener(clear_custom_error_event, empty_error)

        return () => {
            window.removeEventListener("error", handle_error)
            window.removeEventListener(custom_error_event, handle_error)
            window.removeEventListener(clear_custom_error_event, empty_error)
        }
    }, [])

    return {error, reset_error}

}

export default useCheckError;

export {
    custom_error_event,
    clear_custom_error_event
}