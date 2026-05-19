import httpx
from fastapi import APIRouter

router = APIRouter()

WEATHER_URL = (
    "https://api.open-meteo.com/v1/forecast"
    "?latitude=36.06&longitude=103.79"
    "&current=temperature_2m,relative_humidity_2m,weather_code"
    "&daily=temperature_2m_max,temperature_2m_min,weather_code"
    "&timezone=Asia/Shanghai&forecast_days=1"
)

WEATHER_MAP = {
    0: ("晴", "☀️"), 1: ("晴间多云", "🌤️"), 2: ("多云", "⛅"),
    3: ("阴天", "☁️"), 45: ("雾", "🌫️"), 48: ("雾凇", "❄️"),
    51: ("小毛毛雨", "🌦️"), 53: ("毛毛雨", "🌧️"), 55: ("大毛毛雨", "🌧️"),
    61: ("小雨", "🌦️"), 63: ("中雨", "🌧️"), 65: ("大雨", "🌧️"),
    80: ("阵雨", "🌦️"), 81: ("中阵雨", "🌧️"), 82: ("大阵雨", "🌧️"),
    95: ("雷阵雨", "⛈️"), 96: ("雷阵雨伴冰雹", "⛈️"), 99: ("大雷暴", "⛈️"),
}

@router.get("/weather")
async def get_weather():
    async with httpx.AsyncClient() as client:
        resp = await client.get(WEATHER_URL, timeout=10)
        resp.raise_for_status()
        data = resp.json()
    code = data["current"]["weather_code"]
    desc, icon = WEATHER_MAP.get(code, ("未知", "🌈"))
    return {
        "temp": data["current"]["temperature_2m"],
        "humidity": data["current"]["relative_humidity_2m"],
        "description": desc,
        "icon": icon,
        "high": data["daily"]["temperature_2m_max"][0],
        "low": data["daily"]["temperature_2m_min"][0],
    }
