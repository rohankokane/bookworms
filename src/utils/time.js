export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(
    date
  )
function timeStr(val, period) {
  if (val === 1) return `${val} ${period} ago`
  else return `${val} ${period}s ago`
}
// new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(new Date("2022-07-04T15:48:41.848Z"))
export function timeSince(date) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  )

  let interval = seconds / 31536000

  if (interval > 1) {
    return timeStr(Math.floor(interval), 'year')
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return timeStr(Math.floor(interval), 'month')
  }
  interval = seconds / 86400
  if (interval > 1) {
    return timeStr(Math.floor(interval), 'day')
  }
  interval = seconds / 3600
  if (interval > 1) {
    return timeStr(Math.floor(interval), 'hr')
  }
  interval = seconds / 60
  if (interval > 1) {
    return timeStr(Math.floor(interval), 'min')
  }
  if (seconds === 0) return 'now'
  return Math.floor(seconds) + ' sec ago'
}
