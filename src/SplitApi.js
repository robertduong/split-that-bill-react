import { firebaseDb, ui as firebaseUi }  from './ApiHelper';
import Hashids from 'hashids';

const hashids = new Hashids("AIzaSyAn04oG-WxLMFRRx38rV58A6GEpSnYvBjgsplit-that-bill", 5, "abcdefghijklmnopqrstuvwxyz0123456789");

const SplitApi = {
  generateSessionId: () => {
    const sessionCounterRef = firebaseDb.ref('sessionCounter');
    return sessionCounterRef.transaction(counter => {
      if (counter) {
        counter += 1;
      }
      return counter;
    }).then((result) => {
      if (result.committed) {
        const counter = result.snapshot.val();
        const hashId = hashids.encode(counter);
        return hashId;
      }
    })
  },
  createSession: (sessionId, hostId) => {
    const membersRef = firebaseDb.ref('/members');
    const membersIndex = membersRef.push();
    membersRef.update({
      [sessionId]: {
        [membersIndex.key]: hostId
      }
    });

    const sessionsRef = firebaseDb.ref('/sessions');
    sessionsRef.update({
      [sessionId]: {
        host: hostId
      }
    });

    const userSessionsRef = firebaseDb.ref('/users/' + hostId + '/sessions');
    const userSessionIndex = userSessionsRef.push();
    userSessionsRef.update({
      [userSessionIndex.key]: sessionId
    });
  },
  sessionExist: (sessionId) => {
    return this.getSession(sessionId).then(snapshot => {
      return snapshot == null;
    });
  },
  getSession: (sessionId) => {
    if (sessionId == null || sessionId === "") {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    } else {
      const sessionRef = firebaseDb.ref('/sessions/' + sessionId);
      return sessionRef.once('value').then((snapshot) => {
        return snapshot.val();
      });
    }
  },
  stopGetMembers: (sessionId) => {
    firebaseDb.ref('/members/' + sessionId).off();
  },
  getMembersOnChange: (sessionId, callback) => {
    const membersRef = firebaseDb.ref('/members/' + sessionId);
    membersRef.on('value', snapshot => {
      const val = snapshot.val();
      const members = []
      for (var p in val) {
        members.push(val[p]);
      }

      callback(members);
    });
  },
  createUser: (userId, name, email) => {
    const userRef = firebaseDb.ref('users/'+userId);
    userRef.update({
      name: name,
      email: email
    });
  },
  getUser: (userId) => {
    const userRef = firebaseDb.ref('users/' + userId + '/name');
    return userRef.once('value').then((snapshot) => {
        console.log("fetched "+snapshot.val());
        return { id: userId, name: snapshot.val() };
      }
    );
  },
  addUserToSession: (userId, sessionId) => {
    const membersRef = firebaseDb.ref('members/' + sessionId);
    const membersIndex = membersRef.push();
    membersRef.update({
      [membersIndex.key]: userId
    });

    const usersRef = firebaseDb.ref('users/' + userId + '/sessions');
    const usersIndex = usersRef.push();
    usersRef.update({
      [usersIndex.key]: sessionId
    });
  },
  getHost: (sessionId) => {
    const sessionRef = firebaseDb.ref('sessions/' + sessionId + '/host');
    return sessionRef.once('value').then(snapshot => {
      return snapshot.val(); 
    });
  },
}; 

export default SplitApi;
