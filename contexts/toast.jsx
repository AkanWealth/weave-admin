import { Bounce, toast } from "react-toastify";

const { createContext, useContext } = require("react");

const MessageContext = createContext()

export function ToastContext({ children }) {
    const showMessage = (message, status) => {
        let toastOptions = {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        }

        if (status === 'success') {
            toast.success(message, toastOptions)
        } else if (status === 'error') {
            toast.error(message, toastOptions)
        } else (
            toast(message, toastOptions)
        )
    }
    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext)