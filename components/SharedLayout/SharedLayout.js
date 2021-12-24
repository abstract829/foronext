import Footer from "../Footer/Footer"
import Header from "../Header/Header"

const SharedLayout = ({children}) => {
    return (
        <>
        <Header/>
            {children}
        <Footer/>
        </>
    )
}

export default SharedLayout
