export default class StatusEnum{
  constructor(){
    this.stages = {
      SCHEDULED:'SCHEDULED',
      TIMED:'TIMED',
      IN_PLAY: 'IN_PLAY',
      PAUSED: 'PAUSED',
      FINISHED: 'FINISHED',
      SUSPENDED:'SUSPENDED',
      POSTPONED: 'POSTPONED',
      CANCELLED: 'CANCELLED',
      AWARDED:'AWARDED'
    }
  }
}