import Footer from "./Footer"


const Layout = ({ header, main }) => {

    return (
        <div className=' w-screen h-screen left-0 top-0 absolute'>
            {header}
            {main}
            <Footer />
        </div>
    )
}
export default Layout