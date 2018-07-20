import MatchesStore from '../../js/stores/MatchesStore';

describe ('Matches Store test functions', () => {
    let values, data;

    it ('converts time correctly', () => {
        let time = "06:34";
        let minutes = MatchesStore.convertTime(time);

        expect(minutes).toEqual(394);
    });

    it ('calculates time difference', () => {
        let objRouteTime = "06:34";
        let routeTime = "06:00";

        let result = MatchesStore.calcTimeDifference(objRouteTime, routeTime);

        expect(result).toEqual(34);
    });

    it ('calculates distance correctly', () => {
        let lat1 = -25.7478676;
        let lng1 = 28.22927119999997;
        let lat2 = -26.2041028;
        let lng2 = 28.047305100000017;

        let distance = MatchesStore.calcDistance(lat1, lng1, lat2, lng2);
        
        expect(distance).toEqual(53.89340180121514);
    });

    it ('filters routes by time correctly', () => {
        let routeObj = {
            time : "06:00"
        }

        MatchesStore.recommendedRoutes = [
            {routeName : "TestRoute1", time : "03:00"},
            {routeName : "TestRoute2", time : "05:00"},
            {routeName : "TestRoute3", time : "06:00"},
            {routeName : "TestRoute4", time : "21:00"}
        ];

        MatchesStore.filterRoutesByTime(routeObj);

        values = [
            {routeName : "TestRoute3", time : "06:00"},
            {routeName : "TestRoute2", time : "05:00"},
            {routeName : "TestRoute1", time : "03:00"},
            {routeName : "TestRoute4", time : "21:00"}
        ]

        expect(MatchesStore.recommendedRoutes).toEqual(values);
    });
});