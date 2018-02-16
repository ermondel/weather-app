// tests -----------------------------------------------------------------------------

Keeper.initKeeper('weather-app');
// console.log(Keeper.KeeperData);

// test
const kiev = {
        city_name: 'Kiev',
        lon: '111',
        timezone: 'qwe',
        lat: '222',
        country_code: 'UA',
        state_code: '01',
};
const lviv = {
        city_name: 'Lviv',
        lon: '333',
        timezone: 'asd',
        lat: '444',
        country_code: 'UA',
        state_code: '02',
};
const san_francisco = {
        city_name: 'San Francisco',
        lon: '555',
        timezone: 'zxc',
        lat: '666',
        country_code: 'UA',
        state_code: '03',
};


function keeper_debug() {
    /*
    Keeper.addToKeeper(kiev, 'favorites');
    Keeper.addToKeeper(lviv, 'favorites');
    Keeper.addToKeeper(san_francisco, 'favorites');

    Keeper.addToKeeper(kiev, 'history');
    Keeper.addToKeeper(lviv, 'history');
    Keeper.addToKeeper(san_francisco, 'history');
    */
    /*
    console.log(Keeper.searchInKeeper('favorites', 'city_name', 'kiev'));
    console.log(Keeper.searchInKeeper('favorites', 'lon', '333', 'lat', '444'));
    console.log(Keeper.searchInKeeper('favorites', 'lat', '666'));
    console.log(Keeper.searchInKeeper('favorites', 'city_name', 'odessa'));
    */
    // console.log(Keeper.checkInFavoriteKeeper(kiev));
    // console.log(Keeper.checkInFavoriteKeeper(lviv));
    // console.log(Keeper.checkInFavoriteKeeper(san_francisco));
    /*
    Keeper.toggleFavorite(kiev);
    console.log(Keeper.KeeperData);
    */
    /*
    Keeper.toggleFavorite(lviv);
    console.log(Keeper.KeeperData);
    */
    /*
    Keeper.toggleFavorite(san_francisco);
    console.log(Keeper.KeeperData);
    */
    // Keeper.displayAllKeep();
    // Keeper.clearAllKeep();
}

function utils_debug() {
    /*
    console.log('true', Utils.isCityName('Kiev'));
    console.log('false', Utils.isCityName('123'));
    console.log('false', Utils.isCityName('#$%'));
    console.log('true', Utils.isCityName('asd'));
    console.log('false', Utils.isCityName(' '));
    console.log('false', Utils.isCityName('                 '));
    console.log('false', Utils.isCityName('    sdf         $    '));
    console.log('false', Utils.isCityName('    sdf '));
    console.log('false', Utils.isCityName('a                  d'));
    console.log('false', Utils.isCityName('naaammeeee6'));
    console.log('true', Utils.isCityName('qwe-qwe'));
    console.log('false', Utils.isCityName('qwe - qwe'));
    console.log('false', Utils.isCityName('qwe - qwe-'));
    console.log('true', Utils.isCityName('qwe qwe'));
    */
    /*
    console.log('C', Utils.celsiusToFahrenheit(-5), 'F');
    console.log('C', Utils.celsiusToFahrenheit(-1), 'F');
    console.log('C', Utils.celsiusToFahrenheit(0), 'F');
    console.log('C', Utils.celsiusToFahrenheit(12.12), 'F');
    console.log('C', Utils.celsiusToFahrenheit(21.12345), 'F');
    */
    /*
    console.log((Math.floor(Date.now() / 1000))-86400, '->', Utils.NMonYDate((Math.floor(Date.now() / 1000))-86400));
    console.log((Math.floor(Date.now() / 1000))-172800, '->', Utils.NMonYDate((Math.floor(Date.now() / 1000))-172800));
    console.log((Math.floor(Date.now() / 1000))-259200, '->', Utils.NMonYDate((Math.floor(Date.now() / 1000))-259200));
    console.log((Math.floor(Date.now() / 1000))-604800, '->', Utils.NMonYDate((Math.floor(Date.now() / 1000))-604800));
    console.log((Math.floor(Date.now() / 1000))-1209600, '->', Utils.NMonYDate((Math.floor(Date.now() / 1000))-1209600));
    */
}

function weatherbit_debug() {
    /*
    const example = {  
             "data":[  
                {  
                   "wind_cdir":"NE",
                   "rh":72,
                   "wind_spd":7,
                   "pop":30,
                   "wind_cdir_full":"northeast",
                   "slp":1016.91,
                   "app_max_temp":26.64,
                   "pres":1003,
                   "dewpt":17.7,
                   "snow":0,
                   "snow_depth":0,
                   "uv":2,
                   "wind_dir":45,
                   "weather":{  
                      "icon":"c04d",
                      "code":"804",
                      "description":"Overcast clouds"
                   },
                   "ts":1504418400,
                   "max_temp":27.8,
                   "app_min_temp":16.96,
                   "precip":5.2,
                   "max_dhi":285.5,
                   "datetime":"2017-08-28",
                   "temp":23,
                   "min_temp":19,
                   "clouds":100,
                   "vis":10
                },
             ],
             "city_name":"Raleigh",
             "lon":"-78.63861",
             "timezone":"America\/New_York",
             "lat":"35.7721",
             "country_code":"US",
             "state_code":"NC"
          };
    console.log(Weatherbit.convertWeatherbit(example, Utils.celsiusToFahrenheit));
    */
    /*
    console.log(Weatherbit.getWeatherbitURL('kiev'));
    console.log(Weatherbit.getWeatherbitURL('lviv'));
    console.log(Weatherbit.getWeatherbitURL(null, 38.123, -78.543));
    console.log(Weatherbit.getWeatherbitURL(null, 123.77, 456.122));
    */
}

