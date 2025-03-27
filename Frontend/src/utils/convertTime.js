const convertTime = (time) => {
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
  
    let meridian = 'AM';
  
    if (hours >= 12) {
      meridian = 'PM';
      if (hours > 12) {
        hours -= 12; // Convert to 12-hour format
      }
    } else if (hours === 0) {
      hours = 12; // Midnight case
    }
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${meridian}`;
  };
  
  export default convertTime;
  