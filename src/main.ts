import * as moment from 'moment';

import { DateObject } from './dateObject';
import { recursiveInterpolate } from './interpolate';
import { TimeSeriesGenerator } from './timeSeriesGenerator';


export function genFromConfig(config: any): ReadonlyArray<object> {

    const resolution = config.resolution.split(' ');
    const limits = config.limits;
    const timeInterval = moment.duration(parseInt(resolution[0], 10), resolution[1]).asMilliseconds();
    const startTimestamp = new DateObject(config['start-date']).startDate.getTime();
    const endTimestamp = new DateObject(config['end-date']).endDate.getTime();
    const oneDay = moment.duration(1, 'day').asMilliseconds();

    let values = TimeSeriesGenerator.generate(timeInterval, startTimestamp, endTimestamp - oneDay, limits);

    if (config.template) {
        values = values.map(value => recursiveInterpolate(config.template, value));
    }

    return values
}
