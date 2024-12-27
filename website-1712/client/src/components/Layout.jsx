
const Layout = ({ children }) => {
    const {Header, Main} = children
    return (
        <div className=' w-screen h-screen left-0 top-0 absolute'>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
export default Layout