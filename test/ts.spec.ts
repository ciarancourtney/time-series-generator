declare var require: any;
var basicJson = require("./expected/basic.json");

import { expect } from 'chai';
import 'mocha';

import { TimeSeriesGenerator } from '../src/time-series-generator';


describe('Basic test', () => {

    it('should generate valid data', () => {
        let values = TimeSeriesGenerator.generate(900, 0, 3600, [-10, 10]);
        expect(values).to.deep.equal(basicJson);
    });
});
