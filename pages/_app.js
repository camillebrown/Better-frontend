import { ChakraProvider } from "@chakra-ui/react"
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer';
import '../styles.css'

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <NavBar />
            <div className="container">
                <Component {...pageProps} />
            </div>
            <Footer />
        </ChakraProvider >
    );
}
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
export default MyApp;