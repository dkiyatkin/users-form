export default function getLastMonthDay (month, year) {
  return new Date(year || 2017, month || 1, 0).getDate()
}
