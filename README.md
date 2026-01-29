# MMM-Celebrate

A MagicMirror² module that displays full-screen celebrations with confetti animations. Perfect for birthdays, anniversaries, holidays, and special occasions.

## Features

- Full-screen celebration overlay
- Two confetti modes: canvas-based or Lottie animation
- Zooming text animation (mode 1)
- Date-based automatic celebrations
- External trigger support via notifications
- Customizable colors, duration, and effects

## Installation

1. Navigate to your MagicMirror modules folder:
   ```bash
   cd ~/MagicMirror/modules
   ```

2. Clone or copy this module:
   ```bash
   git clone https://github.com/your-repo/MMM-Celebrate.git
   ```

3. No additional dependencies required.

## Confetti Modes

### Mode 1: Canvas Confetti
Uses [canvas-confetti](https://github.com/catdad/canvas-confetti) for particle-based confetti. Features a center burst followed by random bursts across the screen. Includes zooming text animation.

### Mode 2: Lottie Animation
Uses a `.lottie` file for pre-rendered confetti animation. Lighter on resources, good for older hardware. No text overlay - just the animation on a transparent background.

## Configuration

Add the module to your `config/config.js`:

```javascript
// Mode 1: Canvas confetti with text
{
  module: "MMM-Celebrate",
  position: "fullscreen_above",
  config: {
    confettiMode: 1,
    celebrations: [
      { date: "01-01", message: "🎉 Happy New Year! 🎉" },
      { date: "12-25", message: "🎄 Merry Christmas! 🎄" },
    ],
    testMode: true,
  }
}

// Mode 2: Lottie animation
{
  module: "MMM-Celebrate",
  position: "fullscreen_above",
  config: {
    confettiMode: 2,
    lottieFile: "confetti on transparent background.lottie",
    lottieRotation: 90,
    lottiePauseBetweenLoops: 2000,
    testMode: true,
  }
}
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `confettiMode` | `1` | `1` = canvas confetti with text, `2` = lottie animation |
| `celebrations` | `[]` | Array of objects with `date` (MM-DD) and `message` |
| `duration` | `10000` | Duration of celebration in milliseconds |
| `testMode` | `false` | Trigger a test celebration on boot |
| `testDelay` | `5000` | Delay before test celebration triggers (ms) |

### Mode 1 Options (Canvas Confetti)

| Option | Default | Description |
|--------|---------|-------------|
| `textZoomDuration` | `1500` | Duration of text zoom animation in ms |
| `textColor` | `"#ffffff"` | Color of the celebration text |
| `textSize` | `"4em"` | Size of the celebration text |
| `confettiParticleCount` | `100` | Number of confetti particles per burst |
| `confettiSpread` | `70` | Spread angle of confetti |
| `confettiStartVelocity` | `30` | Initial velocity of confetti |
| `confettiDecay` | `0.95` | How quickly confetti slows down |
| `confettiGravity` | `1` | Gravity effect on confetti |
| `confettiColors` | `[array]` | Array of hex color strings |

### Mode 2 Options (Lottie)

| Option | Default | Description |
|--------|---------|-------------|
| `lottieFile` | `"confetti on transparent background.lottie"` | Filename in the `lottie/` folder |
| `lottieRotation` | `90` | Rotation in degrees (0, 90, 180, 270) |
| `lottiePauseBetweenLoops` | `2000` | Pause between animation loops (ms) |

## Adding Lottie Files

Place your `.lottie` files in the `modules/MMM-Celebrate/lottie/` folder.

## External Triggering

Trigger celebrations from other modules using notifications:

```javascript
// Trigger a celebration
this.sendNotification("CELEBRATE_TRIGGER", { message: "🎂 Happy Birthday! 🎂" });

// Stop current celebration
this.sendNotification("CELEBRATE_STOP");
```

## Credits

- Canvas confetti powered by [canvas-confetti](https://github.com/catdad/canvas-confetti)
- Lottie playback via [@dotlottie/player-component](https://github.com/dotlottie/player-component)

## License

MIT License
