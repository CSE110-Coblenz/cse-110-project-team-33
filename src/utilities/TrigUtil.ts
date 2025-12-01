// Placeholder to put userful math functions.
// Scope should be static/global, since these will be called from
// all over the place. Change these rules if needed.

const trigCoordinates = [
  "        (1, 0)",           // 0°
  "   (√3/2, 1/2)",           // 30°
  "  (√2/2, √2/2)",           // 45°
  "   (1/2, √3/2)",           // 60°
  "        (0, 1)",           // 90°
  "  (-1/2, √3/2)",           // 120°
  " (-√2/2, √2/2)",          // 135°
  "  (-√3/2, 1/2)",           // 150°
  "       (-1, 0)",           // 180°
  " (-√3/2, -1/2)",          // 210°
  "(-√2/2, -√2/2)",         // 225°
  " (-1/2, -√3/2)",          // 240°
  "       (0, -1)",           // 270°
  "  (1/2, -√3/2)",           // 300°
  " (√2/2, -√2/2)",          // 315°
  "  (√3/2, -1/2)",           // 330°
  "        (1, 0)"            // 360°
];
export class TrigUtil {
    randomOpposite(): number {
        return Math.floor(Math.random() * (20 - 10) + 10);
    }

    randomAdjacent(): number {
        return Math.floor(Math.random() * (30 - 20) + 20);
    }

    randomHypotenuse(): number {
        return Math.floor(Math.random() * (40 - 30) + 30);
    }

    randomAngle(): number {
        return Math.floor(Math.random() * (85 - 45) + 45);
    }

    randomDegree(): number {
        return Math.floor(Math.random() * (360 - 1) + 1);
    }

    randomTrigCoordinate(): string {
        var randomIndex = Math.floor(Math.random() * (16 - 0) + 0);
        return trigCoordinates[randomIndex];
    }

    // New helper function to convert degrees to radians
    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    SOH(angle: number, opposite: number) {
        // Find hypotenuse: h = o / sin(A)
        const angleInRadians = this.toRadians(angle);
        return Math.floor(opposite / Math.sin(angleInRadians))
    }
    
    CAH(angle: number, adjacent: number) {
        // Find hypotenuse: h = a / cos(A)
        const angleInRadians = this.toRadians(angle);
        return Math.floor(adjacent / Math.cos(angleInRadians))
    }

    TOA(angle: number, opposite: number) {
        // Find adjacent: a = o / tan(A)
        const angleInRadians = this.toRadians(angle);
        return Math.floor(opposite / Math.tan(angleInRadians))
    }

}
