<template>
  <div class="list-group" id="chart">
    <h2 class="title dateTtile">
      <span>CHART</span>
      <span class="date">{{sevenDay + " - " + today}}</span>
    </h2>
    <canvas id="chart" width="450" height="280" ref="chart"></canvas>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import "chart.js";
import moment from "moment";
export default {
  data() {
    return {
      today: "",
      sevenDay: ""
    };
  },
  computed: {
    ...mapGetters(["tomatosChart"])
  },
  mounted() {
    this.today = moment().format("YYYY.M.D");
    this.sevenDay = moment()
      .subtract(6, "days")
      .format("YYYY.M.D");
    const lable = this.tomatosChart.map(day => {
      return day.day;
    });
    const data = this.tomatosChart.map(day => {
      return day.tomatos;
    });
    this.$nextTick(() => {
      let chart = new Chart(this.$refs.chart, {
        // The type of chart we want to create
        type: "bar",

        // The data for our dataset
        data: {
          labels: lable,
          datasets: [
            {
              label: "tomatos",
              backgroundColor: [
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#fff",
                "#FF4384"
              ],
              data: data
            }
          ]
        },
        // Configuration options go here
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: "#fff"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: "#fff"
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      });
      Chart.defaults.global.defaultFontColor = "#fff";
      Chart.defaults.global.defaultFontSize = 14;
    });
  }
};
</script>
<style lang="scss">
.dateTtile {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date {
  font-size: 14px;
}
</style>
