function fritteVote() {
    set=false
    window.addEventListener('hashchange', async (e) => {
        if ((window.location.href.includes('web#cids=1&home=') || window.location.href.includes('web#cids=1,2&home=') )&& !set) {
            set=true
            // await waitUtilLoaded()
            var uri = `#fritte`
            document.getElementsByClassName('o_apps')[0].innerHTML += `<a href="${uri}" class="o_app o_menuitem"><div style="background-image: url(https://i.imgur.com/ynfhFIS.png);" class="o_app_icon"></div><div class="o_caption">Frites</div></a>`
        }
        if (window.location.href.includes('web#fritte')) {
            document.getElementsByClassName('o_home_menu')[0].innerHTML = ''
            document.getElementsByClassName('o_home_menu')[0].setAttribute("id", "ou-fritte");
            document.getElementById('ou-fritte').className = ''
            document.getElementsByClassName('o_main_navbar')[0].innerHTML += `<a onclick="window.location.href='./web'" class="fa o_menu_toggle fa-th" title="Applications"></a>`
            document.getElementById('ou-fritte').innerHTML += `
            <div class="vote">
                <h1>Voter</h1>
            </div>
            <div class="choose">
                <h1>Bouffe</h1>
                <input type="text" id="ou-fritte-name" placeholder="Ton Nom">
                <br>
                <textarea id="ou-fritte-bouffe-ta"></textarea>
                <br>
                <button id="ou-fritte-envoyer">Envoyer</button>
                <div>
                    <table id="ou-fritte-table">
                        <tr>
                            <th>Nom</th>
                            <th>Bouffe</th>
                        </tr>
                    </table>
                </div>
            </div>
            `
            var fData = await db.collection("fritte").doc("bouffe").get()
            console.log(fData.data())
            fData.data().choice.forEach(e => {
                console.log(e)
                document.getElementById('ou-fritte-table').innerHTML += `
                <tr>
                    <td>${e.name}</td>
                    <td>${e.bouffe}</td>
                </tr>
                `
            })
            document.getElementById('ou-fritte-envoyer').addEventListener('click', async (e) => {
                var bigData = await db.collection("fritte").doc("bouffe").get()
                bigData.data().choice.push({
                    name: document.getElementById('ou-fritte-name').value,
                    bouffe: document.getElementById('ou-fritte-bouffe-ta').value
                })
                db.collection("fritte").doc("bouffe").set({
                    choice: bigData.data().choice
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            })
        }
    })
}