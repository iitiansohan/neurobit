import React from 'react'

const Error= ({errMessage}) => {
  return (
    <div className='py-5'>
    <h3 style={{textAlign:'center'}}>{errMessage}</h3>
    </div>
  )
}

export default Error