import './App.css';
import './Animate.css'
import { useState, useEffect } from 'react';
import { db } from './resources/config';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
// import { FaCheck } from "react-icons/fa";
import * as EmailValidator from 'email-validator';
import axios from 'axios';

import binanceLogo from './assets/logo/binance.png';
import metamaskLogo from './assets/logo/metamask.png';
import coinbaseLogo from './assets/logo/coinbase.png';
import amazonLogo from './assets/logo/amazon.png';
import googleLogo from './assets/logo/google.png';
import mkcLogo from './assets/logo/mk&c.png';
import cub from './assets/compo/Cub.png';
import topo from './assets/compo/Topology.png';
import preview from './assets/compo/preview.png';

function App() {
  const [emailValue, setEmailValue] = useState('');
  const [isToast, setIsToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [processCondition, setProcessCondition] = useState('Subs');

  async function save(e) {
    e.preventDefault();
    setProcessCondition('Load');
    try {
      let data = {
        "publication_id": process.env.REACT_APP_PUBLICATION_ID,
        "email": emailValue,
        "reactivate_existing": false,
        "send_welcome_email": true,
        "utm_medium": "organic",
        "referring_site": "chaincatalyst.launchy.app"
      }

      await axios.post(`https://launchy-server.rshme.codes/api/v1/user/subscribe`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((result) => {
        console.log(result);
        const colRefget = collection(db, 'registerCollaboration');
        const saveRegistrant = async (email) => {
          await addDoc(colRefget, {
            email: email,
            status: 'pending',
            referring: 'chaincatalyst',
            createdAt: new Date().toUTCString(),
          });
        };
        saveRegistrant(
          emailValue,
        ).then(() => {
          setProcessCondition('Success');
          setIsToast(true);
          setToastMessage('Email successfully subscribed!');
          setTimeout(function () {
            setProcessCondition('Subs');
          }, 2000);
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
        setProcessCondition('Subs');
        setIsToast(true);
        setToastMessage('Something wrong, please try again later!');
      });
    } catch (err) {
      console.log(err);
      setProcessCondition('Subs');
    }
  };

  useEffect(() => {
  }, [emailValue]);

  useEffect(() => {
    if (!isToast) return;

    const intervalId = setInterval(() => {
      setIsToast(false);
      setToastMessage('');
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isToast]);

  return (
    <section className="bg-white sm:py-0 h-screen flex-center relative">
      <img className='cub-1' src={cub} alt='' />
      <div className="px-4 mx-auto max-w-6xl 2xl:max-w-7xl sm:px-6 lg:px-8">
        <div className="grid max-w-lg grid-cols-1 lg:grid-cols-2 mx-auto lg:max-w-none card-shadow-wrapper">
          <div className="bg-white p-10 rounded-3xl card-shadow-cs md:m-14 lg:m-20 2xl:mx-10 2xl:my-6 z-50">
            <div className='mb-8'>
              <img className="w-3/4 h-8 mx-auto h-auto" src="./assets/cc-logo.png" alt="" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-normal text-gray-900 sm:text-4xl xl:text-4xl overflow-y-hidden" style={{ letterSpacing: '-1px' }}><span className='font-black'>Web3 Made</span> <br /> Simple</h1>

              <p className="px-4 mt-5 font-normal text-gray-900 sm:px-0">"Stay up to date with the latest web3 products, news, strategies and trends."</p>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <div className='block w-full'>
                  <input
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                    }}
                    type="email"
                    name=""
                    id=""
                    placeholder="Your email"
                    className="focus:border-red-900 focus:outline-none focus:ring-white w-full rounded-3xl"
                    autoFocus
                  />
                </div>
                <div className='block mt-2'>
                  <button className='focus:ring-core-900 focus:border-red-900 focus:outline-none bg-red-900 w-full rounded-3xl py-2 text-white' onClick={(e) => {
                    let mailChecker = EmailValidator.validate(emailValue);
                    if (mailChecker) {
                      save(e);
                    } else {
                      setIsToast(true);
                      setToastMessage('Please enter your email correctly.');
                    }
                  }}>
                    {processCondition === 'Subs' &&
                      <span className='font-semibold'>Subscribe</span>
                    }
                    {processCondition === 'Success' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check mx-auto" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="white"></path>
                      </svg>
                    }
                    {processCondition === 'Load' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots mx-auto" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="white"></path>
                      </svg>
                    }
                  </button>
                </div>
              </div>
            </div>
            <div className='text-center my-4'>
              <p className='pt-2 pl-3 font-normal'>Read by people working at:</p>
            </div>
            <div>
              <div className='grid grid-cols-3'>
                <img className='pr-1' src={coinbaseLogo} alt='' width="100" />
                <img className='px-1' src={binanceLogo} alt='' width="100" />
                <img className='pl-1' src={metamaskLogo} alt='' width="100" />
              </div>
              <div className='grid grid-cols-3 mt-2'>
                <img className='pr-1' src={amazonLogo} alt='' width="100" />
                <img className='px-1' src={googleLogo} alt='' width="100" />
                <img className='pl-1' src={mkcLogo} alt='' width="100" />
              </div>
            </div>
          </div>
          <div className='hidden lg:block h-full'>
            <img className='preview-img' src={preview} alt='' />
          </div>
        </div>
      </div>
      <img className='cub-2' src={topo} alt='' />
      {
        isToast &&
        <div id="toast-bottom-right" className="bg-core-900 flex fixed right-5 bottom-5 items-center p-4 space-x-4 w-full max-w-xs text-gray-50 rounded-lg divide-x divide-gray-200 shadow" role="alert">
          <div className="text-sm font-normal flex items-center">
            <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2 bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="white"></path> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" fill="white"></path>
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      }
    </section >
  );
}

export default App;
