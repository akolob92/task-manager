export class Task {
  id?: number;
  header?: string;
  description?: string;
  date: string;
  closed: boolean;
  position?: number;

  constructor(data: { id?, header?, date, description?, closed, position? }) {
    this.save(data);
  }

  isComing() {
    if (this.isClosed()) {
      return false;
    }
    const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;
    const diff = ((new Date(this.date)).valueOf() - (new Date()).valueOf());
    return diff > 0 && diff < threeDaysInMs;
  }

  isExpired() {
    return !this.isClosed() && (new Date(this.date)).valueOf() < (new Date()).valueOf();
  }

  isClosed() {
    return this.closed;
  }

  toggle() {
    this.closed = !this.closed;
  }

  save(data: { id?, header?, date, description?, closed, position? }) {
    this.id = data.id;
    this.header = data.header;
    this.date = data.date;
    this.description = data.description;
    this.closed = data.closed;
    this.position = data.position;
  }
}
