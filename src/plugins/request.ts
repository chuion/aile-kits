import { IGlobalOption } from '../globalOptions';
import { RequestQueue, RequestQueueOption } from '../libs/request';


export default (option: RequestQueueOption, kits: IGlobalOption) => {
  kits.request = new RequestQueue(option);
};
