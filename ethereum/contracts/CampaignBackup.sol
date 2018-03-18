pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}


// ______________


// pragma solidity ^0.4.17;

// contract CampaignFactory {

//     Campaign[] public deployedCampaignsAddress;
//     address[] public managersAddress;

//     function createCampaign(string description, uint minimumContribution, string campaignCategory, string endDate) public {
//         Campaign newlyCreatedCampaign = new Campaign(description, minimumContribution, campaignCategory, endDate, msg.sender);
//         deployedCampaignsAddress.push(newlyCreatedCampaign);
//         managersAddress.push(msg.sender);
//     }

//     function getDeployedCampaigns() public view returns (Campaign[]) {
//         return deployedCampaignsAddress;
//     }

//     function getManagersAddress() public view returns (address[]) {
//         return managersAddress;
//     }
// }
// // let x = deployedCampaignsAddress[0];
// // x.getCampaignDetails(x.currentManagerAddress);
// contract Campaign {

//     struct NewCampaignType {
//         string description;
//         uint minimumContribution;
//         string campaignCategory;
//         string endDate;
//         address managerAddress;
//     }

//     struct Request {
//         string description;
//         uint value;
//         address recipient;
//         bool complete;
//         uint approvalCount;
//         mapping(address => bool) approvals;
//     }

//     mapping(address => NewCampaignType) public campaigns;
//     NewCampaignType public campaginDetails;
//     Request[] public requests;
//     mapping(address => bool) public approvers;
//     uint public approversCount;
//     address public currentManagerAddress;

//     modifier restricted() {
//         require(msg.sender == campaigns[currentManagerAddress].managerAddress);
//         _;
//     }

//     function Campaign(string description, uint minimumContribution, string campaignCategory, string endDate, address managerAddress) public {
//         NewCampaignType memory createCampaign = NewCampaignType({
//             description: description,
//             minimumContribution: minimumContribution,
//             campaignCategory: campaignCategory,
//             endDate: endDate,
//             managerAddress: managerAddress
//         });
//         campaigns[managerAddress] = createCampaign;
//         campaginDetails = createCampaign;
//     }

//     function getCampaignDetails(address managerAddress) public view returns (
//         string, uint, string, string 
//         ) {
//         return (
//             campaigns[managerAddress].description,
//             campaigns[managerAddress].minimumContribution,
//             campaigns[managerAddress].campaignCategory,
//             campaigns[managerAddress].endDate
//         );
//     }

//     function contribute() public payable {
//         require(msg.value > campaigns[currentManagerAddress].minimumContribution);
//         approvers[msg.sender] = true;
//         approversCount++;
//     }

//     function createRequest(string description, uint value, address recipient) public restricted {
//         Request memory newRequest = Request({
//            description: description,
//            value: value,
//            recipient: recipient,
//            complete: false,
//            approvalCount: 0
//         });

//         requests.push(newRequest);
//     }

//     function approveRequest(uint index) public {
//         Request storage request = requests[index];

//         require(approvers[msg.sender]);
//         require(!request.approvals[msg.sender]);

//         request.approvals[msg.sender] = true;
//         request.approvalCount++;
//     }

//     function finalizeRequest(uint index) public restricted {
//         Request storage request = requests[index];

//         require(request.approvalCount > (approversCount / 2));
//         require(!request.complete);

//         request.recipient.transfer(request.value);
//         request.complete = true;
//     }

//     function getSummary() public view returns (
//       uint, uint, uint, uint, address
//       ) {
//         return (
//           campaigns[currentManagerAddress].minimumContribution,
//           this.balance,
//           requests.length,
//           approversCount,
//           campaigns[currentManagerAddress].managerAddress
//         );
//     }

//     function getRequestsCount() public view returns (uint) {
//         return requests.length;
//     }
// }
