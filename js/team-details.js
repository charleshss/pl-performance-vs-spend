/**
 * Functions for managing team details panel and related visualisations
 */

// DOM elements
const detailsPanel = document.getElementById('detailsPanel');
const closePanel = document.getElementById('closePanel');
const teamNameEl = document.getElementById('teamName');
const teamStatsEl = document.getElementById('teamStats');
const doughnutChartEl = document.getElementById('doughnutChart');
const transfersTableBody = document.getElementById('transfersTableBody');

function initialiseTeamDetailsPanel() {
    closePanel.addEventListener('click', closeDetailsPanel);
}

function closeDetailsPanel() {
    detailsPanel.classList.remove('open');

    const transform = d3.zoomTransform(d3.select(".zoomable-content").node());

    d3.select("svg").selectAll("circle")
        .attr("r", 5 / transform.k)
        .attr("opacity", 0.7);
}

function openTeamDetailsPanel(teamData, transfers) {
    teamNameEl.textContent = teamData.team;

    const transferData = transfers || {
        transfersIn: [],
        transfersOut: [],
        totalIn: 0,
        totalOut: 0
    };

    // Calculate key metrics
    const avgPoints = teamData.totalPoints / teamData.totalSeasons;
    const avgPosition = teamData.positionSum / teamData.totalSeasons;
    const avgGoalDifference = teamData.goalDifferenceSum / teamData.totalSeasons;

    // Find highest and lowest point seasons
    const highestPointSeason = teamData.seasonDetails.reduce((highest, current) =>
        (current.points > highest.points) ? current : highest,
        teamData.seasonDetails[0]
    );

    const lowestPointSeason = teamData.seasonDetails.reduce((lowest, current) =>
        (current.points < lowest.points) ? current : lowest,
        teamData.seasonDetails[0]
    );

    // Prepare season details
    const sortedSeasonDetails = teamData.seasonDetails
        .sort((a, b) => b.season - a.season)
        .map(season =>
            `${season.season}: ${season.points} pts (${getOrdinal(season.position)} place) - GD: ${season.goalDifference}`
        )
        .join('<br>');

    // Populate team stats
    teamStatsEl.innerHTML = `
        <p><strong>Seasons:</strong> <span>${teamData.totalSeasons}</span></p>
        <p><strong>Total Points:</strong> <span>${teamData.totalPoints}</span></p>
        <p><strong>Avg Points per Season:</strong> <span>${avgPoints.toFixed(1)}</span></p>
        <p><strong>Avg Position:</strong> <span>${getOrdinal(avgPosition)}</span></p>
        <p><strong>Avg Goal Difference:</strong> <span>${avgGoalDifference.toFixed(1)}</span></p>
        <p><strong>Best Position:</strong> <span>${getOrdinal(teamData.bestPosition)}</span></p>
        <p><strong>Worst Position:</strong> <span>${getOrdinal(teamData.worstPosition)}</span></p>
        <p><strong>Highest Points Season:</strong> <span>${highestPointSeason.season} (${highestPointSeason.points} pts)</span></p>
        <p><strong>Lowest Points Season:</strong> <span>${lowestPointSeason.season} (${lowestPointSeason.points} pts)</span></p>
        <details>
            <summary>Season Details</summary>
            <p>${sortedSeasonDetails}</p>
        </details>
        <p><strong>Net Spend:</strong> <span>€${((transferData.totalIn - transferData.totalOut) / 1e6).toFixed(2)}M</span></p>
        <p><strong>Transfers In:</strong> <span>€${(transferData.totalIn / 1e6).toFixed(2)}M</span></p>
        <p><strong>Transfers Out:</strong> <span>€${(transferData.totalOut / 1e6).toFixed(2)}M</span></p>
    `;

    // Create doughnut chart and populate transfers table
    createDoughnutChart(transferData);
    populateTransfersTable(transferData);

    detailsPanel.classList.add('open');
}

function createDoughnutChart(transferData) {
    const width = 300;
    const height = 150;
    const radius = 70;

    d3.select("#doughnutChart").selectAll("*").remove();

    const svg = d3.select("#doughnutChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${radius}, ${height / 2})`);

    const data = [
        { label: "In", value: transferData.totalIn },
        { label: "Out", value: transferData.totalOut }
    ];

    // If both values are 0, show placeholder
    if (data[0].value === 0 && data[1].value === 0) {
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .text("No transfer data");
        return;
    }

    const colour = d3.scaleOrdinal()
        .domain(["In", "Out"])
        .range(["#dc3545", "#28a745"]);

    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    const arc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius);

    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => colour(d.data.label));

    // Add text in the centre
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.5em")
        .style("font-size", "12px")
        .text("Transfer");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.5em")
        .style("font-size", "12px")
        .text("Balance");

    // Add a legend to the right of the chart
    const legendGroup = svg.append("g")
        .attr("transform", `translate(${radius + 20}, -${height / 4})`);

    const legend = legendGroup.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0, ${i * 30})`);

    legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => colour(d.label));

    legend.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .attr("font-size", "12px")
        .text(d => `${d.label}: €${(d.value / 1e6).toFixed(1)}M`);
}

function populateTransfersTable(transfers) {
    transfersTableBody.innerHTML = '';

    // Sort all transfers by fee (highest first) and take top 10
    const allTransfers = [
        ...transfers.transfersIn.map(t => ({ ...t, type: 'in' })),
        ...transfers.transfersOut.map(t => ({ ...t, type: 'out' }))
    ]
        .sort((a, b) => b.fee - a.fee)
        .slice(0, 10);

    // No transfers found
    if (allTransfers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No transfer data available</td>';
        transfersTableBody.appendChild(row);
        return;
    }

    // Add transfers to table
    allTransfers.forEach(transfer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="transfer-${transfer.type}">${transfer.type === 'in' ? 'IN' : 'OUT'}</td>
            <td>${transfer.player || 'Unknown'}</td>
            <td>€${(transfer.fee / 1e6).toFixed(1)}M</td>
            <td>${transfer.type === 'in' ? 'from ' + transfer.from : 'to ' + transfer.to}</td>
        `;
        transfersTableBody.appendChild(row);
    });
}