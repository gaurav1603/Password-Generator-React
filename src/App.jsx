/* eslint-disable no-unused-vars */
import { useState, useCallback,useEffect,useRef} from 'react'

function App() {
  const[length,setlength]=useState(8);
  const[numberallowed,setnumberallowed]=useState(false);
  const[characterallowed,setcharacterallowed]=useState(false);
  const[password,setpassword]=useState("")

  const passwordref=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed)str+="0123456789"
    if(characterallowed)str+="~!@#$%^&*()_+=-{}[]"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass);
  },[length,numberallowed,characterallowed,setpassword])

  const copypasswordtoclipboard = useCallback(()=>{
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,3)  this is for range which user want
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(
    ()=>{
      passwordgenerator()
    },
    [length,numberallowed,characterallowed,passwordgenerator]
  )
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3 '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
                value={password}
                className='outline-none w-full py-1 px-3'
                placeholder='password'
                readOnly
                ref={passwordref}>
          </input>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500' onClick={copypasswordtoclipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}></input>
            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numberallowed}
            id='numberinput'
            onChange={()=>{setnumberallowed((prev)=>!prev)}}></input>
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={characterallowed}
            id='characterinput'
            onChange={()=>{setcharacterallowed((prev)=>!prev)}}></input>
            <labe>Characters</labe>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
