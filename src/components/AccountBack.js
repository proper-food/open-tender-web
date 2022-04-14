import { LinkIcon } from '.'
import iconMap from './iconMap'

const AccountBack = () => (
  <LinkIcon
    to="/account/settings"
    icon={iconMap.ArrowLeft}
    text="Back to Settings"
    isBefore={true}
  />
)

export default AccountBack
