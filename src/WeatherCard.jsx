
import useFetch from "./useFetch";
import ComingDays from "./ComingDays";
import { useEffect, useState } from "react";
const Weathercard = ({city}) => {

    const [weatherData, setWeatherData] = useState(null);
    const { data, isPending, error } = useFetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ef683dcb921bc2b625ee436dac37c640`
    );

    useEffect(() => {
        if (data) {
        setWeatherData(data);
        }
    }, [data]);


    const date = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return ( 
    <>
        <div className="flex items-center flex-col">
            <div className="flex flex-col mb-10 items-center bg-[#eeeeeeab]  rounded-xl w-[200px] md:w-[300px]">
                <div className="mt-4 mb-2"> {formattedDate}</div>
                {isPending && <div className="text-gray-500" > Loading ... </div> }
                {data && <div className="text-[30px] text-black">
                    <div className="flex justify-center">{data.name}</div>
                    <div className="flex justify-center">{Math.round(data.main.temp - 273.15)} °C   </div>
                    <div className="flex justify-center">  {data.weather[0].description}</div>
                    <div className="flex justify-center"> <img  src={`https://openweathermap.org/img/wn/`+data.weather[0].icon+`.png`} alt="" /></div>
                    <div className="flex justify-center">Wind speed :</div>
                    <div className="flex justify-center mb-4">{data.wind.speed} km </div>
                </div>
                }
                {error && <div className="mb-3 text-gray-700">{ error }</div>}
            </div>
        </div>
        <div className="text-center mb-8 text-[28px] md:text-[35px]">  More details: </div>
        <div>
            <ComingDays myId={weatherData?.id}/>
        </div>
    </>
    );
}

export default Weathercard;