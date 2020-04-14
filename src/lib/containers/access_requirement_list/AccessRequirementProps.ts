import { AccessRequirement } from '../../utils/synapseTypes/AccessRequirement/AccessRequirement'
import { UserProfile, AccessRequirementStatus } from '../../utils/synapseTypes'

export type AccessRequirementProps<T extends AccessRequirement> = {
  accessRequirement: T
  accessRequirementStatus: AccessRequirementStatus
  token: string | undefined
  user: UserProfile | undefined
  onHide?: Function
}
