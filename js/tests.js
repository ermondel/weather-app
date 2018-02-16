// tests -----------------------------------------------------------------------------

// Keeper.initKeeper('weather-app');
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

/*
cache.push({city_name: "Kiev",lon: "30.5238",timezone: "Europe/Kiev",lat: "50.45466",country_code: "UA",state_code: "12",
  forecast: {'asd': 'kokoko1'}, timestamp: (Math.floor(Date.now() / 1000) - 43200 + 100)});
cache.push({city_name: "Lviv",lon: "34.78999",timezone: "Europe/Kiev",lat: "12.47768",country_code: "UA",state_code: "14",
  forecast: {'asd': 'kokoko2'}, timestamp: (Math.floor(Date.now() / 1000) - 43200 + 100)});
cache.push({city_name: "Odessa",lon: "67.678",timezone: "Europe/Kiev",lat: "67.555",country_code: "UA",state_code: "16",
  forecast: {'asd': 'kokoko3'}, timestamp: (Math.floor(Date.now() / 1000) - 43200 + 100)});
*/
/*
    this.forecastCache.push({city_name: "Kiev",lon: "30.5238",timezone: "Europe/Kiev",lat: "50.45466",country_code: "UA",state_code: "12", 
      forecast: {'asd': 'kokoko1'}, timestamp: (Math.floor(Date.now() / 1000) - 143200 + 100)});
    this.forecastCache.push({city_name: "Lviv",lon: "34.78999",timezone: "Europe/Kiev",lat: "12.47768",country_code: "UA",state_code: "14", 
      forecast: {'asd': 'kokoko2'}, timestamp: (Math.floor(Date.now() / 1000) - 143200 + 100)});
    this.forecastCache.push({city_name: "Odessa",lon: "67.678",timezone: "Europe/Kiev",lat: "67.555",country_code: "UA",state_code: "16", 
      forecast: {'asd': 'kokoko3'}, timestamp: (Math.floor(Date.now() / 1000) - 143200 + 100)});
    console.log(this.getFromCache('city_name', 'kiev'));
    console.log(this.getFromCache('city_name', 'asdasd'));
    console.log(this.getFromCache('lon', '34.78999'));
    console.log(this.getFromCache('lon', '777'));
    console.log(this.getFromCache('lat', '67.555'));
    console.log(this.getFromCache('lat', '6666'));
    console.log(this.forecastCache);
*/

function keeper_debug() {
    /*
    Keeper.addToKeeper(kiev, 'favorites');
    Keeper.addToKeeper(lviv, 'favorites');
    Keeper.addToKeeper(san_francisco, 'favorites');

    Keeper.addToKeeper(kiev, 'history');
    Keeper.addToKeeper(lviv, 'history');
    Keeper.addToKeeper(san_francisco, 'history');

    Keeper.addToKeeper(kiev, 'favorites');
    Keeper.addToKeeper(lviv, 'favorites');
    Keeper.addToKeeper(san_francisco, 'favorites');

    Keeper.addToKeeper(kiev, 'history');
    Keeper.addToKeeper(lviv, 'history');
    Keeper.addToKeeper(san_francisco, 'history');
    */
    /*
    console.log('0', Keeper.searchInKeeper('favorites', 'city_name', 'kiev'));
    console.log('1', Keeper.searchInKeeper('favorites', 'lon', '333', 'lat', '444'));
    console.log('2', Keeper.searchInKeeper('favorites', 'lat', '666'));
    console.log('-1', Keeper.searchInKeeper('favorites', 'city_name', 'odessa'));
    */
    
    // Keeper.checkInFavoriteKeeper(kiev);
    // Keeper.toggleFavorite(kiev);
    // console.log(Keeper.KeeperData);
    
    // Keeper.checkInFavoriteKeeper(lviv);
    // Keeper.toggleFavorite(lviv);
    // console.log(Keeper.KeeperData);

    // Keeper.checkInFavoriteKeeper(san_francisco);
    // Keeper.toggleFavorite(san_francisco);
    // console.log(Keeper.KeeperData);
    
    // Keeper.displayAllKeep();
    // Keeper.clearAllKeep();
}
// keeper_debug();

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

