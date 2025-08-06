function timeAgo(input) {
  let timestamp;

  if (typeof input === "string") {
    timestamp = new Date(input).getTime();
  } else if (typeof input === "number") {
    // If it's in seconds (10 digits), convert to ms
    timestamp = input.toString().length === 10 ? input * 1000 : input;
  } else if (input instanceof Date) {
    timestamp = input.getTime();
  } else {
    throw new Error("Invalid input for timeAgo function.");
  }

  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24)   return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 7)     return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (weeks < 4)    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  if (months < 12)  return `${months} month${months !== 1 ? 's' : ''} ago`;
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}
export{timeAgo}