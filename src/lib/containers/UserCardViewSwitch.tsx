import * as React from 'react'
import { SynapseConstants } from '../utils'
import { UserCardViewSmall } from './UserCardViewSmall'

type UserBadgeViewProps = {
  loadingBar?: JSX.Element
  userBundle: any
  size: string
}

export const UserCardViewSwitch: React.SFC<UserBadgeViewProps> = ({ userBundle, loadingBar = (<div/>), size }) => {
  if (!userBundle) {
    return loadingBar || false
  }
  switch (size) {
    case SynapseConstants.SMALL_USER_CARD:
      return (<UserCardViewSmall userBundle={userBundle}/>)
    default:
      return (<div/>)
  }
}

export default UserCardViewSwitch