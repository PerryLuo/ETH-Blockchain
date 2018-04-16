import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Container } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    description: '',
    minimumContribution: '',
    category: '',
    finishDate: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          this.state.description,
          this.state.minimumContribution,
          this.state.category,
          this.state.finishDate
        )
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message.toString().split('\n')[0] });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a ERC20 ICO!</h3>
        <Container>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Name of ICO</label>
              <Input
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
              />
              <br />
              <br />
              <label>Minimum Contribution</label>
              <Input
                label="Ether"
                labelPosition="right"
                value={this.state.minimumContribution}
                onChange={(event) =>
                  this.setState({ minimumContribution: event.target.value })
                }
              />
              <br />
              <br />
              <label>ICO Category</label>
              <Input
                value={this.state.category}
                onChange={(event) =>
                  this.setState({ category: event.target.value })
                }
              />
              <br />
              <br />
              <label>ICO End Date</label>
              <Input
                value={this.state.finishDate}
                onChange={(event) =>
                  this.setState({ finishDate: event.target.value })
                }
              />
            </Form.Field>
            <Message
              error
              header="Oops, Something went wrong."
              content={this.state.errorMessage}
            />
            <Button loading={this.state.loading} primary>
              Create!
            </Button>
          </Form>
        </Container>
      </Layout>
    );
  }
}

export default CampaignNew;
