import { useState } from "react";
import WeatherCard from "./WeatherCard";
import cityData from './lib/city.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const CityName = () => {
    const [city, setCity] = useState('');

    const cityNames = cityData.map((city) => city.name);

    const handleClick = (e) => {
        e.preventDefault();
    }

    const fetchPlaceName = (latitude, longitude) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ef683dcb921bc2b625ee436dac37c640`)
            .then(response => response.json())
            .then(data => {
                setCity(data.name);
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            });
    };

    const handleCurrentLocation = (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = Math.round(position.coords.latitude);
                    const longitude = Math.round(position.coords.longitude);
                    fetchPlaceName(latitude, longitude);
                },
                (error) => {
                    console.error(`Error getting geolocation: ${error.message}`);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    return (
        <div>
            <div className="mb-10 flex items-center flex-col">
                <form>
                    <input
                        type="text"
                        value={city}
                        placeholder="Enter the city name here"
                        className="my-5 text-blue-900 w-[300px] md:w-[400px] outline-none px-4 py-2 rounded-xl bg-slate-200"
                        onChange={(e) => { setCity(e.target.value) }}
                        list="citySuggestions"
                        onClick={handleClick}
                    />
                    <datalist id="citySuggestions">
                        {cityNames.map((cityName, index) => (
                            <option key={index} value={cityName} />
                        ))}
                    </datalist>
                    <button onClick={handleCurrentLocation} className="pl-4">
                        <FontAwesomeIcon icon={faLocationDot} fade style={{ color: "#062256" }} />
                    </button>
                </form>
            </div>
            <WeatherCard city={city} />
        </div>
    );
}

export default CityName;
