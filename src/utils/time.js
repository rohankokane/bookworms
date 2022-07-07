export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(
    date
  )
// new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(new Date("2022-07-04T15:48:41.848Z"))
export function timeSince(date) {
  const seconds = Math.floor((new Date().valueOf() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hr ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' min ago'
  }
  if (seconds === 0) return 'now'
  return Math.floor(seconds) + ' sec ago'
}
