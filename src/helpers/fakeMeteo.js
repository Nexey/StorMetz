const fakeMeteo = [
    {
        meteo: {
            id: 16774318,
            lieu: 'Metz',
            temps: 'Pluie',
            temp: 13,
            user_rating: {
                aggregate_rating: 3.7,
                votes: 1063,
            },
            cuisines: 'Cafes, Italian',
        },
    },
    {
        restaurant: {
            id: 16774319,
            name: 'Le soleil du desert',
            average_cost: 25,
            user_rating: {
                aggregate_rating: 4.9,
                votes: 333,
            },
            cuisines: 'Middle Eastern, Moroccan',
        },
    },
    {
        restaurant: {
            id: 16774320,
            name: 'Le noodle',
            average_cost: 10,
            user_rating: {
                aggregate_rating: 4.1,
                votes: 1380,
            },
            cuisines: 'Asian, Ramen',
        },
    },
];

export default fakeMeteo;

/*
Object {
  "cod": "200",
  "count": 3,
  "list": Array [
    Object {
      "clouds": Object {
        "all": 90,
      },
      "coord": Object {
        "lat": 49.1191,
        "lon": 6.1727,
      },
      "dt": 1609877380,
      "id": 2994160,
      "main": Object {
        "feels_like": 271.84,
        "humidity": 91,
        "pressure": 1012,
        "temp": 275.79,
        "temp_max": 276.48,
        "temp_min": 275.15,
      },
      "name": "Metz",
      "rain": null,
      "snow": null,
      "sys": Object {
        "country": "FR",
      },
      "weather": Array [
        Object {
          "description": "overcast clouds",
          "icon": "04n",
          "id": 804,
          "main": "Clouds",
        },
      ],
      "wind": Object {
        "deg": 30,
        "speed": 3.1,
      },
    },
    Object {
      "clouds": Object {
        "all": 90,
      },
      "coord": Object {
        "lat": 49.0833,
        "lon": 6.1667,
      },
      "dt": 1609877229,
      "id": 2994149,
      "main": Object {
        "feels_like": 271.83,
        "humidity": 92,
        "pressure": 1012,
        "temp": 275.76,
        "temp_max": 276.48,
        "temp_min": 275.15,
      },
      "name": "Arrondissement de Metz",
      "rain": null,
      "snow": null,
      "sys": Object {
        "country": "FR",
      },
      "weather": Array [
        Object {
          "description": "overcast clouds",
          "icon": "04n",
          "id": 804,
          "main": "Clouds",
        },
      ],
      "wind": Object {
        "deg": 30,
        "speed": 3.1,
      },
    },
    Object {
      "clouds": Object {
        "all": 90,
      },
      "coord": Object {
        "lat": 49.1202,
        "lon": 6.1775,
      },
      "dt": 1609877646,
      "id": 6454365,
      "main": Object {
        "feels_like": 271.84,
        "humidity": 91,
        "pressure": 1012,
        "temp": 275.79,
        "temp_max": 276.48,
        "temp_min": 275.15,
      },
      "name": "Metz",
      "rain": null,
      "snow": null,
      "sys": Object {
        "country": "FR",
      },
      "weather": Array [
        Object {
          "description": "overcast clouds",
          "icon": "04n",
          "id": 804,
          "main": "Clouds",
        },
      ],
      "wind": Object {
        "deg": 30,
        "speed": 3.1,
      },
    },
  ],
  "message": "accurate",
}

 */