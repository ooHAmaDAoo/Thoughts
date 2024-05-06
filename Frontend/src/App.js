import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import NewPost from './components/NewPost';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import AccountSummary from './components/AccountSummary';
import Settings from './components/Settings';
// import PostHolder from './components/PostHolder';
import WhoToFollow from './components/WhoToFollow'
import TimeLine from './TimeLine';
import SearchPage from './components/SearchPage';
// import UploadPic from './components/UploadPic';
import ProfilePage from './components/ProfilePage';
import PostEditPage from './components/PostEditPage'
import UsersPageHolder from './components/UsersPageHolder';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './NotFound';
import DeleteMessage from './components/DeleteMessage';
// import PrintDate from './components/Date';
import ImageUploader from './components/DragDrop';


function App() {

  const url = "http://localhost:3800/users";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        // console.log("ERR: ", err);
      })
  }, []);


  // console.log(data);
  let user;
  (data) ? user = data[0] : console.log("na data yet")
  // console.log(user);

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <div className='App'>

              <div className='child1'>
                <Header />
              </div>
              <div className='child2'>
                <AccountSummary user={user} />
              </div>
              <div className='child3'>
                <NewPost />
                <TimeLine />
                {/* <PostHolder /> */}
              </div>
              <div className='child4'>
                <WhoToFollow />
              </div>
            </div>

          </PrivateRoute>} />
        {/* <Route path='/' element={<><Header /> <NewPost/></>} /> */}
        <Route path='/login' element={<PrivateRoute login={true}>
          <Header />
          <LogInPage />
        </PrivateRoute>
        } />
        <Route path='/signup' element={<PrivateRoute login={true}><Header /><SignUpPage /></PrivateRoute>} />
        <Route path='/search' element={<PrivateRoute>
          <div className='App'>

            <div className='child1'>
              <Header />
            </div>
            <div className='child2'>
              <AccountSummary user={user} />
            </div>
            <div className='child3'>
              <SearchPage />
              {/* <PostHolder /> */}
            </div>
            <div className='child4'>
              <WhoToFollow />
            </div>
          </div>

        </PrivateRoute>} />
        <Route path='/settings' element={<PrivateRoute><Header /><Settings /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><div className='App'>

          <div className='child1'>
            <Header />
          </div>
          <div className='child6'>
            <ProfilePage />
            {/* <PostHolder /> */}
          </div>
          <div className='child4'>
            <WhoToFollow />
          </div>
        </div></PrivateRoute>} />
        {/* <Route path='/tmp' element={<><Header /><UploadPic /></>} /> */}


        <Route path='/post/edit/:postID' element={<PrivateRoute><Header /> <PostEditPage /> </PrivateRoute>} />
        <Route path='/userProfile/:userID' element={<PrivateRoute><div className='App'>

          <div className='child1'>
            <Header />
          </div>
          <div className='child6'>
            <UsersPageHolder element="" /> {/* add the elements if needed*/}
            {/* <PostHolder /> */}
          </div>
          <div className='child4'>
            <WhoToFollow />
          </div>
        </div></PrivateRoute>} /> {/* maybe => :username */}
        <Route path="/DeleteMessage" element={<PrivateRoute><Header /><DeleteMessage /></PrivateRoute>} />
        {/* <Route path="/Date" element={<PrintDate />} /> */}
        <Route path="/Drag" element={<ImageUploader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
