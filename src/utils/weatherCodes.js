const weatherMap = {
  0:  { description: '晴', icon: '☀️' },
  1:  { description: '晴间多云', icon: '🌤️' },
  2:  { description: '多云', icon: '⛅' },
  3:  { description: '阴天', icon: '☁️' },
  45: { description: '雾', icon: '🌫️' },
  48: { description: '雾凇', icon: '❄️' },
  51: { description: '小毛毛雨', icon: '🌦️' },
  53: { description: '毛毛雨', icon: '🌧️' },
  55: { description: '大毛毛雨', icon: '🌧️' },
  56: { description: '冻毛毛雨', icon: '🌨️' },
  57: { description: '冻毛毛雨', icon: '🌨️' },
  61: { description: '小雨', icon: '🌦️' },
  63: { description: '中雨', icon: '🌧️' },
  65: { description: '大雨', icon: '🌧️' },
  66: { description: '冻雨', icon: '🌨️' },
  67: { description: '冻雨', icon: '🌨️' },
  71: { description: '小雪', icon: '🌨️' },
  73: { description: '中雪', icon: '❄️' },
  75: { description: '大雪', icon: '❄️' },
  77: { description: '雪粒', icon: '❄️' },
  80: { description: '阵雨', icon: '🌦️' },
  81: { description: '中阵雨', icon: '🌧️' },
  82: { description: '大阵雨', icon: '🌧️' },
  85: { description: '小阵雪', icon: '🌨️' },
  86: { description: '大阵雪', icon: '🌨️' },
  95: { description: '雷阵雨', icon: '⛈️' },
  96: { description: '雷阵雨伴冰雹', icon: '⛈️' },
  99: { description: '大雷暴伴冰雹', icon: '⛈️' },
};

export function getWeatherInfo(code) {
  return weatherMap[code] || { description: '未知', icon: '🌈' };
}
