const fakeMeteo = [];

fakeMeteo.push(
    {
        id:6454368,
        name:"Metz",
        coord:{
            lat:49.1202,
            lon:6.1775
        },
        main:{
            temp:275.79,
            feels_like:272.54,
            temp_min:275.15,
            temp_max:276.48,
            pressure:1012,
            humidity:91
        },
        dt:1609881048,
        wind:{
            speed:2.1,
            deg:40
        },
        sys:{
            country:"FR"
        },
        rain:null,
        snow:null,
        clouds:{
            all:90
        },
        weather:[
            {
                id:804,
                main:"Clouds",
                description:"overcast clouds",
                icon:"04n"
            }
        ]
    },
);

export default fakeMeteo;