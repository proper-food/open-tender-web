import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import { removeMessage } from '@open-tender/redux'
import styled from '@emotion/styled'

const AlertView = styled('li')`
  display: block;
  float: right;
  clear: right;
  margin: 1.3rem 0 0;
  line-height: 1;
  padding: 0.8rem 1rem 0.8rem 1.6rem;
  border-radius: 0.5rem;
  transition: all 500ms ease;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.alert};
  border-color: ${(props) => props.theme.colors.alert};

  > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.9;

    span,
    button {
      position: relative;
      display: block;
      flex-shrink: 0;
      color: ${(props) => props.theme.colors.light};
    }

    span {
      top: -0.1rem;
    }

    button {
      top: 0.1rem;
      margin-left: 0.8rem;
    }
  }
`

const Alert = ({ message, id }) => {
  const dispatch = useDispatch()
  const [skip, setSkip] = useState(false)

  const handleRemove = (evt) => {
    evt.preventDefault()
    dispatch(removeMessage(id))
    evt.target.blur()
  }

  useEffect(() => {
    if (message === 'Thanks! Please check your email on this device.') {
      dispatch(removeMessage(id))
      setSkip(true)
    }
  }, [dispatch, message, id])

  if (skip) return null
  return (
    <AlertView>
      <span>
        <span>{message}</span>
        <button onClick={handleRemove} aria-label="Remove alert">
          <X size={14} />
        </button>
      </span>
    </AlertView>
  )
}

Alert.displayName = 'Alert'
Alert.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Alert
