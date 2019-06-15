import React, { Component } from 'react';
import { connect } from 'react-redux';

import Btn from '../common/Btn';

import DomainsNav from '../sections/Domains/DomainsNav';
import DomainList from '../sections/Domains/DomainList';
import { getDomains } from '../../../actions/domain';

class Domains extends Component {
  componentWillMount() {
    setInterval(() => {
      this.props.getDomains();
    }, 30000);
  }

  render() {
    return (
      <div className="domains">
        <h2 className="domains__title">List of Domains</h2>
        <div className="domains__content">
          <DomainsNav/>
          <DomainList/>
        </div>
        <Btn href='/dashboard/domains/add-domain' text='Add new' type='blue'/>
      </div>
    );
  }
}

export default connect(null, { getDomains })(Domains);
