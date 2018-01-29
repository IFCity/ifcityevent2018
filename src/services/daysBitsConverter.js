const ALL_DAYS = [2, 4, 8, 16, 32, 64, 128];


export default {
    bitToDays: bits => {
        let result = [];
        for (let i = 0; i < ALL_DAYS.length; i++) {
            result.push(!!(bits & ALL_DAYS[i]));
        }
        return result;
    },
    daysToBit: days => {
        let result = 0;
        for (let i = 0; i < ALL_DAYS.length; i++) {
            result = result + (days[i] ? ALL_DAYS[i] : 0);
        }
        return result > 0 ? result : null;
    }
}
