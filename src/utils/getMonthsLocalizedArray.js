// https://stackoverflow.com/a/21748457
export default function getMonthsLocalizedArray (locale) {
  var result = []
  for (var i = 0; i < 12; i++) {
    result.push(new Date(2010, i).toLocaleString(locale, {month: 'long'}))
  }
  return result
}
