async function hideUnkownProducts() {
    set=false
    window.addEventListener('hashchange', async () => {
        if (window.location.hash.includes('action=350') && window.location.hash.includes('view_type=kanban')) {
            await waitUtilLoaded()
            if (!set) {
                document.getElementsByClassName('o_search_options')[0].innerHTML += `
                <div id="ou-hidezeros" class="btn-group o_dropdown o_group_by_menu"><button type="button" aria-expanded="false" tabindex="-1" class="o_dropdown_toggler_btn btn btn-secondary" data-form-type=""><i class="fa fa-eye"></i><span class="o_dropdown_title">Hide Zeros</span></button></div>
                `
                set=true
                document.getElementById('ou-hidezeros').addEventListener('click', function(e) {
                    var productCont = document.getElementsByClassName('o_kanban_ungrouped')[0].childNodes
                    for(i=0; i < productCont.length; i++) {
                        try {
                            if (parseInt(productCont[i].querySelector('span[name="lst_price"]').innerText) == 0) {
                                productCont[i].style.display = 'none';
                            }
                        } catch (error) {
                                
                        }
                    }
                })
            }
        }
    })
}