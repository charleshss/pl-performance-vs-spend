/**
 * Main application logic and initialisation
 */
const loadingElement = document.getElementById('loading');
const startSeasonSelect = document.getElementById('start-season');
const endSeasonSelect = document.getElementById('end-season');
const updateButton = document.getElementById('update-btn');

const DEFAULT_START_SEASON = '2014';
const DEFAULT_END_SEASON = '2024';

function initialiseApp() {
    initialiseVisualisation();
    initialiseTeamDetailsPanel();

    loadData().then(success => {
        if (success) {
            populateSeasonDropdowns();

            startSeasonSelect.value = DEFAULT_START_SEASON;
            endSeasonSelect.value = DEFAULT_END_SEASON;

            createVisualisation(DEFAULT_START_SEASON, DEFAULT_END_SEASON);

            updateButton.addEventListener('click', handleUpdateClick);
        }
    });
}

function populateSeasonDropdowns() {
    // Get all unique seasons from the data
    const seasons = [...new Set(plTables.map(d => d.season_end_year))].sort();

    startSeasonSelect.innerHTML = '';
    endSeasonSelect.innerHTML = '';

    seasons.forEach(season => {
        const formattedSeason = formatSeason(season);

        const startOption = document.createElement('option');
        startOption.value = season;
        startOption.textContent = formattedSeason;
        startSeasonSelect.appendChild(startOption);

        const endOption = document.createElement('option');
        endOption.value = season;
        endOption.textContent = formattedSeason;
        endSeasonSelect.appendChild(endOption);
    });
}

function handleUpdateClick() {
    const startSeason = startSeasonSelect.value;
    const endSeason = endSeasonSelect.value;

    if (+startSeason > +endSeason) {
        alert('Start season cannot be later than end season.');
        return;
    }

    loadingElement.style.display = 'block';

    // Use setTimeout to ensure the loading indicator is shown
    setTimeout(() => {
        createVisualisation(startSeason, endSeason);
        loadingElement.style.display = 'none';
    }, 10);
}

// Initialise the application when document is ready
document.addEventListener('DOMContentLoaded', initialiseApp);