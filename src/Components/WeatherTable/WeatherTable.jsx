import Chart from "chart.js/auto";
import { useRef, useEffect, useContext, useState } from "react";
import { WeatherContext } from "../../WeatherContext";
import Container from "../container/Container";
import { apiTableWeather } from "../../api/weather";
import style from './WeatherTable.module.css'

function WeatherTable() {
  const canvasRef = useRef(null);
  const { cityTable } = useContext(WeatherContext);

  const [time, setTime] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    if (!cityTable) return;

    apiTableWeather(cityTable).then((res) => {
      let arr = [];
      let lastDay = null;

      const result = res.list.slice(0, 21);

      const formattedTimes = result.map((item) => {
        arr.push(item.main.temp);
        const date = new Date(item.dt * 1000);
        const currentDay = date.getDate();

        if (lastDay !== null && currentDay !== lastDay) {
          lastDay = currentDay;
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }

        if (lastDay === null) {
          lastDay = currentDay;
        }

        return date
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          })
          .toLowerCase();
      });

      setTemp(arr);
      setTime(formattedTimes);
    });
  }, [cityTable]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || time.length === 0) return;

    const chartData = {
      labels: time,
      datasets: [
        {
          label: "Hourly forecast",
          data: temp,
          backgroundColor: "transparent",
          borderColor: "#FFB36C",
          borderWidth: 2,
          fill: false,
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    };

const config = {
  type: "line",
  data: chartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        position: "top", // 👈 Переносить час наверх
        grid: {
          display: true, // 👈 Увімкнути вертикальні лінії для часу
          color: "#D1D1D1", // Колір вертикальних ліній (сірий, як на макеті)
          drawBorder: false,
        },
        ticks: {
          color: "#000", // Колір шрифту часу
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: true, // Горизонтальні лінії
          color: "#E0E0E0",
          drawBorder: false,
        },
        ticks: {
          callback: (value) => `${value}°C`,
          color: "#000",
        },
      },
    },
  },
};

    const myChart = new Chart(canvas, config);

    return () => {
      myChart.destroy();
    };
  }, [time, temp]);

  return (
    <section id="table">
      <Container>
        {/* Адаптивна обгортка для графіка */}
       <div className={style.box}>
    <p className={style.title}>Hourly forecast</p>
  <canvas ref={canvasRef}></canvas>
</div>
      </Container>
    </section>
  );
}

export default WeatherTable;