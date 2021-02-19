import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
dayjs.extend(toArray);
export var IgnoreType;
(function (IgnoreType) {
    IgnoreType["year"] = "year";
    IgnoreType["month"] = "month";
    IgnoreType["date"] = "date";
    IgnoreType["hour"] = "hour";
    IgnoreType["minute"] = "minute";
    IgnoreType["second"] = "second";
    IgnoreType["millsecond"] = "millisecond";
})(IgnoreType || (IgnoreType = {}));
const IgnoreList = [IgnoreType.year, IgnoreType.month, IgnoreType.date, IgnoreType.hour, IgnoreType.minute, IgnoreType.second, IgnoreType.millsecond];
const _IgnoreLength = IgnoreList.length;
export function isExpired(target, ignore, specify) {
    if (!dayjs(target).isValid()) {
        throw new Error('AileKit isExpired Error: Invalid Date!');
    }
    let res = false;
    const targetList = dayjs(target).toArray();
    const specifyList = dayjs(specify).toArray();
    const startIdx = ignore ? IgnoreList.indexOf(ignore) + 1 : 0;
    for (let i = startIdx; i < _IgnoreLength - 1; i++) {
        if (targetList[i] === specifyList[i]) {
            continue;
        }
        res = targetList[i] > specifyList[i];
        break;
    }
    return res;
}
export function isExpiredIgnoreDate(target, specify) {
    return isExpired(target, IgnoreType.date, specify);
}
//# sourceMappingURL=isExpired.js.map