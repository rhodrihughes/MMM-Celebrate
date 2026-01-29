Module.register("MMM-Celebrate", {
  defaults: {
    // Celebration events - array of { date: "MM-DD", message: "Happy Birthday!" } or { holiday: "christmas", message: "Merry Christmas!" }
    celebrations: [],
    // Duration of the celebration display in ms
    duration: 10000,
    // Text animation settings
    textZoomDuration: 1500,
    textColor: "#ffffff",
    textSize: "4em",
    // Confetti settings (realistic look from canvas-confetti)
    confettiParticleCount: 100,
    confettiSpread: 70,
    confettiStartVelocity: 30,
    confettiDecay: 0.95,
    confettiGravity: 1,
    confettiColors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#ff69b4"],
    // Fire confetti from both sides for realistic effect
    realisticBurst: true,
    // Check interval for celebrations (default: every minute)
    checkInterval: 60000,
    // Z-index for full screen overlay
    zIndex: 9999,
    // Test mode - set to true to trigger on boot
    testMode: false,
    // Delay before test celebration triggers (ms)
    testDelay: 5000,
  },

  start: function () {
    Log.info("Starting module: " + this.name);
    this.celebrating = false;
    this.currentMessage = "";
    this.confettiCanvas = null;
    this.confettiInstance = null;
    this.celebrationTimeout = null;
    this.loaded = false;

    if (this.config.testMode) {
      setTimeout(() => {
        this.triggerCelebration("🎉 Test Celebration! 🎉");
      }, this.config.testDelay);
    } else {
      this.checkForCelebrations();
      setInterval(() => this.checkForCelebrations(), this.config.checkInterval);
    }
  },

  getStyles: function () {
    return ["MMM-Celebrate.css"];
  },

  getScripts: function () {
    return ["https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"];
  },

  checkForCelebrations: function () {
    const now = new Date();
    const todayStr = String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");

    for (const celebration of this.config.celebrations) {
      if (celebration.date === todayStr) {
        // Check if we haven't already celebrated today
        const lastCelebrated = localStorage.getItem("MMM-Celebrate-" + celebration.date);
        const todayDate = now.toDateString();
        
        if (lastCelebrated !== todayDate) {
          localStorage.setItem("MMM-Celebrate-" + celebration.date, todayDate);
          this.triggerCelebration(celebration.message);
          break;
        }
      }
    }
  },

  triggerCelebration: function (message) {
    if (this.celebrating) return;
    
    this.celebrating = true;
    this.currentMessage = message;
    this.updateDom(0);

    // Start confetti after DOM update
    setTimeout(() => this.startConfetti(), 100);

    // End celebration after duration
    this.celebrationTimeout = setTimeout(() => {
      this.endCelebration();
    }, this.config.duration);
  },

  startConfetti: function () {
    const canvas = document.getElementById("celebrate-confetti-canvas");
    if (!canvas || typeof confetti === "undefined") return;

    this.confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // Realistic burst effect - fire from multiple angles
    if (this.config.realisticBurst) {
      this.fireRealisticConfetti();
    } else {
      this.fireSimpleConfetti();
    }
  },

  fireRealisticConfetti: function () {
    const duration = this.config.duration - 1000;
    const defaults = {
      startVelocity: this.config.confettiStartVelocity,
      spread: 100,
      ticks: 60,
      zIndex: this.config.zIndex + 1,
      colors: this.config.confettiColors,
      decay: this.config.confettiDecay,
      gravity: this.config.confettiGravity,
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    // Initial big burst from center
    this.confettiInstance({
      ...defaults,
      particleCount: this.config.confettiParticleCount * 2,
      origin: { x: 0.5, y: 0.6 },
      angle: 90,
      spread: 120,
    });

    // Wait 1.5 seconds, then start random bursts across the screen
    setTimeout(() => {
      const animationEnd = Date.now() + (duration - 1500);

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0 || !this.celebrating) {
          clearInterval(interval);
          return;
        }

        const particleCount = Math.floor((this.config.confettiParticleCount * (timeLeft / (duration - 1500))) / 3);

        // Fire from random positions across the screen including bottom
        this.confettiInstance({
          ...defaults,
          particleCount: particleCount,
          origin: { x: randomInRange(0, 1), y: randomInRange(0, 0.9) },
          angle: randomInRange(45, 135),
        });
      }, 300);
    }, 1500);
  },

  fireSimpleConfetti: function () {
    const defaults = {
      particleCount: this.config.confettiParticleCount,
      spread: this.config.confettiSpread,
      startVelocity: this.config.confettiStartVelocity,
      colors: this.config.confettiColors,
      origin: { x: 0.5, y: 0.5 },
    };

    this.confettiInstance(defaults);
  },

  endCelebration: function () {
    this.celebrating = false;
    this.currentMessage = "";
    
    if (this.confettiInstance) {
      this.confettiInstance.reset();
      this.confettiInstance = null;
    }
    
    this.updateDom(500);
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "celebrate-wrapper";

    if (!this.celebrating) {
      wrapper.style.display = "none";
      return wrapper;
    }

    wrapper.style.zIndex = this.config.zIndex;

    // Full screen overlay
    const overlay = document.createElement("div");
    overlay.className = "celebrate-overlay";

    // Confetti canvas
    const canvas = document.createElement("canvas");
    canvas.id = "celebrate-confetti-canvas";
    canvas.className = "celebrate-canvas";

    // Text container with zoom animation
    const textContainer = document.createElement("div");
    textContainer.className = "celebrate-text-container";

    const text = document.createElement("div");
    text.className = "celebrate-text zoom-in";
    text.innerHTML = this.currentMessage;
    text.style.color = this.config.textColor;
    text.style.fontSize = this.config.textSize;
    text.style.animationDuration = this.config.textZoomDuration + "ms";

    textContainer.appendChild(text);
    overlay.appendChild(canvas);
    overlay.appendChild(textContainer);
    wrapper.appendChild(overlay);

    return wrapper;
  },

  // Allow external triggering via notification
  notificationReceived: function (notification, payload) {
    if (notification === "CELEBRATE_TRIGGER") {
      const message = payload?.message || "🎉 Celebration! 🎉";
      this.triggerCelebration(message);
    } else if (notification === "CELEBRATE_STOP") {
      this.endCelebration();
    }
  },
});
