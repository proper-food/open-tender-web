import { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetLoginError,
  selectCustomer,
  updateCustomer,
} from '@open-tender/redux'
import { ProfileForm } from '@open-tender/components'

import { closeModal, selectOptIns } from '../../slices'
import { ModalContent, ModalView } from '..'

const Profile = ({ windowRef }) => {
  const dispatch = useDispatch()
  const optIns = useSelector(selectOptIns)
  const { profile, loading, error } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])
  const update = useCallback(
    (data) => dispatch(updateCustomer(data, callback)),
    [dispatch, callback]
  )

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  useEffect(() => {
    if (!customer_id) dispatch(closeModal())
    return () => dispatch(resetLoginError())
  }, [customer_id, dispatch])

  return (
    <ModalView>
      <ModalContent
        title="Update your contact info"
        // subtitle={
        //   <p>Please provide the info below, and you'll be off to the races!</p>
        // }
      >
        <ProfileForm
          profile={profile}
          loading={loading}
          error={error}
          update={update}
          optIns={optIns}
        />
      </ModalContent>
    </ModalView>
  )
}

Profile.displayName = 'Profile'
Profile.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default Profile
