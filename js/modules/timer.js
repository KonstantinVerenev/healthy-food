function timer(deadline) {

  function getTimeRemaining(endtime) {
    const diff = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60) % 24));
    const minutes = Math.floor((diff / (1000 * 60) % 60));
    const seconds = Math.floor((diff / 1000 % 60));

    return {
      total: diff,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(endtime) {
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const timeData = getTimeRemaining(endtime);

      days.innerHTML = getZero(timeData.days);
      hours.innerHTML = getZero(timeData.hours);
      minutes.innerHTML = getZero(timeData.minutes);
      seconds.innerHTML = getZero(timeData.seconds);


      if (timeData.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(deadline);
}

export default timer;
