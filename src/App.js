
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import WellnessRetreates from './components/WellnessRetreates';
import { useMediaQuery } from 'react-responsive'
function App() {

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <div className="App">
      <Header />
      {isDesktopOrLaptop && <WellnessRetreates />}
      {isTabletOrMobile && <WellnessRetreates />}
      <Footer />
    </div>
  );
}

export default App;
