import authEpics from './modules/auth';

export class EpicsRegistry {
  constructor() {
    this.emitChange = null;
    this.epics = [
      authEpics,
    ];
  }

  getEpics() {
    return [...this.epics];
  }

  register(epic) {
    this.epics = [...this.epics, epic];
    if (this.emitChange) {
      this.emitChange(this.getEpics());
    }
  }

  setChangeListener(listener) {
    this.emitChange = listener;
  }
}

const epicsRegistry = new EpicsRegistry();
export default epicsRegistry;
