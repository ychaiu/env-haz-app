import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LoadingSpinner = () => (
    <div className='loading-spinner'>
      <FontAwesomeIcon icon= "spinner" size='100x' color= '#a8a8a8' spin/>
    </div>
)

export default LoadingSpinner;