let dbPromised = idb.open("all-about-football", 1, (upgradeDb) => {
  let articlesObjectStore = upgradeDb.createObjectStore("favTeams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then((db) => {
      const tx = db.transaction("favTeams", "readwrite");
      const store = tx.objectStore("favTeams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(() => {

      M.toast({ html: 'Team has been saved!', classes: 'deep-orange accent-1' });
      console.log("Detail team berhasil di simpan.");

    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("favTeams", "readonly");
        const store = tx.objectStore("favTeams");
        return store.getAll();
      })
      .then((favTeam) => {
        resolve(favTeam);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("favTeams", "readonly");
        const store = tx.objectStore("favTeams");
        return store.get(id);
      })
      .then((favTeam) => {
        resolve(favTeam);
      });
  });
}

function deleteTeam(teamId) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('favTeams', 'readwrite');
      const store = tx.objectStore('favTeams');
      store.delete(teamId);
      return tx.complete;
    }).then(() => {
      M.toast({ html: 'Team has been deleted!', classes: 'deep-orange accent-1' });
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Your team has been deleted');
        });
      }
      getSavedTeams();
    }).catch((err) => {
      console.error('Error: ', err);
    });
}

const deleteTeamValidasi = (teamId) => {
  const confirmation = confirm('Are you want to delete this team?');
  if (confirmation === true) {
    deleteTeam(teamId);
    console.log(`Team ID : ${teamId} has been deleted`);
  }
};