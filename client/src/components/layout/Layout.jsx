import { Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({main }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <Header/>


      {/* Main Content */}
      <Container 
      sx={{
        maxWidth: "90%", // Set a custom max width
        mx: "auto", // Center it
        px: 3, // Add extra padding
        "@media (max-width: 600px)": {
          px: 2, // Adjust padding for small screens
        },
      }}
       component="main" className="flex-grow overflow-auto">
        {main}
      </Container>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Layout;
