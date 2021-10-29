class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.date = new Date(`${targetDate}`);
    this.selector = selector;

    this.year = this.date.getFullYear();
    this.intervalId = null;
    this.time = 0;
  }

  start() {
    const wrapperDivEl = document.querySelector(".wrapper");
    wrapperDivEl.insertAdjacentHTML(
      "beforeend",
      createMarkUp(this.selector, this.year)
    );

    const timer = document.querySelector(this.selector);
    const refs = {
      days: timer.querySelector('[data-value="days"]'),
      hours: timer.querySelector('[data-value="hours"]'),
      mins: timer.querySelector('[data-value="mins"]'),
      secs: timer.querySelector('[data-value="secs"]'),
    };

    this.intervalId = setInterval(() => {
      this.time = this.date - Date.now();

      if (this.time <= 0) {
        this.stop();

        new CountdownTimer({
          selector: "#timer",
          targetDate: new Date("Oct 31, 2022"),
        });

        return;
      }

      setTextContent(this.time);
    }, 1000);

    function createMarkUp(selector, year) {
      return `<p>Halloween ${year} Countdown</p>
    <div class="timer" id=${selector.slice(1)}>
      <div class="field">
        <span class="value" data-value="days">00</span>
        <span class="label">Days</span>
      </div>

      <div class="field"><span class="value">:</span></div>

      <div class="field">
        <span class="value" data-value="hours">00</span>
        <span class="label">Hours</span>
      </div>

      <div class="field"><span class="value">:</span></div>

      <div class="field">
        <span class="value" data-value="mins">00</span>
        <span class="label">Minutes</span>
      </div>

      <div class="field"><span class="value">:</span></div>

      <div class="field field-last">
        <span class="value" data-value="secs">00</span>
        <span class="label">Seconds</span>
      </div>
    </div>`;
    }

    function setTextContent(time) {
      refs.days.textContent = Math.floor(time / (1000 * 60 * 60 * 24));
      refs.hours.textContent = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
        .toString()
        .padStart(2, "0");
      refs.mins.textContent = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60)
      )
        .toString()
        .padStart(2, "0");
      refs.secs.textContent = Math.floor((time % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");
    }
  }

  stop() {
    clearInterval(this.intervalId);
    timerEl.innerHTML = "";
    alert("Halloween is today!");
  }
}

new CountdownTimer({
  selector: "#timer",
  targetDate: new Date("Oct 31, 2021"),
}).start();
