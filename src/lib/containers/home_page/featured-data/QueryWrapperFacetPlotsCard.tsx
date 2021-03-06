import * as React from 'react'
import QueryWrapper from '../../QueryWrapper'
import {
  parseEntityIdFromSqlStatement,
} from '../../../utils/functions/sqlFunctions'
import { SynapseConstants } from '../../../utils/'
import { QueryBundleRequest } from '../../../utils/synapseTypes'
import { Error } from '../../Error'
import FacetPlotsCard from './FacetPlotsCard'

export type QueryWrapperFacetPlotsCardProps = {
  token?: string
  title?:string
  rgbIndex?: number
  facetsToPlot?: string[]
  facetAliases?: {}
  selectFacetColumnName: string
  selectFacetColumnValue: string
  exploreSql?: string
  explorePagePath?: string
}
export function getQueryRequest(sql: string, selectFacetColumnName: string, selectFacetColumnValue: string):QueryBundleRequest {
  const entityId = parseEntityIdFromSqlStatement(sql)
  return {
    entityId,
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    partMask:
      SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
      SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
      SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
      SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
    query: {      
      sql,
      offset: 0,
      limit: 25,
      selectedFacets: [{
        columnName: selectFacetColumnName,
        facetValues: [selectFacetColumnValue],
        concreteType: 'org.sagebionetworks.repo.model.table.FacetColumnValuesRequest'        
      }],
    }, 
  }
}
const QueryWrapperFacetPlotsCard: React.FunctionComponent<QueryWrapperFacetPlotsCardProps> = props => {
  const {
    title,
    exploreSql,
    facetsToPlot,
    rgbIndex,  
    selectFacetColumnName,
    selectFacetColumnValue,
    explorePagePath,
    token,
    ...rest
  } = props
  const initQueryRequest: QueryBundleRequest = getQueryRequest(exploreSql!, selectFacetColumnName, selectFacetColumnValue)
  return (
    <div className="QueryWrapperFacetPlotsCard">
      <QueryWrapper {...rest} token={token} initQueryRequest={initQueryRequest}>
        <Error />
        <FacetPlotsCard
          title={title}
          facetsToPlot={facetsToPlot}
          rgbIndex={rgbIndex}
          explorePagePath={explorePagePath}
        />
      </QueryWrapper>
    </div>
  )
}

export default QueryWrapperFacetPlotsCard
