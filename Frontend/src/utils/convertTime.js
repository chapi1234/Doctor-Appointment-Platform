const converTime = time =>{
    const timeParts= time.split(":")
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    let meridian = 'am'

    if (hours> 12){
        meridian='pm';

        if (hours< 12){
            meridian='am';

    }
}
return (
    hours.toString().padStart(2), ":,",
    minutes.toString().padStart(2, "0"),
    " ",
    meridian
);
};

export default converTime;