import { LinkIcon } from '.'
import iconMap from './iconMap'

const AccountBack = () => (
  <LinkIcon
    to="/account"
    icon={iconMap.ArrowLeft}
    text="Back to account settings"
    isBefore={true}
  />
)

export default AccountBack
