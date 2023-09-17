import React from 'react'

const Input = ({ type, label, state, setState, placeholder }) => {
    return (
        <div className="mb-2 text-[0.8rem] font-medium">
            <p  className='capitalize'>{label}</p>
            <input 
            type={type}
            value={state} 
            onChange={(e) => setState(e.target.value)} placeholder={placeholder}
            className="mb-2 border-b-2 w-[100%] pt-2 outline-none opacity-80 focus:opacity-100 focus:transition-all focus:duration-200"
            />
        </div>
    )
}

export default Input
