export class DailyScheduler {
  constructor(callback, hour = 12, minute = 0) {
    this.callback = callback;
    this.hour = hour;
    this.minute = minute;
    this.intervalId = null;
  }

  start() {
    // Check every minute if it's the scheduled time
    this.intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      if (hours === this.hour && minutes === this.minute) {
        this.callback();
      }
    }, 60000); // Check every minute
    
    console.log(`Daily scheduler started. Will save at ${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')} daily.`);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Daily scheduler stopped.');
    }
  }

  // Manually trigger the save (for testing)
  async triggerNow() {
    await this.callback();
  }
}
