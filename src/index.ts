export default class ToneCSSUtils {
  static setColors(namespace: string, primary: string, secondary: string) {
    const cssNamespace = '--' + namespace

    const primaryRgb = this.hexToRgb(primary)
    const secondaryRgb = this.hexToRgb(secondary)

    if (primaryRgb && secondaryRgb) {
      const primaryBrightness = primaryRgb.r + primaryRgb.g + primaryRgb.b
      const secondaryBrightness =
        secondaryRgb.r + secondaryRgb.g + secondaryRgb.b

      const brightness =
        primaryBrightness > secondaryBrightness
          ? { lighter: primary, darker: secondary }
          : { lighter: secondary, darker: primary }

      document
        .querySelector('html')
        ?.style.setProperty(cssNamespace + '-darker', brightness.darker)

      document
        .querySelector('html')
        ?.style.setProperty(cssNamespace + '-lighter', brightness.lighter)
    }
  }

  static getColors(namespace: string) {
    return {
      lighter: document
        .querySelector('html')
        ?.style.getPropertyValue('--' + namespace + '-lighter'),
      darker: document
        .querySelector('html')
        ?.style.getPropertyValue('--' + namespace + '-darker'),
    }
  }

  static getColorArray(namespace: string) {
    return [
      document
        .querySelector('html')
        ?.style.getPropertyValue('--' + namespace + '-darker'),
      document
        .querySelector('html')
        ?.style.getPropertyValue('--' + namespace + '-lighter'),
    ]
  }

  static hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }
}
