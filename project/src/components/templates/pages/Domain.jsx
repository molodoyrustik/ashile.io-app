import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';

import { getDomains } from '../../../actions/domain';

const DomainItem = (props) => {
  const date = moment(props.time).format('L');
  const editDate = date.split('/').join(':');
  const time = moment(props.time).format('h:mm');
  return (
    <li className="domains__item">
      <div className="domains__checkbox"></div>
      <p className="domains__item-title domains__item-title--ml domains__item-title--font">{props.id}</p>
      <div className="domains__item-title">{`${props.status}${props.statusText}`}</div>
      <div className="domains__item-title">{editDate}</div>
      <div className="domains__item-title">{time}</div>
      <div className="domains__item-title">{ props.flag ? 'false' : 'true' }</div>
    </li>
  );
};

class Domain extends Component {
  render() {
    const data = {
      labels: [
        'Success Requests',
        'Errors Requests',
      ],
      datasets: [{
        data: [0, 0],
        backgroundColor: ['#0F9960', '#DB3737'],
        hoverBackgroundColor: ['#0F9960', '#DB3737'],
      }],
    };
    const domain = this.props.domains.filter((domain) => {
      return domain.id === this.props.match.params.id;
    })[0];
    domain.logs.forEach((domain) => {
      if (domain.flag) {
        data.datasets[0].data[0] += 1;
      } else {
        data.datasets[0].data[1] += 1;
      }
    });
    return (
      <div className="domains">
        <h2 className="domains__title">Domain: {domain.url}</h2>
        <div className="domains__content">
          <Pie data={data} />
          <div className="logs">
            <h2 className="domains__title">Logs</h2>
            <nav className="domains__nav">
              <div className="domains__checkbox"></div>
              <div className="domains__nav-title domains__nav-title--ml">Log ID</div>
              <div className="domains__nav-title">StatusCode</div>
              <div className="domains__nav-title">Date</div>
              <div className="domains__nav-title">Time</div>
              <div className="domains__nav-title">Error</div>
            </nav>
            <ul className="domains__list">
              {
                domain.logs.map((log) => {
                  return <DomainItem
                          key={log.id}
                          id={log.id}
                          status={log.status}
                          statusText={log.statusText}
                          date={log.time}
                          time={log.time}
                          flag={log.flag}
                          />;
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    domains: state.user.domains,
  };
}, { getDomains })(Domain);
