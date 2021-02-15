import dayjs from 'dayjs';
import options from '../../../globalOptions';
const DefaultConfig = {
    start: 'start_time',
    end: 'end_time',
    nullValue: null,
    formatter: 'timestamp',
    range: 'day'
};
export function toRange(target, config = {}) {
    if (!dayjs(target).isValid()) {
        throw new Error('AileKit toRange Error: Invalid Date!');
    }
    const customOption = (options.time || {}).toRange || {};
    const mergeConfig = Object.assign(Object.assign(Object.assign({}, DefaultConfig), customOption), config);
    if (!target) {
        return {
            [mergeConfig.start]: mergeConfig.nullValue,
            [mergeConfig.end]: mergeConfig.nullValue,
        };
    }
    const formatFunc = (time) => {
        if (mergeConfig.formatter === 'timestamp') {
            return time.valueOf();
        }
        return time.format(mergeConfig.formatter);
    };
    return {
        [mergeConfig.start]: formatFunc(dayjs(target).startOf(mergeConfig.range)),
        [mergeConfig.end]: formatFunc(dayjs(target).endOf(mergeConfig.range)),
    };
}
