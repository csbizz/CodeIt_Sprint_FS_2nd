import secondsToHMS from './secToHMS.js';

export default function compareExp(exp) {
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > exp) {
    throw new Error('expired Token');
  } else {
    // NOTE 남은 시간(초단위)
    const timeRemaining = exp - currentTime;
    console.log('🚀 ~ compareExp ~ timeRemaining:', timeRemaining);
    console.log('🚀 ~ compareExp ~ secondsToHMS(timeRemaining):', secondsToHMS(timeRemaining));

    return timeRemaining;
  }
}
