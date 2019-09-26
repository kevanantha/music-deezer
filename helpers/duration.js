const duration = secs => {
  const minutes = Math.floor(secs / 60)
  let seconds = secs - minutes * 60
  if (seconds < 10) seconds = seconds + '0'
  return `${minutes}:${seconds}`
}

module.exports = duration
