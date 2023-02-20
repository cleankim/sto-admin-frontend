// ISO Dates
import moment from "moment";

export const getStandardDateFormat = (param: string) => {
    const date = new Date(param);
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export const getDateFormat = (param: string) => {
    const date = new Date(param);
    return moment(date).format('YYYY-MM-DD');
}

export const getDateDotFormat = (param: string) => {
    const date = new Date(param);
    return moment(date).format('YYYY.MM.DD');
}


export const getDateTimeFormat = (param: string) => {
    const date = new Date(param);
    return moment(date).format('YYYY-MM-DD HH:mm');
}

export const getKoDateFormat = (param: string) => {
    const date = new Date(param);
    return moment(date).format('YYYY년 MM월 DD일');
}