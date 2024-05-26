import logo from './logo.svg';
import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from './components/account/Login'
import Homepage from './Home/home';
import Header from './components/header/header';
import CreatePost from './components/create/CreatePost';
import DataProvider from './context/dataprovider';
import DetailView from './details/DetailView';
import Update from './components/create/update';
import SpeechToText from './components/speech';
import Contact from './components/Contact/Contact';
import About from './components/about';
function App() {
  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            
            <Route path='/' element={<Homepage/>}/>
            <Route path = '/create' element={<CreatePost/>}/>
            <Route path='/details/:id' element={<DetailView />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/speech' element={<SpeechToText/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>  
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
