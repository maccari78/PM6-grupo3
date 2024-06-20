import React from 'react'

const Message: React.FC<{ incoming?: boolean; avatarUrl: string; text: string }> = ({ incoming, avatarUrl, text }) => {
  return (
    <>
       <div className={`flex mb-4 cursor-pointer ${incoming ? '' : 'justify-end'}`}>
      {incoming && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img src={avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
      <div className={`flex max-w-96 ${incoming ? 'bg-white text-gray-700' : 'bg-indigo-500 text-white'} rounded-lg p-3 gap-3`}>
        <p>{text}</p>
      </div>
      {!incoming && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img src={avatarUrl} alt="My Avatar" className="w-8 h-8 rounded-full" />
        </div>
      )}
    </div>
    </>
  )
}

export default Message
