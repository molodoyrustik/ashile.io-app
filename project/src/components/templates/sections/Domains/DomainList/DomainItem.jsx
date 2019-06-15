import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { editDomain, deleteDomain } from '../../../../../actions/domain';

class DomainItem extends Component {
  handleEdit = (e) => {
    console.log('push to domain/edit', this.props.domainId);
  }

  handleDelete = (e) => {
    this.props.deleteDomain({ id: this.props.domainId });
  }

  render() {
    const { domain, logs } = this.props;
    let errorCount = 0;
    let editDate = '';
    let time = '';
    let status = '';
    let statusText = '';

    if (logs.length > 0) {
      logs.forEach((log) => {
        if (!log.flag) {
          errorCount += 1;
        }
      });
      const index = logs.length - 1;
      const date = moment(logs[index].time).format('L');
      editDate = date.split('/').join(':');
      time = moment(logs[index].time).format('h:mm');
      status = logs[index].status;
      statusText = logs[index].statusText;
    }
    return (
      <li className="domains__item">
        <div className="domains__checkbox"></div>
        <Link to={`/dashboard/domains/${this.props.domainId}`} className="domains__item-title domains__item-title--ml domains__item-title--font">{domain}</Link>
        <div className="domains__item-title">{`${status}${statusText}`}</div>
        <div className="domains__item-title">{editDate}</div>
        <div className="domains__item-title">{time}</div>
        <div className="domains__item-title">{errorCount} Errors</div>
        <div className="domains__btns">
          <Link to='/dashboard/domains/edit' className="domains__edit" />
          <span className="domains__delete" onClick={this.handleDelete}/>
        </div>
      </li>
    );
  }
}

export default connect(null, { editDomain, deleteDomain })(DomainItem);
