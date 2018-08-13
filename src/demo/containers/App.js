import React, { Component } from 'react';

import logo from 'images/logo.svg';
import './App.css';

import Login from 'lib/containers/Login.js'
import MarkdownSynapse from 'lib/containers/MarkdownSynapse.js'
import UserFavorites from 'lib/containers/UserFavorites.js';
import UserProjects from 'lib/containers/UserProjects.js';
import UserTeam from 'lib/containers/UserTeams.js';
import UserProfile from 'lib/containers/UserProfile.js';
import CustomMarkdownView from 'lib/containers/CustomMarkdownView'
import CustomMarkdownErrorView from 'lib/containers/CustomMarkdownErrorView';

import * as SynapseClient from 'lib/utils/SynapseClient.js';
import * as SynapseConstants from 'lib/utils/SynapseConstants.js';

/**
 * Demo of features that can be used from src/demo/utils/SynapseClient
 * module
 */
class App extends Component {

  /**
   * Maintain internal state of user session
   */
  constructor () {
    super()
    this.state = {
      token: "",
      ownerId: ""
    }
    this.makeSampleQueryCall = this.makeSampleQueryCall.bind(this)
    this.getVersion = this.getVersion.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  /**
   * Get the current version of Synapse
   */
  getVersion () {
    // IMPORTANT: Your component should have a property (with default) to change the endpoint.  This is necessary for Synapse.org integration.
    // Pass your endpoint through to the rpc call:
    // SynapseClient.getVersion('https://repo-staging.prod.sagebase.org')
    SynapseClient.getVersion()
      .then(data => this.setState(data))
      .catch(function (error) {
        // Handle HTTPError.  Has statusCode and message.
        console.error("Get version failed" , error)
      });
  }

  /**
   * Make a query on synapse
   */
  makeSampleQueryCall () {
   // Example table (view) query
   let QUERY = {
    entityId: "syn12335586",
    query: {
      sql: "SELECT * FROM syn12335586",
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 100
    },
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS
      | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
      | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS
      | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
  };
  SynapseClient.getQueryTableResults(QUERY)
    .then(data => console.log(data))
    .catch(function (error) {
      console.error(error)
    });
  }

  /**
   * Update internal state
   * @param {Object} updatedState new state to be updated by the component
   */
  handleChange(updatedState) {
    this.setState(
      updatedState
    );
  }
  
  /**
   * Call demo synapse features
   */
  componentDidMount() {
    this.getVersion()
    this.makeSampleQueryCall()
  }
 
  
  render() {
    const quickStyle = {
      color: 'white'
    }
    return (
      <div className="App mb-5">
        <div className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h4 style={quickStyle}>Synapse React Client Demo</h4>
        </div>
        <p className="App-intro text-center">
          Synapse production version: {this.state.version}
        </p>

        <Login onTokenChange={this.handleChange}
               token={this.state.token}
               loginEndpoint={SynapseClient.login}>
        </Login>
        
        <UserFavorites token={this.state.token}
                       getUserFavoritesEndpoint={SynapseClient.getUserFavorites}>
        </UserFavorites>
        
        <UserProjects token={this.state.token} 
                      getUserProjectsEndpoint={SynapseClient.getUserProjectList}>
        </UserProjects>
        
        <UserProfile onProfileChange={this.handleChange}
                     token={this.state.token}
                     ownerId={this.state.ownerId}
                     getUserProfileEndpoint={SynapseClient.getUserProfile}>
        </UserProfile>
       
        <UserTeam token={this.state.token} 
                  ownerId={this.state.ownerId}
                  getUserTeamEndpoint={SynapseClient.getUserTeamList}>
        </UserTeam>

        <CustomMarkdownView>
          <MarkdownSynapse token={this.state.token}
                    ownerId={"syn14568473"}
                    wikiId={"582406"}
                    errorMessageView={<CustomMarkdownErrorView/>}>
          </MarkdownSynapse>
        </CustomMarkdownView>

        <CustomMarkdownView>
          <MarkdownSynapse token={this.state.token}
                    markdown={"# my custom markdown"}
                    errorMessageView={<CustomMarkdownErrorView/>}>
          </MarkdownSynapse>
        </CustomMarkdownView>

      </div>
    );
  }

}

export default App;