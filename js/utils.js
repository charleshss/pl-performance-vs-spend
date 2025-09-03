/**
 * Utility functions and shared constants
 */

const margin = { top: 50, right: 20, bottom: 60, left: 80 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const teamColors = {
    'Arsenal': '#EF0107',
    'Aston Villa': '#670E36',
    'Barnsley': '#E31613',
    'Birmingham City': '#0000FF',
    'Blackburn': '#009EE0',
    'Blackpool': '#FF9900',
    'Bolton': '#0000FF',
    'Bournemouth': '#DA291C',
    'Bradford City': '#A12830',
    'Brentford': '#e30613',
    'Brighton': '#0057B8',
    'Burnley': '#6C1D45',
    'Cardiff City': '#0070B5',
    'Charlton Ath': '#CE1C24',
    'Chelsea': '#034694',
    'Coventry City': '#6CB4EE',
    'Crystal Palace': '#1B458F',
    'Derby County': '#000000',
    'Everton': '#003399',
    'Fulham': '#FFFFFF',
    'Huddersfield': '#0E63AD',
    'Hull City': '#F5A12D',
    'Ipswich Town': '#0044A9',
    'Leeds United': '#FFFFFF',
    'Leicester City': '#003090',
    'Liverpool': '#C8102E',
    'Luton Town': '#F78F1E',
    'Manchester City': '#6CABDD',
    'Manchester Utd': '#DA291C',
    'Middlesbrough': '#E21A23',
    'Newcastle Utd': '#241F20',
    'Norwich City': '#FFF200',
    'Nottingham Forest': '#DD0000',
    'Oldham Athletic': '#004899',
    'Portsmouth': '#001489',
    'QPR': '#005CAB',
    'Reading': '#004494',
    'Sheffield Utd': '#EE2737',
    'Sheffield Weds': '#0070B5',
    'Southampton': '#D71920',
    'Stoke City': '#E03A3E',
    'Sunderland': '#EB172B',
    'Swansea City': '#FFFFFF',
    'Swindon Town': '#E21C2D',
    'Tottenham': '#132257',
    'Watford': '#FBEE23',
    'West Brom': '#122F67',
    'West Ham': '#7A263A',
    'Wigan Athletic': '#009BDE',
    'Wimbledon': '#0E0C7E',
    'Wolves': '#FDB913'
};

// Teams that need dark text due to light backgrounds
const lightBgTeams = ['Fulham', 'Leeds United', 'Norwich City', 'Swansea City', 'Watford'];

const teamMapping = {
    // Arsenal
    "Arsenal": "Arsenal",
    "Arsenal FC": "Arsenal",

    // Aston Villa
    "Aston Villa": "Aston Villa",
    "Aston Villa FC": "Aston Villa",

    // Barnsley
    "Barnsley": "Barnsley",
    "Barnsley FC": "Barnsley",

    // Birmingham City
    "Birmingham": "Birmingham City",
    "Birmingham City": "Birmingham City",
    "Birmingham City FC": "Birmingham City",

    // Blackburn
    "Blackburn": "Blackburn",
    "Blackburn Rovers": "Blackburn",
    "Blackburn Rovers FC": "Blackburn",

    // Blackpool
    "Blackpool": "Blackpool",
    "Blackpool FC": "Blackpool",

    // Bolton
    "Bolton": "Bolton",
    "Bolton Wanderers": "Bolton",
    "Bolton Wanderers FC": "Bolton",

    // Bournemouth
    "Bournemouth": "Bournemouth",
    "AFC Bournemouth": "Bournemouth",

    // Bradford City
    "Bradford": "Bradford City",
    "Bradford City": "Bradford City",
    "Bradford City AFC": "Bradford City",

    // Brentford
    "Brentford": "Brentford",
    "Brentford FC": "Brentford",

    // Brighton
    "Brighton": "Brighton",
    "Brighton & Hove Albion": "Brighton",
    "Brighton & Hove Albion FC": "Brighton",

    // Burnley
    "Burnley": "Burnley",
    "Burnley FC": "Burnley",

    // Cardiff City
    "Cardiff": "Cardiff City",
    "Cardiff City": "Cardiff City",
    "Cardiff City FC": "Cardiff City",

    // Charlton Athletic
    "Charlton": "Charlton Ath",
    "Charlton Athletic": "Charlton Ath",
    "Charlton Athletic FC": "Charlton Ath",

    // Chelsea
    "Chelsea": "Chelsea",
    "Chelsea FC": "Chelsea",

    // Coventry City
    "Coventry": "Coventry City",
    "Coventry City": "Coventry City",
    "Coventry City FC": "Coventry City",

    // Crystal Palace
    "Crystal Palace": "Crystal Palace",
    "Crystal Palace FC": "Crystal Palace",

    // Derby County
    "Derby": "Derby County",
    "Derby County": "Derby County",
    "Derby County FC": "Derby County",

    // Everton
    "Everton": "Everton",
    "Everton FC": "Everton",

    // Fulham
    "Fulham": "Fulham",
    "Fulham FC": "Fulham",

    // Huddersfield
    "Huddersfield": "Huddersfield",
    "Huddersfield Town": "Huddersfield",
    "Huddersfield Town AFC": "Huddersfield",

    // Hull City
    "Hull": "Hull City",
    "Hull City": "Hull City",
    "Hull City AFC": "Hull City",

    // Ipswich Town
    "Ipswich": "Ipswich Town",
    "Ipswich Town": "Ipswich Town",
    "Ipswich Town FC": "Ipswich Town",

    // Leeds United
    "Leeds": "Leeds United",
    "Leeds United": "Leeds United",
    "Leeds United FC": "Leeds United",

    // Leicester City
    "Leicester": "Leicester City",
    "Leicester City": "Leicester City",
    "Leicester City FC": "Leicester City",

    // Liverpool
    "Liverpool": "Liverpool",
    "Liverpool FC": "Liverpool",

    // Luton Town
    "Luton": "Luton Town",
    "Luton Town": "Luton Town",
    "Luton Town FC": "Luton Town",

    // Manchester City
    "Man City": "Manchester City",
    "Manchester City": "Manchester City",
    "Manchester City FC": "Manchester City",

    // Manchester United
    "Man Utd": "Manchester Utd",
    "Manchester United": "Manchester Utd",
    "Manchester United FC": "Manchester Utd",

    // Middlesbrough
    "Middlesbrough": "Middlesbrough",
    "Middlesbrough FC": "Middlesbrough",

    // Newcastle United
    "Newcastle": "Newcastle Utd",
    "Newcastle United": "Newcastle Utd",
    "Newcastle United FC": "Newcastle Utd",

    // Norwich City
    "Norwich": "Norwich City",
    "Norwich City": "Norwich City",
    "Norwich City FC": "Norwich City",

    // Nottingham Forest
    "Nottingham Forest": "Nottingham Forest",
    "Nottingham Forest FC": "Nottingham Forest",
    "Nottm Forest": "Nottingham Forest",

    // Oldham Athletic
    "Oldham": "Oldham Athletic",
    "Oldham Athletic": "Oldham Athletic",
    "Oldham Athletic AFC": "Oldham Athletic",

    // Portsmouth
    "Portsmouth": "Portsmouth",
    "Portsmouth FC": "Portsmouth",

    // QPR
    "QPR": "QPR",
    "Queens Park Rangers": "QPR",
    "Queens Park Rangers FC": "QPR",

    // Reading
    "Reading": "Reading",
    "Reading FC": "Reading",

    // Sheffield United
    "Sheffield United": "Sheffield Utd",
    "Sheffield United FC": "Sheffield Utd",
    "Sheff Utd": "Sheffield Utd",

    // Sheffield Wednesday
    "Sheffield Wednesday": "Sheffield Weds",
    "Sheffield Wednesday FC": "Sheffield Weds",
    "Sheff Wed": "Sheffield Weds",

    // Southampton
    "Southampton": "Southampton",
    "Southampton FC": "Southampton",

    // Stoke City
    "Stoke": "Stoke City",
    "Stoke City": "Stoke City",
    "Stoke City FC": "Stoke City",

    // Sunderland
    "Sunderland": "Sunderland",
    "Sunderland AFC": "Sunderland",

    // Swansea City
    "Swansea": "Swansea City",
    "Swansea City": "Swansea City",
    "Swansea City AFC": "Swansea City",

    // Swindon Town
    "Swindon": "Swindon Town",
    "Swindon Town": "Swindon Town",
    "Swindon Town FC": "Swindon Town",

    // Tottenham
    "Tottenham": "Tottenham",
    "Tottenham Hotspur": "Tottenham",
    "Tottenham Hotspur FC": "Tottenham",
    "Spurs": "Tottenham",

    // Watford
    "Watford": "Watford",
    "Watford FC": "Watford",

    // West Brom
    "West Brom": "West Brom",
    "West Bromwich": "West Brom",
    "West Bromwich Albion": "West Brom",
    "West Bromwich Albion FC": "West Brom",

    // West Ham
    "West Ham": "West Ham",
    "West Ham United": "West Ham",
    "West Ham United FC": "West Ham",

    // Wigan Athletic
    "Wigan": "Wigan Athletic",
    "Wigan Athletic": "Wigan Athletic",
    "Wigan Athletic FC": "Wigan Athletic",

    // Wimbledon
    "Wimbledon": "Wimbledon",
    "Wimbledon FC": "Wimbledon",
    "AFC Wimbledon": "Wimbledon",

    // Wolves
    "Wolves": "Wolves",
    "Wolverhampton": "Wolves",
    "Wolverhampton Wanderers": "Wolves",
    "Wolverhampton Wanderers FC": "Wolves"
};

function findPLTeamName(transferTeam) {
    return teamMapping[transferTeam] || null;
}

function formatSeason(endYear) {
    return `${endYear - 1}/${endYear}`;
}

function parseTransferSeason(seasonStr) {
    if (!seasonStr) return null;

    const parts = seasonStr.split('/');
    if (parts.length === 2) {
        // Handle formats like "15/16" or "2015/2016"
        if (parts[1].length === 2) {
            return 2000 + parseInt(parts[1]);
        } else if (parts[1].length === 4) {
            return parseInt(parts[1]);
        }
    }
    return null;
}

function getOrdinal(n) {
    const num = Math.round(Number(n));
    if (num % 100 >= 11 && num % 100 <= 13) return `${num}th`;

    switch (num % 10) {
        case 1: return `${num}st`;
        case 2: return `${num}nd`;
        case 3: return `${num}rd`;
        default: return `${num}th`;
    }
}