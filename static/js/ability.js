/* eslint-disable */
function populateTechniques(parentId, abilities) {
    let parent = $('#'+parentId);
    $(parent).find('#ability-technique-filter').empty().append("<option disabled='disabled' selected>Choose a technique</option>");

    let tactic = $(parent).find('#ability-tactic-filter').find(':selected').data('tactic');
    let found = [];
    abilities.forEach(function(ability) {
        if (ability.tactic.includes(tactic) && !found.includes(ability.technique_id)) {
            found.push(ability.technique_id);
            appendTechniqueToList(parentId, tactic, ability);
        }
    });
}

/**
 * Populate the abilities dropdown based on selected technique
 * @param {string} parentId - Parent ID used to search for dropdowns
 * @param {object[]} abilities - Abilities object array
 */
function populateAbilities(parentId, abilities) {
    let parent = $('#' + parentId);

    // Collect abilities matching technique
    let techniqueAbilities = [];
    let attack_id = $(parent).find('#ability-technique-filter').find(':selected').data('technique');
    abilities.forEach(function (ability) {
        if (ability.technique_id === attack_id) {
            techniqueAbilities.push(ability);
        }
    });

    // Clear, then populate the ability dropdown
    $(parent).find('#ability-ability-filter').empty().append('<option disabled="disabled" selected>' + techniqueAbilities.length + ' abilities</option>');
    techniqueAbilities.forEach(function (ability) {
        appendAbilityToList(parentId, ability);
    });
}

function appendTechniqueToList(parentId, tactic, value) {
    $('#'+parentId).find('#ability-technique-filter').append($("<option></option>")
        .attr("value", value['technique_id'])
        .data("technique", value['technique_id'])
        .text(value['technique_id'] + ' | '+ value['technique_name']));
}

function appendAbilityToList(parentId, value) {
    $('#'+parentId).find('#ability-ability-filter').append($("<option></option>")
        .attr("value", value['name'])
        .data("ability", value)
        .text(value['name']));
}

function searchAbilities(parent, abilities){
    let pElem = $('#'+parent);
    pElem.find('#ability-technique-filter').empty().append("<option disabled='disabled' selected>All Techniques</option>");;
    let abList = pElem.find('#ability-ability-filter');
    abList.empty();
    let val = pElem.find('#ability-search-filter').val().toLowerCase();
    let added = [];
    if (val) {
        abilities.forEach(function(ab) {
            let commandHasSearch = false;
            ab['executors'].forEach(function(executor) {
                if (executor['command'] != null && executor['command'].toLowerCase().includes(val)) {
                    commandHasSearch = true;
                }
            });

            let nameHasSearch = ab['name'].toLowerCase().includes(val);
            let descriptionHasSearch = ab['description'].toLowerCase().includes(val);
            if ((nameHasSearch || descriptionHasSearch || commandHasSearch) && !added.includes(ab['ability_id'])) {
                added.push(ab['ability_id']);
                appendAbilityToList(parent, ab);
            }
        });
    }
    abList.prepend("<option disabled='disabled' selected>"+added.length+" abilities</option>");
}
