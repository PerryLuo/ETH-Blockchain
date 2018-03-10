import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb3C062fBbc4478f1a3A2e26fDBFb6592C23155dE'
);

export default instance;
