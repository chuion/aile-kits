import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import options from '../../../globalOptions';
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
const DefaultConfig = {
    template: 'YYYY-MM-DD HH:mm:ss'
};
export function formatTime(time, format = '', timeFormat, template) {
    time = time || Date.now();
    if (timeFormat && !dayjs(time, timeFormat).isValid()) {
        throw new Error('AileKit formatTime Error: Invalid Date!');
    }
    if (!timeFormat && !dayjs(+time).isValid()) {
        throw new Error('AileKit formatTime Error: Invalid Date!');
    }
    const customOption = (options.time || {}).formatTime || {};
    const mergeConfig = Object.assign(Object.assign({}, DefaultConfig), customOption);
    if (template) {
        mergeConfig.template = template;
    }
    let realFormat = format || mergeConfig.template;
    if (format.startsWith('fmt:')) {
        const range = format.replace('fmt:', '').split('');
        const from = mergeConfig.template.indexOf(range[0]) || 0;
        const to = mergeConfig.template.lastIndexOf(range[1]) + 1 || mergeConfig.template.length;
        realFormat = mergeConfig.template.substring(from, to);
    }
    return dayjs(time, timeFormat).format(realFormat);
}