function forecast_example() {
  return {
  "data": [
    {
      "wind_cdir": "NE",
      "rh": 64,
      "wind_spd": 4,
      "pop": 0,
      "wind_cdir_full": "northeast",
      "slp": 1028.5,
      "app_max_temp": -5.3,
      "pres": 1011.3,
      "dewpt": -7.9,
      "snow": 0,
      "uv": 2,
      "ts": 1518004800,
      "wind_dir": 45,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -12.6,
      "max_temp": -0.8,
      "snow_depth": 0,
      "precip": 0,
      "max_dhi": 265.7,
      "datetime": "2018-02-07",
      "temp": -2,
      "min_temp": -6.8,
      "clouds": 90,
      "vis": 10
    },
    {
      "wind_cdir": "NE",
      "rh": 83,
      "wind_spd": 7,
      "pop": 35,
      "wind_cdir_full": "northeast",
      "slp": 1019.4,
      "app_max_temp": -4.2,
      "pres": 1002.6,
      "dewpt": -2.5,
      "snow": 20.26,
      "uv": 2,
      "ts": 1518091200,
      "wind_dir": 45,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -8.9,
      "max_temp": 1.3,
      "snow_depth": 20.3,
      "precip": 3.63,
      "max_dhi": 260.9,
      "datetime": "2018-02-08",
      "temp": 0,
      "min_temp": -2.3,
      "clouds": 91,
      "vis": 10
    },
    {
      "wind_cdir": "NE",
      "rh": 97,
      "wind_spd": 5,
      "pop": 65,
      "wind_cdir_full": "northeast",
      "slp": 1009.1,
      "app_max_temp": -2,
      "pres": 992.9,
      "dewpt": 0.6,
      "snow": 70.94,
      "uv": 2,
      "ts": 1518177600,
      "wind_dir": 45,
      "weather": {
        "icon": "s03d",
        "code": "601",
        "description": "Snow"
      },
      "app_min_temp": -3.9,
      "max_temp": 2.3,
      "snow_depth": 76.6,
      "precip": 12.61,
      "max_dhi": 222.2,
      "datetime": "2018-02-09",
      "temp": 1,
      "min_temp": 0.8,
      "clouds": 99,
      "vis": 4
    },
    {
      "wind_cdir": "S",
      "rh": 96,
      "wind_spd": 2,
      "pop": 10,
      "wind_cdir_full": "south",
      "slp": 1014.5,
      "app_max_temp": 0.2,
      "pres": 997.9,
      "dewpt": -0.6,
      "snow": 4.42,
      "uv": 2,
      "ts": 1518264000,
      "wind_dir": 180,
      "weather": {
        "icon": "a03d",
        "code": "721",
        "description": "Haze"
      },
      "app_min_temp": -1.9,
      "max_temp": 2.3,
      "snow_depth": 72.9,
      "precip": 0.73,
      "max_dhi": 260.9,
      "datetime": "2018-02-10",
      "temp": 0,
      "min_temp": 0.5,
      "clouds": 91,
      "vis": 1.5
    },
    {
      "wind_cdir": "ESE",
      "rh": 93,
      "wind_spd": 1,
      "pop": 15,
      "wind_cdir_full": "east-southeast",
      "slp": 1020.1,
      "app_max_temp": 1.4,
      "pres": 1003.6,
      "dewpt": -1,
      "snow": 2.47,
      "uv": 2,
      "ts": 1518350400,
      "wind_dir": 112,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -2.3,
      "max_temp": 2,
      "snow_depth": 75.4,
      "precip": 0.36,
      "max_dhi": 251.2,
      "datetime": "2018-02-11",
      "temp": 0,
      "min_temp": -1.3,
      "clouds": 93,
      "vis": 7
    },
    {
      "wind_cdir": "NE",
      "rh": 89,
      "wind_spd": 2,
      "pop": 10,
      "wind_cdir_full": "northeast",
      "slp": 1019.9,
      "app_max_temp": -1.5,
      "pres": 1003.3,
      "dewpt": -1.6,
      "snow": 4.56,
      "uv": 2,
      "ts": 1518436800,
      "wind_dir": 45,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -4.2,
      "max_temp": 0.8,
      "snow_depth": 80,
      "precip": 0.57,
      "max_dhi": 222.2,
      "datetime": "2018-02-12",
      "temp": 0,
      "min_temp": -1.5,
      "clouds": 99,
      "vis": 8
    },
    {
      "wind_cdir": "E",
      "rh": 75,
      "wind_spd": 0,
      "pop": 10,
      "wind_cdir_full": "east",
      "slp": 1024.4,
      "app_max_temp": -1.1,
      "pres": 1007.5,
      "dewpt": -3.9,
      "snow": 4.88,
      "uv": 2,
      "ts": 1518523200,
      "wind_dir": 90,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -2.3,
      "max_temp": -0.3,
      "snow_depth": 84.9,
      "precip": 0.48,
      "max_dhi": 222.2,
      "datetime": "2018-02-13",
      "temp": 0,
      "min_temp": -1.3,
      "clouds": 99,
      "vis": 10
    },
    {
      "wind_cdir": "E",
      "rh": 79,
      "wind_spd": 1,
      "pop": 15,
      "wind_cdir_full": "east",
      "slp": 1027.5,
      "app_max_temp": -1.4,
      "pres": 1010.4,
      "dewpt": -4.2,
      "snow": 2.7,
      "uv": 2,
      "ts": 1518609600,
      "wind_dir": 90,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -3.9,
      "max_temp": -0.5,
      "snow_depth": 87.6,
      "precip": 0.24,
      "max_dhi": 231.8,
      "datetime": "2018-02-14",
      "temp": -1,
      "min_temp": -2.8,
      "clouds": 97,
      "vis": 10
    },
    {
      "wind_cdir": "ENE",
      "rh": 77,
      "wind_spd": 1,
      "pop": 10,
      "wind_cdir_full": "east-northeast",
      "slp": 1028.5,
      "app_max_temp": -2.3,
      "pres": 1011.3,
      "dewpt": -5.5,
      "snow": 4.54,
      "uv": 2,
      "ts": 1518696000,
      "wind_dir": 67,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -4.7,
      "max_temp": -1.3,
      "snow_depth": 92.1,
      "precip": 0.37,
      "max_dhi": 227,
      "datetime": "2018-02-15",
      "temp": -2,
      "min_temp": -3.5,
      "clouds": 98,
      "vis": 10
    },
    {
      "wind_cdir": "SW",
      "rh": 81,
      "wind_spd": 2,
      "pop": 10,
      "wind_cdir_full": "southwest",
      "slp": 1031.5,
      "app_max_temp": -3,
      "pres": 1014.3,
      "dewpt": -3.8,
      "snow": 3.38,
      "uv": 2,
      "ts": 1518782400,
      "wind_dir": 225,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -6,
      "max_temp": -0.5,
      "snow_depth": 95.5,
      "precip": 0.3,
      "max_dhi": 260.9,
      "datetime": "2018-02-16",
      "temp": -1,
      "min_temp": -3,
      "clouds": 91,
      "vis": 10
    },
    {
      "wind_cdir": "SSE",
      "rh": 71,
      "wind_spd": 1,
      "pop": 0,
      "wind_cdir_full": "south-southeast",
      "slp": 1031.7,
      "app_max_temp": 0.3,
      "pres": 1014.3,
      "dewpt": -5.6,
      "snow": 0,
      "uv": 2,
      "ts": 1518868800,
      "wind_dir": 165,
      "weather": {
        "icon": "c03d",
        "code": "803",
        "description": "Broken clouds"
      },
      "app_min_temp": -4.7,
      "max_temp": 1,
      "snow_depth": 95.5,
      "precip": 0,
      "max_dhi": 381.8,
      "datetime": "2018-02-17",
      "temp": -1,
      "min_temp": -3.5,
      "clouds": 66,
      "vis": 10
    },
    {
      "wind_cdir": "NE",
      "rh": 81,
      "wind_spd": 3,
      "pop": 15,
      "wind_cdir_full": "northeast",
      "slp": 1026.5,
      "app_max_temp": -2.3,
      "pres": 1008.8,
      "dewpt": -3.8,
      "snow": 0.52,
      "uv": 2,
      "ts": 1518955200,
      "wind_dir": 45,
      "weather": {
        "icon": "c03d",
        "code": "803",
        "description": "Broken clouds"
      },
      "app_min_temp": -7.1,
      "max_temp": 1,
      "snow_depth": 96,
      "precip": 0.06,
      "max_dhi": 333.4,
      "datetime": "2018-02-18",
      "temp": -1,
      "min_temp": -3,
      "clouds": 76,
      "vis": 10
    },
    {
      "wind_cdir": "NE",
      "rh": 76,
      "wind_spd": 2,
      "pop": 15,
      "wind_cdir_full": "northeast",
      "slp": 1024,
      "app_max_temp": -2.8,
      "pres": 1006,
      "dewpt": -6.6,
      "snow": 2.33,
      "uv": 2,
      "ts": 1519041600,
      "wind_dir": 45,
      "weather": {
        "icon": "c03d",
        "code": "803",
        "description": "Broken clouds"
      },
      "app_min_temp": -8.1,
      "max_temp": -0.3,
      "snow_depth": 98.3,
      "precip": 0.19,
      "max_dhi": 376.9,
      "datetime": "2018-02-19",
      "temp": -3,
      "min_temp": -4.8,
      "clouds": 67,
      "vis": 10
    },
    {
      "wind_cdir": "SE",
      "rh": 72,
      "wind_spd": 1,
      "pop": 10,
      "wind_cdir_full": "southeast",
      "slp": 1026.5,
      "app_max_temp": -3.6,
      "pres": 1008,
      "dewpt": -8.3,
      "snow": 4.28,
      "uv": 2,
      "ts": 1519128000,
      "wind_dir": 135,
      "weather": {
        "icon": "c04d",
        "code": "804",
        "description": "Overcast clouds"
      },
      "app_min_temp": -7.5,
      "max_temp": -2.5,
      "snow_depth": 102.6,
      "precip": 0.31,
      "max_dhi": 265.7,
      "datetime": "2018-02-20",
      "temp": -4,
      "min_temp": -6,
      "clouds": 90,
      "vis": 10
    },
    {
      "wind_cdir": "NE",
      "rh": 72,
      "wind_spd": 2,
      "pop": 0,
      "wind_cdir_full": "northeast",
      "slp": 1032.5,
      "app_max_temp": -4.2,
      "pres": 1014,
      "dewpt": -7.3,
      "snow": 0,
      "uv": 2,
      "ts": 1519214400,
      "wind_dir": 45,
      "weather": {
        "icon": "c02d",
        "code": "802",
        "description": "Scattered clouds"
      },
      "app_min_temp": -9.8,
      "max_temp": -1.5,
      "snow_depth": 102.6,
      "precip": 0,
      "max_dhi": 555.9,
      "datetime": "2018-02-21",
      "temp": -3,
      "min_temp": -6.3,
      "clouds": 30,
      "vis": 10
    },
    {
      "wind_cdir": "NE",
      "rh": 73,
      "wind_spd": 6,
      "pop": 15,
      "wind_cdir_full": "northeast",
      "slp": 1036,
      "app_max_temp": -3.8,
      "pres": 1017.5,
      "dewpt": -5.2,
      "snow": 0.85,
      "uv": 2,
      "ts": 1519300800,
      "wind_dir": 45,
      "weather": {
        "icon": "c02d",
        "code": "802",
        "description": "Scattered clouds"
      },
      "app_min_temp": -10.5,
      "max_temp": 1.3,
      "snow_depth": 103.4,
      "precip": 0.06,
      "max_dhi": 517.2,
      "datetime": "2018-02-22",
      "temp": -1,
      "min_temp": -4,
      "clouds": 38,
      "vis": 10
    }
  ],
  "city_name": "Kiev",
  "lon": "30.5238",
  "timezone": "Europe/Kiev",
  "lat": "50.45466",
  "country_code": "UA",
  "state_code": "12"
  };
}
