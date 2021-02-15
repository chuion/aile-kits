import { RequestQueue } from '../libs/request';
export default (option, kits) => {
    kits.request = new RequestQueue(option);
};
