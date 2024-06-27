import useFetch from "./useFetch";

const ComingDays = ({ myId }) => {
    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?id=${myId}&appid=ef683dcb921bc2b625ee436dac37c640`);

    return (
        <>
            <div>
                <div className=" flex flex-wrap justify-center gap-8">
                    {data &&
                        data.list.map((ele) => (
                            <div
                            key={ele.dt}
                            className="flex flex-col mb-10 items-center bg-[#eeeeeeab]  rounded-xl w-[200px] md:w-[300px]"
                            >
                                <div className="mt-4 mb-2">{ele.dt_txt}</div>
                                <div className="text-[30px] text-black">
                                    <div className="flex justify-center"> {Math.round(ele.main.temp - 273.15)} °C </div>
                                    <div className="flex justify-center">
                                    {ele.weather[0].description}
                                    </div>
                                    <div className="flex justify-center">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}.png`}
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="flex justify-center">Wind speed :</div>
                                    <div className="flex justify-center mb-4">{ele.wind.speed} km </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default ComingDays;
