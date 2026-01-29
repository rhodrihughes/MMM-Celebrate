# MMM-Celebrate

A MagicMirror² module that displays full-screen celebrations with realistic confetti animations. Perfect for birthdays, anniversaries, holidays, and special occasions.

## Features

- Full-screen celebration overlay
- Zooming text animation
- Realistic confetti effect using [canvas-confetti](https://github.com/catdad/canvas-confetti)
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

3. No additional dependencies required - confetti library is loaded from CDN.

## Configuration

Add the module to your `config/config.js`:

```javascript
{
  module: "MMM-Celebrate",
  position: "fullscreen_above", // Position doesn't matter - always fullscreen
  config: {
    celebrations: [
      { date: "01-01", message: "🎉 Happy New Year! 🎉" },
      { date: "12-25", message: "🎄 Merry Christmas! 🎄" },
      { date: "07-04", message: "🇺🇸 Happy 4th of July! 🇺🇸" },
      // Add your own dates in MM-DD format
    ],
    duration: 10000,           // Celebration duration in ms
    textColor: "#ffffff",      // Text color
    textSize: "4em",           // Text size
    realisticBurst: true,      // Fire confetti from multiple angles
    testMode: false,           // Set to true to test immediately
  }
}
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `celebrations` | `[]` | Array of celebration objects with `date` (MM-DD) and `message` |
| `duration` | `10000` | Duration of celebration in milliseconds |
| `textZoomDuration` | `1500` | Duration of text zoom animation in ms |
| `textColor` | `"#ffffff"` | Color of the celebration text |
| `textSize` | `"4em"` | Size of the celebration text |
| `confettiParticleCount` | `100` | Number of confetti particles per burst |
| `confettiSpread` | `70` | Spread angle of confetti |
| `confettiStartVelocity` | `30` | Initial velocity of confetti |
| `confettiDecay` | `0.95` | How quickly confetti slows down |
| `confettiGravity` | `1` | Gravity effect on confetti |
| `confettiColors` | `[array of colors]` | Array of hex color strings |
| `realisticBurst` | `true` | Fire from multiple angles for realistic effect |
| `checkInterval` | `60000` | How often to check for celebrations (ms) |
| `zIndex` | `9999` | Z-index of the overlay |
| `testMode` | `false` | Trigger a test celebration on load |

## External Triggering

You can trigger celebrations from other modules using notifications:

```javascript
// Trigger a celebration
this.sendNotification("CELEBRATE_TRIGGER", { message: "🎂 Happy Birthday! 🎂" });

// Stop current celebration
this.sendNotification("CELEBRATE_STOP");
```

## Screenshots

When triggered, the module displays:
1. A dark overlay covering the entire screen
2. Text that zooms in from the center
3. Realistic confetti bursting from multiple directions

## Credits

- Confetti animation powered by [canvas-confetti](https://github.com/catdad/canvas-confetti)
- Realistic look inspired by [kirilv.com/canvas-confetti](https://www.kirilv.com/canvas-confetti/)

## License

MIT License
