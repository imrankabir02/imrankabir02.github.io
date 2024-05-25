function updateTime(){
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours > 12 ? 'PM' : 'AM';

    hours = hours > 12 ? (hours%12) : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds <10 ? '0' + seconds : seconds;

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('ampm').textContent = ampm;
}
setInterval(updateTime,1000);