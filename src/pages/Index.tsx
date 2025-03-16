import React, { useState, useEffect, useRef } from 'react';

const DhanAILoanAssistant: React.FC = () => {
const [darkMode, setDarkMode] = useState<boolean>(false);
const scrollElements = useRef<NodeListOf<Element> | null>(null);

  // CSS Styles as a JavaScript object
  const styles = {
    // Add your styles from the CSS file here as JavaScript objects
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
    }
  };

  // Function to check if element is in view
  const elementInView = (el: Element, dividend: number = 1): boolean => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  // Function to display scroll element
  const displayScrollElement = (element: Element): void => {
    element.classList.add("scroll-fade-in-visible");
  };

  // Function to handle scroll animation
  const handleScrollAnimation = (): void => {
    if (scrollElements.current) {
      scrollElements.current.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        }
      });
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    scrollElements.current = document.querySelectorAll(".scroll-fade-in");
    
    const scrollHandler = () => {
      handleScrollAnimation();
    };
    
    window.addEventListener("scroll", scrollHandler);
    
    // Initial check for elements in view on mount
    handleScrollAnimation();
    
    // Create CSS keyframes for animations
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
      
      .fade-in {
        animation: scroll-fade 1s ease-in-out;
      }
      
      .float {
        animation: float 3s ease-in-out infinite;
      }
      
      .scroll-fade-in {
        animation: scroll-fade 1s ease-in-out;
        visibility: hidden;
      }
      
      .scroll-fade-in-visible {
        visibility: visible;
      }
      
      .dark-mode {
        background-color: #1a202c;
        color: #cbd5e0;
      }
      
      .dark-mode .logo {
        background-color: #2c5282;
      }
      
      .dark-mode .ripple-ring {
        border-color: #2c5282;
      }
      
      .dark-mode .text-blue-900 {
        color: #a0aec0;
      }
      
      .dark-mode .bg-white {
        background-color: #2d3748;
        color: #cbd5e0;
      }
      
      .dark-mode .bg-blue-900 {
        background-color: #2d3748;
      }
      
      .dark-mode .bg-gradient-to-r {
        background: linear-gradient(to right, #2d3748, #1a202c);
      }
      
      .dark-mode .shadow-lg {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      
      .dark-mode .hover\\:shadow-xl:hover {
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
      }
      
      .dark-mode .text-gray-600 {
        color: #a0aec0;
      }
      
      .dark-mode .text-gray-700 {
        color: #cbd5e0;
      }
      
      .dark-mode .bg-blue-600 {
        background-color: #3182ce;
      }
      
      .dark-mode .hover\\:bg-blue-700:hover {
        background-color: #2c5282;
      }
      
      .dark-mode .bg-blue-50 {
        background-color: #2d3748;
      }
      
      .dark-mode .bg-purple-50 {
        background-color: #2d3748;
      }
      
      .dark-mode .text-white {
        color: #cbd5e0;
      }
      
      .dark-mode .text-blue-600 {
        color: #63b3ed;
      }
      
      .dark-mode .text-purple-600 {
        color: #9f7aea;
      }
      
      .dark-mode .text-green-600 {
        color: #68d391;
      }
      
      .dark-mode .text-yellow-600 {
        color: #f6e05e;
      }
      
      .dark-mode body {
        background: linear-gradient(to right, #2d3748, #1a202c);
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
        background-color: #3182ce;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: bold;
        position: relative;
        z-index: 2;
      }
      
      .ripple-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #3182ce;
        border-radius: 50%;
        opacity: 0;
        animation: ripple 3s infinite;
      }
      
      .ripple-ring:nth-child(1) {
        animation-delay: 0s;
      }
      
      .ripple-ring:nth-child(2) {
        animation-delay: 1s;
      }
      
      .ripple-ring:nth-child(3) {
        animation-delay: 2s;
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  // Handle chatbot button click
  const handleChatbotClick = (): void => {
    window.location.href = "https://f38e-14-99-164-234.ngrok-free.app/";
  };

  return (
    <div className={`${darkMode ? 'dark-mode' : ''} bg-gradient-to-r from-blue-50 to-purple-50 font-sans transition-all duration-500`}>
      <div className="container mx-auto px-4 py-8 relative">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700"
        >
          Night Button
        </button>

        {/* Hero Section */}
        <section className="text-center py-16 fade-in">
          {/* Logo with Ripple Effect */}
          <div className="logo-container">
            <div className="logo">Dhan AI</div>
            <div className="ripple-ring"></div>
            <div className="ripple-ring"></div>
            <div className="ripple-ring"></div>
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mt-6 animate__animated animate__fadeInDown">
            Dhan AI
          </h1>
          <p className="text-xl text-gray-700 mt-4 animate__animated animate__fadeInUp">
            Your AI-Powered Multilingual, Conversational Loan Assistant
          </p>
          
  
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleChatbotClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg font-medium transform hover:scale-105"
            >
              Talk to Chatbot
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 scroll-fade-in">
              <i className="fas fa-robot text-4xl text-blue-600 float"></i>
              <h3 className="text-xl font-semibold mt-4">Chat Assistant with AI</h3>
              <p className="text-gray-600 mt-2">
                Get instant loan guidance based on your financial situation and needs. Our app will talk you through the loan process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 scroll-fade-in">
              <i className="fas fa-calculator text-4xl text-purple-600 float"></i>
              <h3 className="text-xl font-semibold mt-4">Loan Eligibility Calculator</h3>
              <p className="text-gray-600 mt-2">
                Easily get to know if you are eligible for loan, based on your Credit Score, Income, and other factors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 scroll-fade-in">
              <i className="fas fa-lock text-4xl text-green-600 float"></i>
              <h3 className="text-xl font-semibold mt-4">Secure & Private</h3>
              <p className="text-gray-600 mt-2">
                Your data is safe with end-to-end encryption. We do not store any of your personal information.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 bg-blue-900 text-white mt-12 fade-in animate__animated animate__fadeInUp">
          <p>&copy; 2025 Dhan AI. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="mx-2 hover:text-blue-300 transition duration-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="mx-2 hover:text-blue-300 transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="mx-2 hover:text-blue-300 transition duration-300">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DhanAILoanAssistant;