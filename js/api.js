const base_url = "https://api.football-data.org/v2/";
const token = "6fa1ee6a8e9149d1ad2fd9a898e57dca";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getClassement() {
  if ("caches" in window) {
    caches.match(base_url + "/competitions/2021/standings").then((response) => {
      if (response) {
        response.json()
          .then((data) => {
            let classementHTML = "";
            data.standings[0].table.forEach((standing) => {
              classementHTML += `
                <tr>
                  <td>${standing.position}</td>
                  <td>
                    <img src="${standing.team.crestUrl}" width="100">
                  </td>
                  <td>${standing.team.name}</td>
                  <td>${standing.won}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.playedGames}</td>
                  <td>${standing.points}</td>
                </tr>
                    `;
            });
            document.getElementById("classement").innerHTML = classementHTML;
          })
      }
    })
  }

  fetch(base_url + "/competitions/2021/standings", {
    method: "GET",
    headers: {
      "X-Auth-Token": token
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      let classementHTML = "";
      data.standings[0].table.forEach((standing) => {
        classementHTML += `
            <tr>
                <td>${standing.position}</td>
                <td>
                  <img src="${standing.team.crestUrl}" width="100">
                </td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.lost}</td>
                <td>${standing.playedGames}</td>
                <td>${standing.points}</td>
            </tr>
                `;
      });
      document.getElementById("classement").innerHTML = classementHTML;
    })
    .catch(error);
};


function getAllTeam() {
  if ("caches" in window) {
    caches.match(base_url + "teams").then((response) => {
      if (response) {
        response.json().then((data) => {
          let allTeamHTML = "";
          data.teams.forEach((team) => {
            allTeamHTML += `
        <div class="col m4">
          <div class="card medium">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${team.crestUrl}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${team.name}</span>               
              <a href="./teamDetail.html?id=${team.id}">See More</a>      
            </div>
          </div>
        </div>`;
          });
          document.getElementById("allTeam").innerHTML = allTeamHTML;
        })
      }
    })
  }

  fetch(base_url + "teams", {
    method: "GET",
    headers: {
      "X-Auth-Token": token
    }
  })
    .then(status)
    .then(json)
    .then(data => {
      let allTeamHTML = "";
      data.teams.forEach((team) => {
        allTeamHTML += `
          <div class="col m4">
            <div class="card medium">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${team.crestUrl}">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${team.name}</span>               
                <a href="./teamDetail.html?id=${team.id}">See More</a>      
              </div>
            </div>
          </div>`;
      });
      document.getElementById("allTeam").innerHTML = allTeamHTML;
    })
    .catch(error)
}

function getTeamById() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${base_url}/teams/${idParams}`)
        .then((response) => {
          if (response) {
            response.json()
              .then((data) => {
                let teamDetailHTML = `
                  <div class="col m8">
                    <h2 class="header">${data.name}</h2>
                    <div class="card horizontal">
                      <div class="card-stacked">
                        <div class="card-content">
                          <h4>More Info</h4>
                          <div>
                            <ul>
                              <li>Short Name: ${data.shortName}</li>
                              <li>Founded: ${data.founded}</li>
                              <li>Venue: ${data.venue}</li>
                              <li>Phone Number: ${data.phone}</li>
                              <li><a href="${data.website}" target="_blank">Go to website ${data.website}</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="card-image">
                        <img src="${data.crestUrl}">
                      </div>
                    </div>
                  </div>
                  `;
                document.getElementById("team").innerHTML = teamDetailHTML;
                resolve(data)
              })
          }
        })
    }

    fetch(`${base_url}/teams/${idParams}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": token
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        console.log(data);
        let teamDetailHTML = `
        <div class="col m8">
          <h2 class="header">${data.name}</h2>
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content">
                <h4>More Info</h4>
                <div>
                  <ul>
                    <li>Short Name: ${data.shortName}</li>
                    <li>Founded: ${data.founded}</li>
                    <li>Venue: ${data.venue}</li>
                    <li>Phone Number: ${data.phone}</li>
                    <li><a href="${data.website}" target="_blank">Go to website ${data.website}</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-image">
              <img src="${data.crestUrl}">
            </div>
          </div>
        </div>
        `;
        document.getElementById("team").innerHTML = teamDetailHTML;
        resolve(data);
      })
  })
}

function getSavedTeams() {
  getAll().then((teams) => {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    if (teams.length === 0) {
      teamsHTML = `
      <div class="col m8">
      <h2>No Saved Team</h2>
      </div>
      `;
      document.getElementById("body-content").innerHTML = teamsHTML;
    } else {
      let teamsHTML = "";
      teams.forEach((data) => {
        teamsHTML += `
        <div class="col m8">
          <h2 class="header">${data.name}</h2>
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content">
                <h4>More Info</h4>
                <div>
                  <ul>
                    <li>Phone Number: ${data.phone}</li>
                    <li>Email: ${data.email}</li>
                    <li><a href="${data.website}" target="_blank">Go to website ${data.website}</a></li>
                  </ul>
                    <button onclick="deleteTeamValidasi(${data.id})" class="waves-effect waves-light deep-orange accent-1 btn">Remove This Team</button>
                </div>
              </div>
            </div>
            <div class="card-image">
            <a href="./teamDetail.html?id=${data.id}&saved=true">
                <img src="${data.crestUrl}">
                </a>
              </div>
          </div>
        </div>
                  `;
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("body-content").innerHTML = teamsHTML;
      });
    }



  });
}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");


  getAll(idParam).then((teams) => {

    let teamsHTML = '';
    teams.forEach((data) => {
      console.log(data);
      teamsHTML = `
      <div class="col m8">
        <h2 class="header">${data.name}</h2>
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <h4>More Info</h4>
              <div>
                <ul>
                  <li>Phone Number: ${data.phone}</li>
                  <li>Email: ${data.email}</li>
                  <li><a href="${data.website}" target="_blank">Go to website ${data.website}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-image">
            <img src="${data.crestUrl}">
          </div>
        </div>
      </div>
                `;
    })
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("team").innerHTML = teamsHTML;
  });
}