<template>
  <!-- <div class="calendar-card">
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
  </div> -->
  <SmallCard :title="`${dateFormat.split('-').at(0)}年${dateFormat.split('-').at(1)}月`">
    <div class="flex-center h-full flex-col">
      <div class="text-44px">{{ dateFormat.split('-')[2].split(' ')[0] }}</div>
      <div class="calendar-week1 flex-center my-10px">
        <div>第{{ currentDay }}天</div>
        <div class="ml-4px">第{{ currentWeek }}周</div>
      </div>
      <div class="calendar-week2 flex-center">
        <div>{{ currentLunarMonth }}月{{ currentLunarDay }}</div>
        <div class="ml-4px">{{ currentDayOfWeek }}</div>
      </div>
    </div>
  </SmallCard>
</template>

<script setup lang="ts">
defineOptions({ name: 'CalendarCard' })
import { Lunar } from 'lunar-typescript'
import SmallCard from '../SmallCard/index.vue'

/** 获取当前时间 */
const now = useNow()
/** 格式化当前时间 */
const dateFormat = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss:SSS')
/** 格式化当前时间 阴历 */
const lunarDateFormat = computed(() => Lunar.fromDate(new Date(now.value)))

/** 计算当前日期是第几周 */
function getWeekNumber(date: Date) {
  // 创建一个复制的日期对象，避免修改原始日期
  const currentDate = new Date(date.getTime())
  // 设置当前日期为该年的第一天
  currentDate.setMonth(0, 1)
  currentDate.setHours(0, 0, 0, 0)
  // 计算当前日期和该年第一天之间的时间差
  const days = Math.floor((date.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000))
  // 获取当前年份的第几周
  const weekNumber = Math.ceil((days + currentDate.getDay() + 1) / 7)
  return weekNumber
}

/** 计算日期是一年中的第几天 */
function getDayOfYear(date: Date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1) // 当年的第一天
  const pastDays = (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000) // 距离第一天的天数
  return Math.ceil(pastDays) // 向上取整并加上第一天
}

/** 获取星期几 */
function getDayOfWeek(date: Date) {
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return daysOfWeek[date.getDay()]
}

// 响应式计算当前第几周
const currentDay = computed(() => getDayOfYear(now.value))
const currentWeek = computed(() => getWeekNumber(now.value))
const currentDayOfWeek = computed(() => getDayOfWeek(now.value))
const currentLunarDay = computed(() => lunarDateFormat.value.getDayInChinese())
const currentLunarMonth = computed(() => lunarDateFormat.value.getMonthInChinese())
</script>

<style lang="scss" scoped>
.calendar-week1 {
  font-size: 14px;
  color: var(--el-color-info-light-3);
}
.calendar-week2 {
  color: var(--el-text-color-primary);
  font-size: 14px;
}
</style>
