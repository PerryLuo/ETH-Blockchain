import React, { Component } from 'react';
import factory from '../ethereum/factory';
import campaign from '../ethereum/campaign';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  //getInitialProps used to fetch data exclusively with next.js  regular react uses
  // componentDidMount()
  static async getInitialProps() {
    const deployedCampaignsAddress = await factory.methods
      .getDeployedCampaigns()
      .call();

    // let each;
    // for (var i = 0; i < deployedCampaignsAddress.length; i++) {
    //   each = await campaign(deployedCampaignsAddress[i])
    //     .methods.getCampaignDetails()
    //     .call();
    // }
    // console.log(deployedCampaignsAddress.length);
    // console.log(each);

    // const arrCampaignAddress = campaign(deployedCampaignsAddress);
    // const details = await arrCampaignAddress.map((details) => {
    //   details.methods.getCampaignDetails().call();
    // });

    // console.log(details);
    const campaignDetails = await deployedCampaignsAddress.map(
      (singleDeployedCampaign) => {
        return campaign(singleDeployedCampaign)
          .methods.getCampaignDetails()
          .call();
      }
    );

    // const getCampaignDetails = await campaign(deployedCampaignsAddress[0])
    //   .methods.getCampaignDetails()
    //   .call();

    console.log(deployedCampaignsAddress[0]);
    console.log(campaignDetails);

    return {};
  }

  // renderCampaigns() {
  //   //getInitialProps renders the data and stores it in "props"
  //   const items = this.props.campaigns.map((address) => {
  //     return {
  //       header: address,
  //       description: (
  //         <Link route={`/campaigns/${address}`}>
  //           <a>View campaign</a>
  //         </Link>
  //       ),
  //       fluid: true
  //     };
  //   });
  //   return <Card.Group items={items} />;
  // }

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
// import { Card, Button, Tab } from 'semantic-ui-react';
// import Layout from '../components/Layout';
// import { Link } from '../routes';

// class CampaignIndex extends Component {
//   //getInitialProps used to fetch data exclusively with next.js  regular react uses componentDidMount()
//   static async getInitialProps() {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     return {
//       description: campaigns[0],
//       minimumContribution: campaigns[1],
//       campaignCategory: campaigns[2],
//       endDate: campaigns[3],
//       manager: campaigns[4]
//     };
//   }

//   renderCampaigns() {
//     //getInitialProps renders the data and stores it in "props"
//     const tabNameArr = [
//       'Protocol',
//       'Scaling',
//       'Fintech',
//       'Interoperability',
//       'Storage'
//     ];

//     // let tabName = tabNameArr.map((tabName) => {
//     //   return tabName;
//     // });
//     debugger;
//     const panes = this.props.campaigns[4].map((address) => {
//       return {
//         menuItem: 'tab1',
//         render: () => (
//           <Tab.Pane attached={false}>
//             {address}
//             <Link route={`/campaigns/${address}`}>
//               <a floated="right">View campaign</a>
//             </Link>
//           </Tab.Pane>
//         )
//       };
//     });
//     return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
//   }

//   render() {
//     return (
//       <Layout>
//         <div>
//           <h3>
//             Welcome to ERC20 Lambo! Your next Lambo is just an ERC20 ICO away!
//           </h3>
//           <h3>Open ICOs to Participate</h3>

//           <Link route="/campaigns/new">
//             <a>
//               <Button
//                 floated="right"
//                 content="Create Campaign"
//                 icon="add square"
//                 labelPosition="right"
//               />
//             </a>
//           </Link>
//           {this.renderCampaigns()}
//         </div>
//       </Layout>
//     );
//   }
// }

// export default CampaignIndex;
