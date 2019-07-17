import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import { throttle } from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // todo-list
    todoList: [
      //番茄鐘 列表
      {
        id: moment()
          .subtract(6, "days")
          .unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 15
      },
      {
        id: moment()
          .subtract(5, "days")
          .unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 13
      },
      {
        id: moment()
          .subtract(4, "days")
          .unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 8
      },
      {
        id: moment()
          .subtract(3, "days")
          .unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 3
      },
      {
        id: moment()
          .subtract(2, "days")
          .unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 5
      },
      {
        id: moment()
          .subtract(1, "days")
          .unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 5
      },
      {
        id: moment().unix(),
        title: "the XX thing to do today",
        isDone: false,
        tomatos: 3
      }
    ],
    todoId: moment()
      .subtract(6, "days")
      .unix(), // 被選選取todo的id
    timer: null, //計時器 Interval
    time: 1500, //計時 時間
    breakTime: 300, //休息時間
    workTime: 1500, //工作時間
    timerState: "pause", // 計時狀態 : 'play' 'pause'
    workState: "work", // 工作狀態 : 'work' 'break'
    modelState: 0, //  CLOSE : 0  TODO : 1 ANALYTIC : 2 SRINGTONES : 3
    // 鬧鐘列表
    alarmList: [
      {
        id: 1,
        title: "beep",
        src: require("./assets/audio/beep.mp3")
      },
      {
        id: 2,
        title: "bell",
        src: require("./assets/audio/bell.mp3")
      },
      {
        id: 3,
        title: "bugle",
        src: require("./assets/audio/bugle.mp3")
      },
      {
        id: 4,
        title: "digital",
        src: require("./assets/audio/digital.mp3")
      },
      {
        id: 5,
        title: "drop",
        src: require("./assets/audio/drop.mp3")
      },
      {
        id: 6,
        title: "horn",
        src: require("./assets/audio/horn.mp3")
      },
      {
        id: 7,
        title: "warning",
        src: require("./assets/audio/warning.mp3")
      },
      {
        id: 8,
        title: "alarm",
        src: require("./assets/audio/alarm.mp3")
      }
    ],
    alarmWorkId: 1, // 被選取工作鬧鐘的id
    alarmBreakId: 2, // 被選取休息鬧鐘的id
    alarm: new Audio(), //鬧鐘
    alert: false,
    chart: []
  },
  mutations: {
    // 操作 model CLOSE : 0  TODO : 1 ANALYTIC : 2 SRINGTONES : 3
    openModel(state, id) {
      state.modelState = id;
    },
    // 新增一筆 todo
    addTodo: throttle(function(state, title) {
      // 若 title 不為''才做新增
      if (title) {
        let now = moment().format("X"); // ID = 現在時間

        state.todoList = [
          ...state.todoList,
          {
            id: now,
            title: title,
            isDone: false,
            tomatos: 0
          }
        ];
        // 若todoId=='' 新增todo.id = todoId
        if (state.todoId === "") {
          state.todoId = state.todoList.find(item => {
            return !item.isDone;
          }).id;
        }
      }
    }, 1000),
    // 選擇工作 todo
    changeTodo(state, id) {
      state.todoId = id;
      // 清除計時器
      clearInterval(state.timer);
      // 計時時間 : workTime
      state.time = state.workTime;
      // 計時狀態: pause
      state.timerState = "pause";
      // 工作狀態: work
      state.workState = "work";
    },
    //  更改todo 完成狀態
    compeleteTodo(state, id) {
      let tomato = state.todoList.find(item => {
        return item.id == id;
      });
      tomato.isDone = true;
      // 若是工作中
      if (state.todoId === id) {
        // 清除計時器
        clearInterval(state.timer);
        // 計時時間 : workTime
        state.time = state.workTime;
        // 計時狀態: pause
        state.timerState = "pause";
        // 工作狀態: work
        state.workState = "work";

        // 替補下一個 尚未完成的todo
        var newId = state.todoList.find(item => {
          return item.isDone === false;
        });
        if (newId) {
          state.todoId = newId.id;
        } else {
          // 若無尚未完成的todo , todoId = ''
          state.todoId = "";
        }
      }
    },
    // 計時
    tickTime(state, timer) {
      // 若工作狀態 : work
      if (state.workState === "work") {
        // 計時時間每秒 -1
        state.time = state.time - 1;
        if (state.time < 0) {
          // 清除計時器
          clearInterval(state.timer);
          // 工作狀態變更 : break
          state.workState = "break";
          // 計時時間 : breakTime
          state.time = state.breakTime;
          // todo.tomatos + 1
          let tomato = state.todoList.find(item => item.id === state.todoId);
          tomato.tomatos = tomato.tomatos + 1;
          // 計時狀態 : pause
          state.timerState = "pause";

          // 鬧鐘設定
          let src = "";
          if (state.alarmWorkId) {
            src = state.alarmList.find(item => {
              return item.id === state.alarmWorkId;
            }).src;
          }
          state.alarm.src = src;
          state.alarm.loop = true;
          state.alert = true;
          state.alarm.play();
        }
      } //若工作狀態 : break
      else {
        // 計時時間每秒 -1
        state.time = state.time - 1;
        if (state.time < 0) {
          // 清除計時器
          clearInterval(state.timer);
          // 工作狀態變更 : work
          state.workState = "work";
          // 計時時間 : workTime
          state.time = state.workTime;
          // 計時狀態 : pause
          state.timerState = "pause";

          // 鬧鐘設定
          let src = "";
          if (state.alarmBreakId) {
            src = state.alarmList.find(item => {
              return item.id === state.alarmBreakId;
            }).src;
          }
          state.alarm.src = src;
          state.alarm.loop = true;
          state.alert = true;
          state.alarm.play();
        }
      }
    },
    // 重設計時
    resetTime(state) {
      // 若工作狀態 :　work
      if (state.workState === "work") {
        // 清除計時器
        clearInterval(state.timer);
        // 工作狀態 : workTime
        state.time = state.workTime;
        // 計時狀態 : pause
        state.timerState = "pause";
      } // 若工作狀態 :　break
      else {
        // 清除計時器
        clearInterval(state.timer);
        // 工作狀態 : breakTime
        state.time = state.breakTime;
        // 計時狀態 : pause
        state.timerState = "pause";
      }
    },
    // 設定 work鬧鐘id
    setWorkId(state, id) {
      state.alarmWorkId = id;
    },
    // 設定 break鬧鐘id
    setBreakId(state, id) {
      state.alarmBreakId = id;
    },
    closeAlarm(state) {
      state.alert = false;
      state.alarm.pause();
    }
  },
  actions: {
    // 開始鬧鐘
    startTime(context) {
      if (context.state.timerState === "pause") {
        context.state.timer = setInterval(() => {
          context.commit("tickTime", this);
        }, 1000);
        context.state.timerState = "play";
      } else {
        clearInterval(context.state.timer);
        context.state.timerState = "pause";
      }
    }
  },
  getters: {
    // 尚未完成成T todo-list
    todos(state) {
      return state.todoList.filter(item => !item.isDone);
    },
    // 已完成  todo-list
    done(state) {
      return state.todoList.filter(item => item.isDone);
    },
    // 工作中 todo
    doing(state) {
      return state.todoList.find(item => {
        return item.id === state.todoId;
      });
    },
    // 首頁 精選 todo-list
    homelist(state, getters) {
      return getters.todos
        .filter((item, idx, arr) => {
          return arr.length - idx <= 3 && item.id !== state.todoId;
        })
        .reverse();
    },
    // 計時 分
    min(state) {
      return Math.floor(state.time / 60);
    },
    // 計時 秒
    sec(state) {
      if (Math.ceil(state.time % 60).toString().length < 2) {
        return "0" + Math.ceil(state.time % 60);
      } else {
        return Math.ceil(state.time % 60);
      }
    },
    // 進度條
    progress(state) {
      if (state.workState === "work") {
        return state.time / state.workTime;
      } else {
        return state.time / state.breakTime;
      }
    },
    workAlarm(state) {
      if (state.alarmWorkId) {
        return state.alarmList.find(item => {
          return item.id === state.alarmWorkId;
        }).src;
      } else return "";
    },
    breakAlarm(state) {
      if (state.alarmBreakId) {
        return state.alarmList.find(item => {
          return item.id === state.alarmBreakId;
        }).src;
      } else return "";
    },
    tomatosToday(state) {
      let tomatos = 0;
      const todayList = state.todoList.filter(item => {
        let now = moment();
        let date = moment.unix(item.id);
        let days = now.diff(date, "days");
        return days === 0;
      });
      todayList.forEach(item => {
        tomatos += item.tomatos;
      });
      return tomatos;
    },
    tomatosWeek(state) {
      let tomatos = 0;
      const todayList = state.todoList.filter(item => {
        let now = moment();
        let date = moment.unix(item.id);
        let days = now.diff(date, "days");
        return days <= 7;
      });
      todayList.forEach(item => {
        tomatos += item.tomatos;
      });
      return tomatos;
    },
    tomatosChart(state) {
      let tomatos = [
        {
          day: moment()
            .subtract(6, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(5, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(4, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(3, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(2, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(1, "days")
            .format("M/D"),
          tomatos: 0
        },
        { day: moment().format("M/D"), tomatos: 0 }
      ];
      for (let i = 0; i < 7; i++) {
        let list = state.todoList.filter(item => {
          let now = moment();
          let date = moment.unix(item.id);
          let days = now.diff(date, "days");
          return days === i;
        });
        list.forEach(item => {
          tomatos[6 - i].tomatos += item.tomatos;
        });
      }
      return tomatos;
    }
  }
});
