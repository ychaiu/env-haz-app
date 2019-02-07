import React, { Component } from 'react';

class TakeAction extends Component {

  render() {
    return (
        <div id="sidebar">
            <div className ="sidebar-header-box" id="take-action-sidebar-image">
                <div className="sidebar-header">
                    <h3>Take Action</h3>
                </div> 
            </div>
            <div className="take-action-content">
                The National Association of City and County Health Officals (NACCHO) created a helpful tool for identifying
                your local public health agency. Contact your local official today <a href="https://www.naccho.org/membership/lhd-directory">here</a>.
                <br></br><br></br>
                There are many organizations advocating for safe and healthy environments, especially for communities disporportionately impacted by the effects of environmental pollution. Consider donating or joining one of these organizations to show your support.
            </div>
        </div>
    );
  }
}

export default TakeAction;