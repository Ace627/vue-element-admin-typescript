<template>
  <div class="app-content">
    <!-- 日期卡片 2x2 -->
    <div class="calendar-card">
      <div class="calendar-date flex-center">{{ dateFormat.split('-').at(0) }}年{{ dateFormat.split('-').at(1) }}月</div>
      <div class="calendar-day mt-10px">{{ dateFormat.split('-')[2].split(' ')[0] }}</div>
      <div class="calendar-week1 flex-center my-10px">
        <div>第{{ currentDay }}天</div>
        <div class="ml-4px">第{{ currentWeek }}周</div>
      </div>
      <div class="calendar-week2 flex-center">
        <div>{{ currentLunarMonth }}月{{ currentLunarDay }}</div>
        <div class="ml-4px">{{ currentDayOfWeek }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import { Lunar } from 'lunar-typescript'

/** 获取当前时间 */
const now = useNow()
/** 格式化当前时间 */
const dateFormat = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss:SSS')
/** 格式化当前时间 阴历 */
const lunarDateFormat = computed(() => Lunar.fromDate(new Date(now.value)))

/** 计算当前日期是第几周 */
function getWeekNumber(date: Date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1) // 当年的第一天
  const pastDays = (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000) // 距离第一天的天数
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7) // 计算周数
}

/** 计算日期是一年中的第几天 */
function getDayOfYear(date: Date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1) // 当年的第一天
  const pastDays = (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000) // 距离第一天的天数
  return Math.ceil(pastDays) // 向上取整并加上第一天
}

/** 获取星期几 */
function getDayOfWeek(date: Date) {
  const daysOfWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const dayIndex = date.getDay() // 获取星期几，0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return daysOfWeek[dayIndex] // 根据索引返回对应的星期名称
}

// 响应式计算当前第几周
const currentDay = computed(() => getDayOfYear(now.value))
const currentWeek = computed(() => getWeekNumber(now.value))
const currentDayOfWeek = computed(() => getDayOfWeek(now.value))
const currentLunarDay = computed(() => lunarDateFormat.value.getDayInChinese())
const currentLunarMonth = computed(() => lunarDateFormat.value.getMonthInChinese())
</script>

<style lang="scss" scoped>
.calendar-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: center;
  width: 160px;
  height: 160px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  .calendar-date {
    width: 100%;
    height: 40px;
    color: #fff;
    background-color: #fe5668;
  }
  .calendar-day {
    font-size: 44px;
  }
  .calendar-week1 {
    font-size: 14px;
    color: #9e9ea7;
  }
  .calendar-week2 {
    color: #000;
    font-size: 14px;
  }
}
</style>
