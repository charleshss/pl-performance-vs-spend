/**
 * Functions for creating and updating the main visualisation
 */

let svg, x, y, gx, gy;
let currentZoomTransform = d3.zoomIdentity;

function initialiseVisualisation() {
    svg = d3.select("svg")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
}

function createVisualisation(startSeason, endSeason) {
    // Clear previous visualisation
    svg.selectAll("*").remove();

    const { teamData, teamTransfers } = getFilteredData(startSeason, endSeason);

    // Create scales
    x = d3.scaleLinear()
        .domain([0, d3.max(teamData, d => d.totalSpend) * 1.1 || 100000000])
        .range([0, width]);

    y = d3.scaleLinear()
        .domain([0, d3.max(teamData, d => d.totalPoints) * 1.1 || 100])
        .range([height, 0]);

    // Define zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 20])  // Limit zoom scale
        .on("zoom", zoomed);

    // Create container for grid lines
    const gridContainer = svg.append("g").attr("class", "grid-container");

    // Create container for zoomable content
    const g = svg.append("g").attr("class", "zoomable-content");

    // Create point groups to keep labels with their points
    const pointGroups = g.selectAll(".point-group")
        .data(teamData)
        .enter()
        .append("g")
        .attr("class", "point-group")
        .attr("transform", d => `translate(${x(d.totalSpend)},${y(d.totalPoints)})`);

    // Add data points
    pointGroups.append("circle")
        .attr("r", 5)
        .attr("fill", d => teamColors[d.team] || "steelblue")
        .attr("stroke", d => lightBgTeams.includes(d.team) ? "#333" : "white")
        .attr("stroke-width", 1)
        .attr("opacity", 0.7)
        .on("click", (event, d) => {
            event.stopPropagation();

            const transform = d3.zoomTransform(g.node());

            // Reset all circles
            g.selectAll("circle")
                .attr("r", 5 / transform.k)
                .attr("opacity", 0.7);

            // Highlight clicked circle
            d3.select(event.currentTarget)
                .attr("r", 8 / transform.k)
                .attr("opacity", 1);

            openTeamDetailsPanel(d, teamTransfers[d.team]);
        });

    // Add labels to the same groups
    pointGroups.append("text")
        .attr("class", "team-label")
        .attr("x", 10)
        .attr("y", 0)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("pointer-events", "none")
        .text(d => d.team);

    // Create axes
    gx = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => `€${d / 1e6}M`));

    gy = svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Initialize grid with current axis ticks
    updateGrid(gridContainer, x, y);

    // Add axis labels
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("Total Spend (€)");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Total Points Gained");

    // Add title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text(`Premier League Performance (${formatSeason(+startSeason)} - ${formatSeason(+endSeason)})`);

    // Add reset zoom button
    svg.append("text")
        .attr("class", "reset-zoom")
        .attr("x", width - 10)
        .attr("y", -5)
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .style("cursor", "pointer")
        .style("fill", "#4285f4")
        .text("Reset Zoom")
        .on("click", () => {
            // Reset zoom with transition
            d3.select("svg").transition().duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        });

    // Apply zoom to the SVG
    d3.select("svg").call(zoom);

    // Zoom event handler function
    function zoomed(event) {
        const transform = event.transform;

        const zx = transform.rescaleX(x);
        const zy = transform.rescaleY(y);

        g.attr("transform", transform);

        // Adjust scale-dependent elements
        g.selectAll("circle")
            .attr("r", 5 / transform.k)
            .attr("stroke-width", 1 / transform.k);

        g.selectAll(".team-label")
            .style("font-size", `${10 / transform.k}px`);

        // Update axes with rescaled versions
        gx.call(d3.axisBottom(zx).tickFormat(d => `€${d / 1e6}M`));
        gy.call(d3.axisLeft(zy));

        // Update grid to match current axis ticks
        updateGrid(gridContainer, zx, zy);
    }

    function updateGrid(container, xScale, yScale) {
        container.selectAll("*").remove();

        // Get actual tick values from the axes
        const xTicks = gx.selectAll(".tick").data();
        const yTicks = gy.selectAll(".tick").data();

        container.append("g")
            .attr("class", "x-grid")
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .selectAll("line")
            .data(xTicks)
            .join("line")
            .attr("x1", d => xScale(d))
            .attr("x2", d => xScale(d))
            .attr("y1", 0)
            .attr("y2", height);

        container.append("g")
            .attr("class", "y-grid")
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .selectAll("line")
            .data(yTicks)
            .join("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", d => yScale(d))
            .attr("y2", d => yScale(d));
    }
}