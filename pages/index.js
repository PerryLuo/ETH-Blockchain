import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  //getInitialProps used to fetch data exclusively with next.js  regular react uses
  // componentDidMount()
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    //getInitialProps renders the data and stores it in "props"
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View campaign</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>
            Welcome to ERC20 Lambo! Your next Lambo is just an ERC20 ICO away!
          </h3>
          <h3>Open ICOs to Participate</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add square"
                labelPosition="right"
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

// import React, { Component } from 'react';
// import factory from '../ethereum/factory';
// import { Card, Button, Menu, Segment, Tab } from 'semantic-ui-react';
// import Layout from '../components/Layout';
// import { Link } from '../routes';

// class CampaignIndex extends Component {
//   //getInitialProps used to fetch data exclusively with next.js  regular react uses
//   // componentDidMount()
//   static async getInitialProps() {
//     const campaigns = await factory.methods.getDeployedCampaign().call();
//     return { campaigns };
//   }

//   renderCampaigns() {
//     //getInitialProps renders the data and stores it in "props"
//     const items = this.props.campaigns.map((address) => {
//       return {
//         <Card.Group>
//         <Card>
//         <Card.Header>
//         "EOS"
//         </Card.Header>
//         <Card.Meta>
//         "Net revolution to protocol"
//         </Card.Meta>
//         <Card.Description>
//         <Link route={`/campaigns/${address}`}>
//             <a>View campaign</a>
//           </Link>
//         </Card.Description>
//         <Card.Content>
//         <Button primary>Approve</Button>
//     </Card.Content>
//         </Card>
//         </Card.Group>
//     });
//   }

//   // Menu Bar
//   state = { activeItem: 'Protocols' };
//   handleItemClick = (e, { name }) => this.setState({ activeItem: name });

//   //Content in Menu Bar
//   const panes = [
//     { menuItem: 'Protocols', render: () => <Tab.Pane>{items}</Tab.Pane> },
//     { menuItem: 'Scaling', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
//     { menuItem: 'Fintech', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
//   ]

//   render() {
//     const { activeItem } = this.state;

//     return (
//       <Layout>
//         <div>
//           <h3>
//             Welcome to ERC20 Lambo! Your next Lambo is just an ERC20 ICO away!
//             <br />
//             <br />
//             Open ICOs to Participate
//           </h3>

//           <Menu tabular>
//             <Menu.Item
//               name="Protocols"
//               active={activeItem === 'Protocols'}
//               onClick={this.handleItemClick}
//             />
//             <Menu.Item
//               name="Scaling"
//               active={activeItem === 'Scaling'}
//               onClick={this.handleItemClick}
//             />
//             <Menu.Item
//               name="Fintech"
//               active={activeItem === 'Fintech'}
//               onClick={this.handleItemClick}
//             />
//             <Menu.Item
//               name="Interoperability"
//               active={activeItem === 'Interoperability'}
//               onClick={this.handleItemClick}
//             />
//             <Menu.Item
//               name="Storage"
//               active={activeItem === 'Storage'}
//               onClick={this.handleItemClick}
//             />
//             <Menu.Menu position="right">
//               <Link route="/campaigns/new">
//                 <a>
//                   <Button
//                     content="Create Campaign"
//                     icon="add square"
//                     labelPosition="right"
//                   />
//                 </a>
//               </Link>
//             </Menu.Menu>
//           </Menu>

//           <Segment>
//             <img src="/assets/EOS" />
//             {this.renderCampaigns()}
//           </Segment>
//         </div>
//       </Layout>
//     );
//   }
// }
