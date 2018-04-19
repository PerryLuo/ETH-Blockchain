import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x32b3156e872d4A3C983b2DB28Aa494eDA2B57006'
);

export default instance;

// 0xb90556009C781A9fc10d28657968bA4a61bbB796
