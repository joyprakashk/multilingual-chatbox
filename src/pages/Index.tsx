import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DhanAILoanAssistant: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const scrollElements = useRef<NodeListOf<Element> | null>(null);
  const isMobile = useIsMobile();

  const styles = {
    scrollFadeKeyframes: {
      '@keyframes scroll-fade': {
        from: {
          opacity: 0,
          transform: 'translateY(50px)'
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)'
        }
      }
    },
    floatKeyframes: {
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0)'
        },
        '50%': {
          transform: 'translateY(-10px)'
        },
        '100%': {
          transform: 'translateY(0)'
        }
      }
    },
    rippleKeyframes: {
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(0)',
          opacity: 1
        },
        '100%': {
          transform: 'scale(5)',
          opacity: 0
        }
      }
    },
    fadeIn: {
      animation: 'scroll-fade 1s ease-in-out'
    },
    float: {
      animation: 'float 3s ease-in-out infinite'
    },
    scrollFadeIn: {
      animation: 'scroll-fade 1s ease-in-out',
      visibility: 'hidden'
    },
    scrollFadeInVisible: {
      visibility: 'visible'
    },
    logoContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '120px',
      margin: '0 auto'
    },
    logo: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#3182ce',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      position: 'relative',
      zIndex: 2
    },
    rippleRing: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: '2px solid #3182ce',
      borderRadius: '50%',
      opacity: 0,
      animation: 'ripple 3s infinite'
    },
    darkModeContainer: {
      background: darkMode ? 
        'linear-gradient(135deg, #2d3748, #4a5568)' : 
        'linear-gradient(to right, #edf2f7, #e2e8f0)',
      color: darkMode ? '#e2e8f0' : '#2d3748',
      transition: 'all 0.5s ease-in-out'
    },
    darkModeCard: {
      background: darkMode ? 'rgba(74, 85, 104, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderColor: darkMode ? 'rgba(113, 128, 150, 0.3)' : 'rgba(226, 232, 240, 0.8)',
      color: darkMode ? '#e2e8f0' : '#2d3748',
      boxShadow: darkMode ? 
        '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)' : 
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.5s ease-in-out'
    },
    darkModeFeature: {
      transform: 'translateY(0px)',
      transition: 'transform 0.5s ease, box-shadow 0.3s ease, background-color 0.5s ease',
      '&:hover': {
        transform: 'translateY(-10px)'
      }
    },
    footer: {
      backgroundColor: darkMode ? '#1a202c' : '#2a4365',
      color: '#e2e8f0',
      transition: 'background-color 0.5s ease'
    },
    switchTrack: {
      backgroundColor: darkMode ? '#4c51bf' : '#e2e8f0',
      transition: 'background-color 0.3s ease'
    },
    switchThumb: {
      backgroundColor: darkMode ? '#e2e8f0' : '#3182ce',
      transition: 'transform 0.3s ease, background-color 0.3s ease'
    },
    chatButton: {
      background: darkMode ? 
        'linear-gradient(135deg, #4c51bf, #5a67d8)' : 
        'linear-gradient(135deg, #3182ce, #4299e1)',
      color: 'white',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: darkMode ? 
          '0 0 15px rgba(76, 81, 191, 0.6)' : 
          '0 0 15px rgba(49, 130, 206, 0.5)'
      }
    }
  };

  const elementInView = (el: Element, dividend: number = 1): boolean => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element: Element): void => {
    element.classList.add("scroll-fade-in-visible");
  };

  const handleScrollAnimation = (): void => {
    if (scrollElements.current) {
      scrollElements.current.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        }
      });
    }
  };

  useEffect(() => {
    scrollElements.current = document.querySelectorAll(".scroll-fade-in");
    
    const scrollHandler = () => {
      handleScrollAnimation();
    };
    
    window.addEventListener("scroll", scrollHandler);
    
    handleScrollAnimation();
    
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes scroll-fade {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0);
        }
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(5); 
          opacity: 0;
        }
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(49, 130, 206, 0.6);
        }
        70% {
          box-shadow: 0 0 0 15px rgba(49, 130, 206, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(49, 130, 206, 0);
        }
      }
      
      @keyframes glow {
        from {
          box-shadow: 0 0 5px rgba(66, 153, 225, 0.5);
        }
        to {
          box-shadow: 0 0 20px rgba(66, 153, 225, 0.8);
        }
      }
      
      .fade-in {
        animation: scroll-fade 1s ease-in-out;
      }
      
      .float {
        animation: float 3s ease-in-out infinite;
      }
      
      .pulse {
        animation: pulse 2s infinite;
      }
      
      .glow {
        animation: glow 1.5s alternate infinite;
      }
      
      .scroll-fade-in {
        animation: scroll-fade 1s ease-in-out;
        visibility: hidden;
      }
      
      .scroll-fade-in-visible {
        visibility: visible;
      }
      
      .dark-mode {
        background: linear-gradient(135deg, #2d3748, #4a5568);
        color: #e2e8f0;
        transition: all 0.5s ease;
      }
      
      .dark-mode .logo {
        background-color: #4c51bf;
        box-shadow: 0 0 20px rgba(76, 81, 191, 0.6);
      }
      
      .dark-mode .ripple-ring {
        border-color: #4c51bf;
      }
      
      .dark-mode .text-blue-900 {
        color: #c3dafe;
      }
      
      .dark-mode .bg-white {
        background-color: #4a5568;
        color: #e2e8f0;
      }
      
      .dark-mode .text-gray-600,
      .dark-mode .text-gray-700 {
        color: #cbd5e0;
      }
      
      .dark-mode .bg-blue-600 {
        background-color: #4c51bf;
      }
      
      .dark-mode .hover\\:bg-blue-700:hover {
        background-color: #434190;
      }
      
      .dark-mode .text-blue-600 {
        color: #a3bffa;
      }
      
      .dark-mode .text-purple-600 {
        color: #d6bcfa;
      }
      
      .dark-mode .text-green-600 {
        color: #9ae6b4;
      }
      
      .dark-mode .text-yellow-600 {
        color: #faf089;
      }
      
      .dark-mode-card {
        background-color: rgba(74, 85, 104, 0.7);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(113, 128, 150, 0.3);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        transition: all 0.5s ease;
      }
      
      .light-mode-card {
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(226, 232, 240, 0.8);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transition: all 0.5s ease;
      }
      
      .logo-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        margin: 0 auto;
      }
      
      .logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: bold;
        position: relative;
        z-index: 2;
        transition: all 0.5s ease;
      }
      
      .ripple-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0;
        animation: ripple 3s infinite;
      }
      
      .chatbot-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .chatbot-button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
      
      .chatbot-button:hover::after {
        transform: translate(-50%, -50%) scale(2);
        opacity: 1;
      }
      
      .feature-card {
        transform: translateY(0);
        transition: transform 0.5s ease, box-shadow 0.3s ease, background-color 0.5s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-10px);
      }
      
      .icon-float {
        animation: float 3s ease-in-out infinite;
        display: block;
        margin-bottom: 1.5rem;
        font-size: 2.5rem;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      document.head.removeChild(styleSheet);
    };
  }, [darkMode]);

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode-body');
  };

  const handleChatbotClick = (): void => {
    window.location.href = "https://f38e-14-99-164-234.ngrok-free.app/";
  };

  return (
    <div 
      className={`${darkMode ? 'dark-mode' : ''} min-h-screen font-sans transition-all duration-500`}
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, #2d3748, #4a5568)' 
          : 'linear-gradient(135deg, #edf2f7, #e2e8f0)',
      }}
    >
      <div className="container mx-auto px-4 py-8 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Sun className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
          <Switch 
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            className={`${darkMode ? 'bg-indigo-600' : 'bg-blue-600'}`}
          />
          <Moon className={`w-5 h-5 ${darkMode ? 'text-indigo-300' : 'text-gray-400'}`} />
        </div>

        <section className="text-center py-16 fade-in">
          <div className="logo-container">
            <div 
              className={`logo ${darkMode ? 'pulse' : 'glow'}`} 
              style={{
                backgroundColor: darkMode ? '#5a67d8' : '#3182ce',
                boxShadow: darkMode 
                  ? '0 0 20px rgba(90, 103, 216, 0.6)' 
                  : '0 0 15px rgba(49, 130, 206, 0.5)'
              }}
            >
              Dhan AI
            </div>
            <div className="ripple-ring" style={{borderColor: darkMode ? '#5a67d8' : '#3182ce'}}></div>
            <div className="ripple-ring" style={{animationDelay: '1s', borderColor: darkMode ? '#5a67d8' : '#3182ce'}}></div>
            <div className="ripple-ring" style={{animationDelay: '2s', borderColor: darkMode ? '#5a67d8' : '#3182ce'}}></div>
          </div>
          <h1 
            className={`text-5xl font-bold mt-6 animate__animated animate__fadeInDown ${darkMode ? 'text-white' : 'text-blue-900'}`}
            style={{
              textShadow: darkMode ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Dhan AI
          </h1>
          <p 
            className={`text-xl mt-4 animate__animated animate__fadeInUp ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            Your AI-Powered Multilingual, Conversational Loan Assistant
          </p>
          
          <div className="flex justify-center mt-10">
            <Button 
              onClick={handleChatbotClick}
              className="chatbot-button group relative"
              size="lg"
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, #5a67d8, #6875dd)' 
                  : 'linear-gradient(135deg, #3182ce, #4299e1)',
                boxShadow: darkMode 
                  ? '0 4px 6px rgba(0, 0, 0, 0.15)' 
                  : '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                padding: '1rem 2rem',
                fontSize: '1.125rem'
              }}
            >
              <span className="relative z-10">Talk to Chatbot</span>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <h2 
            className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-blue-900'}`}
            style={{
              textShadow: darkMode ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className={`rounded-lg p-8 feature-card scroll-fade-in`}
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, #5a67d8, #4c51bf)' 
                  : 'linear-gradient(135deg, #3182ce, #4299e1)',
                color: '#ffffff',
                boxShadow: darkMode 
                  ? '0 8px 16px rgba(0, 0, 0, 0.2)' 
                  : '0 8px 16px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease, box-shadow 0.3s ease',
                border: darkMode 
                  ? '1px solid rgba(90, 103, 216, 0.3)' 
                  : '1px solid rgba(49, 130, 206, 0.3)'
              }}
            >
              <i className={`fas fa-robot text-4xl icon-float text-white`}></i>
              <h3 className={`text-xl font-semibold mt-4 text-white`}>Chat Assistant with AI</h3>
              <p className={`mt-4 text-white opacity-90`}>
                Get instant loan guidance based on your financial situation and needs. Our app will talk you through the loan process.
              </p>
            </div>
            <div 
              className={`rounded-lg p-8 feature-card scroll-fade-in`}
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, #5a67d8, #4c51bf)' 
                  : 'linear-gradient(135deg, #3182ce, #4299e1)',
                color: '#ffffff',
                boxShadow: darkMode 
                  ? '0 8px 16px rgba(0, 0, 0, 0.2)' 
                  : '0 8px 16px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease, box-shadow 0.3s ease',
                border: darkMode 
                  ? '1px solid rgba(90, 103, 216, 0.3)' 
                  : '1px solid rgba(49, 130, 206, 0.3)'
              }}
            >
              <i className={`fas fa-calculator text-4xl icon-float text-white`}></i>
              <h3 className={`text-xl font-semibold mt-4 text-white`}>Loan Eligibility Calculator</h3>
              <p className={`mt-4 text-white opacity-90`}>
                Easily get to know if you are eligible for loan, based on your Credit Score, Income, and other factors.
              </p>
            </div>
            <div 
              className={`rounded-lg p-8 feature-card scroll-fade-in`}
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, #5a67d8, #4c51bf)' 
                  : 'linear-gradient(135deg, #3182ce, #4299e1)',
                color: '#ffffff',
                boxShadow: darkMode 
                  ? '0 8px 16px rgba(0, 0, 0, 0.2)' 
                  : '0 8px 16px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease, box-shadow 0.3s ease',
                border: darkMode 
                  ? '1px solid rgba(90, 103, 216, 0.3)' 
                  : '1px solid rgba(49, 130, 206, 0.3)'
              }}
            >
              <i className={`fas fa-lock text-4xl icon-float text-white`}></i>
              <h3 className={`text-xl font-semibold mt-4 text-white`}>Secure & Private</h3>
              <p className={`mt-4 text-white opacity-90`}>
                Your data is safe with end-to-end encryption. We do not store any of your personal information.
              </p>
            </div>
          </div>
        </section>

        <footer 
          className="text-center py-10 text-white mt-16 rounded-lg fade-in animate__animated animate__fadeInUp"
          style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #2d3748, #4a5568)' 
              : 'linear-gradient(135deg, #2a4365, #3182ce)',
            boxShadow: darkMode 
              ? '0 -4px 6px rgba(0, 0, 0, 0.1)' 
              : '0 -4px 6px rgba(0, 0, 0, 0.05)',
            borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
          }}
        >
          <p className="text-white opacity-90">&copy; 2025 Dhan AI. All rights reserved.</p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="#" className="text-white opacity-75 hover:opacity-100 transition duration-300 transform hover:scale-110">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-white opacity-75 hover:opacity-100 transition duration-300 transform hover:scale-110">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-white opacity-75 hover:opacity-100 transition duration-300 transform hover:scale-110">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DhanAILoanAssistant;
