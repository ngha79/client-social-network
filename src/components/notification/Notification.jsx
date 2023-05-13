import noti from "../../assets/callvideosound.mp3";

export class NotificationSound {
  audio = new Audio(noti);

  playSound() {
    this.audio.play();
  }

  stopSound() {
    this.audio.pause();
  }
}
