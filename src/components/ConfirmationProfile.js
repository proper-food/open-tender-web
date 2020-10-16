import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer, updateCustomer } from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { ProfileForm } from '@open-tender/components'

import { selectOptIns } from '../slices'
import SectionHeader from './SectionHeader'
import SectionError from './SectionError'
import SectionLoading from './SectionLoading'

const title = 'Update your communication preferences'
const subtitle = "Please let us know how you'd like to hear from us"

const ConfirmationProfile = () => {
  const dispatch = useDispatch()
  const optIns = useSelector(selectOptIns)
  const { profile, loading, error } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback((data) => dispatch(updateCustomer(data)), [
    dispatch,
  ])

  return (
    <div id={slugify(title)} className="section">
      <div className="container">
        <div className="section__container">
          <SectionHeader title={title} subtitle={subtitle} />
          <SectionLoading loading={isLoading} />
          <SectionError error={errMsg} />
          <div className="section__content ot-bg-color-primary ot-border-radius">
            <ProfileForm
              profile={profile}
              loading={loading}
              error={error}
              update={update}
              optIns={optIns}
              showFields={false}
              id="comms-form"
              buttonText="Set Preferences"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmationProfile.displayName = 'ConfirmationProfile'
export default ConfirmationProfile
