class ReverseTimer {
  constructor({ onTick }) {
    this.selector = "#timer-1";
    this.targetDate = new Date("Jul 19, 2021");
    this.onTick = onTick;
    this.markup = markup;
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const newYearDate = this.targetDate - currentTime;
      const time = this.getTimeComponents(newYearDate);

      this.onTick(time);
    }, 100);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, seconds };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  addMarkup() {
    document
      .querySelector(this.selector)
      .insertAdjacentHTML("afterbegin", this.markup());
  }
}

const timer = new ReverseTimer({
  onTick: updateClockface,
  markup: markup,
});

timer.addMarkup();
timer.start(updateClockface);

function updateClockface({ days, hours, mins, seconds }) {
  const refs = {
    days: document.querySelector("[data-value=days]"),
    hours: document.querySelector("[data-value=hours]"),
    mins: document.querySelector("[data-value=mins]"),
    seconds: document.querySelector("[data-value=secs]"),
  };
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.seconds.textContent = seconds;
}

function markup() {
  return `<h1 class='title'>I go to HOME <span>🥳</span></h1>
            <div class="field">
                <span class="value" data-value="days">0</span>
                <span class="label">Days</span>
            </div>
    
            <div class="field">
                <span class="value" data-value="hours">0</span>
                <span class="label">Hours</span>
            </div>
    
            <div class="field">
                <span class="value" data-value="mins">0</span>
                <span class="label">Minutes</span>
            </div>
    
            <div class="field">
                <span class="value" data-value="secs">0</span>
                <span class="label">Seconds</span>
            </div>

            <div id="content" class="emoji">
              <span>🎉🎂</span>
            </div>`;
}
