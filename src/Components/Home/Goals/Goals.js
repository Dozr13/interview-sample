import React, {useEffect, useImperativeHandle, useState, forwardRef, useCallback, useContext} from 'react'
import { createPortal } from 'react-dom'

import '../Home.scss'



const modalElement = document.getElementById('modal-root')

function Goals({ children, fade = false, defaultOpened = false }, ref) {

  const [isOpen, setIsOpen] = useState(defaultOpened)
  const close = useCallback(() => setIsOpen(false), [])


  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close])


  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])


  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  
  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
        <span role="button" className="modal-close" aria-label="close" onClick={close}>
          x
        </span>
        <div className='modal-body'>
          <h2 className='modal-font'>Goals section coming soon!</h2>  
        </div>
      </div>
    ) : null,
    modalElement
  )
}


export default forwardRef(Goals)
