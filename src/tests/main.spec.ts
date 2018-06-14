import { genFromConfig } from "../main";


describe("Test generate", () => {
    it("hourly data", () => {

        const config = {
            "start-date": "2018-01-01",
            "end-date": "2018-01-02",
            "resolution": "1 hours",
            "limits": [-10, 35],
            "template": {
                "v": "{value}",
                "t": "{timestamp}",
            }
        };

        let values: any = genFromConfig(config);

        expect(values.length).toEqual(24);

        expect(values[0]['v']).toEqual(15.218228203325765);
        expect(values[0]['t']).toEqual(1514764800000);

        expect(values[values.length - 1]['v']).toEqual(-10.0);
        expect(values[values.length - 1]['t']).toEqual(1514847600000);
    });

    it("900sec data", () => {

        const config = {
            "start-date": "2018-01-01",
            "end-date": "2018-01-02",
            "resolution": "900 seconds",
            "limits": [-10, 35],
            "template": {
                "v": "{value}",
                "t": "{timestamp}",
            }
        };

        let values: any = genFromConfig(config);

        expect(values.length).toEqual(96);

        expect(values[0]['v']).toEqual(23.782904220228552);
        expect(values[0]['t']).toEqual(1514764800000);

        expect(values[values.length - 1]['v']).toEqual(-10.0);
        expect(values[values.length - 1]['t']).toEqual(1514850300000);
    });
});
