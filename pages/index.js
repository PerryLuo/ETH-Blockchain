import React, { Component } from 'react';
import factory from '../ethereum/factory';
import campaign from '../ethereum/campaign';
import { Card, Button, Tab } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  //getInitialProps used to fetch data exclusively with next.js  regular react uses
  // componentDidMount()
  static async getInitialProps() {
    const deployedCampaignsAddress = await factory.methods
      .getDeployedCampaigns()
      .call();
    console.log('Campaign Address');
    console.log(deployedCampaignsAddress);

    let campaignDetails = await Promise.all(
      deployedCampaignsAddress.map(async (singleCampaignsAddress) => {
        const singleCampaignDetails = await campaign(singleCampaignsAddress)
          .methods.getCampaignDetails()
          .call();
        return {
          description: singleCampaignDetails[0],
          minimumContribution: singleCampaignDetails[1],
          type: singleCampaignDetails[2],
          finishDate: singleCampaignDetails[3],
          contributionAddress: singleCampaignDetails[4],
          contractAddress: singleCampaignsAddress
        };
      })
    );

    return { campaignDetails };

    // const campaignDetailsArray = [];
    // for (var i = 0; i < deployedCampaignsAddress.length; i++) {
    //   var element = deployedCampaignsAddress[i];
    //   const campaignDetails = await campaign(element)
    //     .methods.getCampaignDetails()
    //     .call();
    //   campaignDetailsArray.push(campaignDetails);
    //   // console.log(campaignDetailsArray);
    // }

    // const campaignDetailsObj = campaignDetailsArray.map(
    //   (singleCampaignDetails) => {
    //     return {
    //       description: singleCampaignDetails[0],
    //       minimumContribution: singleCampaignDetails[1],
    //       type: singleCampaignDetails[2],
    //       finishDate: singleCampaignDetails[3],
    //       contributionAddress: singleCampaignDetails[4]
    //     };
    //   }
    // );

    // return { campaignDetailsObj };
  }

  renderCard() {}

  renderCampaigns() {
    //getInitialProps renders the data and stores it in "props"
    console.log('this.props.campaignDetails below');
    console.log(this.props.campaignDetails);

    const campaignDetailsArr = this.props.campaignDetails;

    let campaignTypeArr = campaignDetailsArr.map(
      (singleCampaignDetails) => singleCampaignDetails.type
    );
    let cleanedCampaignTypeArr = [...new Set(campaignTypeArr)];
    console.log('Types of ICO');
    console.log(cleanedCampaignTypeArr);

    function GetCampaignDetailsByType(singleType) {
      return campaignDetailsArr.filter(
        (singleCampaignDetails) => singleCampaignDetails.type === singleType
      );
    }

    const campaignTypes = cleanedCampaignTypeArr.map((singleCampaignType) => {
      const campaignDetailsByType = GetCampaignDetailsByType(
        singleCampaignType
      ).map((data) => {
        return {
          header: 'Name: ' + data.description,
          description:
            'Minimum Contribution (ETH): ' + data.minimumContribution,
          meta: 'Contribution Address: ' + data.contributionAddress,
          // extra: 'Contribution Deadline ' + data.finishDate,
          extra: (
            <Link route={`/campaigns/${data.contractAddress}`}>
              <a>
                <h3>View Campaign</h3>
              </a>
            </Link>
          ),
          fluid: true
        };
      });

      const CardExampleGroupProps = () => (
        <Card.Group items={campaignDetailsByType} />
      );

      return {
        menuItem: singleCampaignType,
        render: () => (
          <Tab.Pane attached={false}> {CardExampleGroupProps()} </Tab.Pane>
        )
      };
    });
    console.log('campagin types');
    console.log(campaignTypes);

    return (
      <Tab
        menu={{
          secondary: true,
          pointing: true
        }}
        panes={campaignTypes}
      />
    );
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>
            Welcome to ERC20 Lambo!Your next Lambo is just an ERC20 ICO away!
          </h3>
          <h3> Open ICOs to Participate </h3> <br />
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
          <br />
          <br /> {this.renderCampaigns()}
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
