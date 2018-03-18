import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campagin from '../../ethereum/campaign';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campagin(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    campaign.methods.setCurrentManager(summary[4]);
    console.log(summary);
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCard() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'creater of the ico',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution(ETH)',
        description: 'Minimum contrbution per person',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestCount,
        meta: 'Number of Request',
        description:
          'A number of request trying to withdraw money from the contract',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of people contributed',
        description: '',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Total Contributed(ETH)',
        description: 'Total Contribution Amount',
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campagin Show</h3>
        <Grid>
          <Grid.Column width={10}>{this.renderCard()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
