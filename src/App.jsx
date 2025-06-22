import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [length, setLength] = useState(8);
  const [numIncluded, setNumIncluded] = useState(false);
  const [charIncluded, setCharIncluded] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null); // useRef for copy

  const PasswordGenerator = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numIncluded) string += '0123456789';
    if (charIncluded) string += '!@#$%^&*()_+[]{}|;:,.<>?';

    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, numIncluded, charIncluded, setPassword]);

 
  useEffect(() => {
    PasswordGenerator();
  }, [PasswordGenerator,length, numIncluded, charIncluded, setPassword]);

  
  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy'); 
      toast.success('Password copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Toaster/>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 text-orange-400 bg-gray-800">
        <h1 className="text-2xl text-white font-bold my-3 text-center">
          Password Generator
        </h1>
        <div className="flex shadow rounded overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-2 px-3 bg-white text-black"
            placeholder="Generated Password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between">
            <input
              min={6}
              max={100}
              type="range"
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="ml-3 text-white">Length: {length}</label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white">Include Numbers</label>
            <input
              type="checkbox"
              checked={numIncluded}
              onChange={() => setNumIncluded((prev) => !prev)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white">Include Special Characters</label>
            <input
              type="checkbox"
              checked={charIncluded}
              onChange={() => setCharIncluded((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
