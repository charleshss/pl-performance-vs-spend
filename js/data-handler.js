/**
 * Data loading and processing functions using d3
 */

// Global variables for storing data
let plTables = [];
let transfersData = [];

function loadData() {

    document.getElementById('loading').style.display = 'block';
    
    return Promise.all([
        d3.csv("data/pl-tables-1993-2024.csv"),
        d3.csv("data/transfers.csv")
    ]).then(([tables, transfers]) => {
        // Process PL tables
        tables.forEach(d => {
            d.points = +d.points;
            d.season_end_year = +d.season_end_year;
            d.position = +d.position;
            d.played = +d.played;
            d.won = +d.won;
            d.drawn = +d.drawn;
            d.lost = +d.lost;
            d.gf = +d.gf;
            d.ga = +d.ga;
            d.gd = +d.gd;
        });
        
        plTables = tables;
        
        // Process transfers
        transfers.forEach(d => {
            d.transfer_fee = +d.transfer_fee || 0;
            d.market_value_in_eur = +d.market_value_in_eur || 0;
            d.season_end_year = parseTransferSeason(d.transfer_season);
        });
        
        transfersData = transfers;
        
        document.getElementById('loading').style.display = 'none';
        
        return true;
    }).catch(error => {
        console.error('Error loading the data:', error);
        document.getElementById('loading').textContent = 'Error loading data. Please try refreshing the page.';
        return false;
    });
}

function getFilteredData(startSeason, endSeason) {
    const filteredTables = plTables.filter(t => {
        const seasonYear = +t.season_end_year;
        return seasonYear >= +startSeason && seasonYear <= +endSeason;
    });
    
    const teamData = {};
    const teamTransfers = {};

    filteredTables.forEach(t => {
        const key = t.team;

        if (!teamData[key]) {
            teamData[key] = {
                team: t.team,
                seasonDetails: [],
                totalPoints: 0,
                totalSeasons: 0,
                positionSum: 0,
                bestPosition: Infinity,
                worstPosition: 0,
                totalSpend: 0,
                goalDifferenceSum: 0
            };
        }

        const seasonDetail = {
            season: +t.season_end_year,
            points: +t.points,
            position: +t.position,
            gamesPlayed: +t.played,
            goalsFor: +t.gf,
            goalsAgainst: +t.ga,
            goalDifference: +t.gd
        };

        teamData[key].seasonDetails.push(seasonDetail);
        teamData[key].totalPoints += seasonDetail.points;
        teamData[key].totalSeasons++;
        teamData[key].positionSum += seasonDetail.position;
        teamData[key].goalDifferenceSum += seasonDetail.goalDifference;

        teamData[key].bestPosition = Math.min(teamData[key].bestPosition, seasonDetail.position);
        teamData[key].worstPosition = Math.max(teamData[key].worstPosition, seasonDetail.position);
    });

    // Filter transfers for the selected seasons
    const filteredTransfers = transfersData.filter(tr => {
        const transferSeason = parseTransferSeason(tr.transfer_season);
        return transferSeason >= +startSeason && transferSeason <= +endSeason;
    });

    // Process transfer data
    filteredTransfers.forEach(tr => {
        if (!tr.transfer_fee || +tr.transfer_fee <= 0) return;

        const toTeam = findPLTeamName(tr.to_club_name);
        const fromTeam = findPLTeamName(tr.from_club_name);

        // Process transfers in
        if (toTeam) {
            if (!teamTransfers[toTeam]) {
                teamTransfers[toTeam] = {
                    transfersIn: [],
                    transfersOut: [],
                    totalIn: 0,
                    totalOut: 0
                };
            }
            teamTransfers[toTeam].transfersIn.push({
                player: tr.player_name,
                fee: +tr.transfer_fee,
                from: tr.from_club_name,
                date: tr.transfer_date
            });
            teamTransfers[toTeam].totalIn += +tr.transfer_fee;
        }

        // Process transfers out
        if (fromTeam) {
            if (!teamTransfers[fromTeam]) {
                teamTransfers[fromTeam] = {
                    transfersIn: [],
                    transfersOut: [],
                    totalIn: 0,
                    totalOut: 0
                };
            }
            teamTransfers[fromTeam].transfersOut.push({
                player: tr.player_name,
                fee: +tr.transfer_fee,
                to: tr.to_club_name,
                date: tr.transfer_date
            });
            teamTransfers[fromTeam].totalOut += +tr.transfer_fee;
        }
    });

    // Prepare data for visualisation
    const data = Object.values(teamData)
        .filter(d => d.totalSeasons > 0)
        .map(team => {
            // Add transfer spend if available
            if (teamTransfers[team.team]) {
                team.totalSpend = teamTransfers[team.team].totalIn;
            }
            return team;
        });

    return {
        teamData: data,
        teamTransfers: teamTransfers
    };
}