import * as moment from 'moment/moment';
import * as tv4 from 'tv4';

import {DateObject} from './date-object';
import {TimeSeriesGenerator} from './time-series-generator';
import {recursiveInterpolate, missingValues} from './interpolate';
import {CONFIG_SCHEMA} from './config_schema';

const REQUIRED_VALUES = ['{value}', '{timestamp}'];

function formatSchemaException(error, config: string): string {
    return `Error in ${config}
${error.message} in ${error.dataPath}`;
}

export default function (config): object[] {
    let valid = tv4.validate(config, CONFIG_SCHEMA);
    if (!valid) {
        console.error(formatSchemaException(tv4.error, config));
    }
    let missing = missingValues(config['template'], REQUIRED_VALUES);
    if (missing.length) {
        console.error('the provided template doesn\'t contain all the required values. Missing: ' + missing.join(', '));
    }

    let startTimestamp = new DateObject(config['start-date']).startDate.getTime();
    let endTimestamp = new DateObject(config['end-date']).endDate.getTime();
    let resolution = config['resolution'].split(' ');
    let limits = config['limits'];
    let timeInterval = moment.duration(parseInt(resolution[0], 10), resolution[1]).asMilliseconds();
    let oneDay = moment.duration(1, 'day').asMilliseconds();
    if (oneDay < timeInterval) {
        console.error('the resolution has to be shorter than one day');
    }
    if (oneDay % timeInterval !== 0) {
        console.error('the resolution has to be a divider of one day');
    }

    let values = TimeSeriesGenerator.generate(timeInterval, startTimestamp, endTimestamp, limits);

    if (config['template']) {
        values = values.map(value => recursiveInterpolate(config['template'], value));
    }

    return values
}
