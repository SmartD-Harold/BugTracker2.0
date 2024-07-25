import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/zh-tw';
// import 'dayjs/locale/zh-tw';

const _twDayjs = dayjs;

_twDayjs.extend(utc);
_twDayjs.extend(timezone);
_twDayjs.tz.setDefault('Asia/Taipei');
_twDayjs.locale('zh-tw'); // use locale

export const twDayjs = _twDayjs;

export const ONE_SECOND = 1000;
