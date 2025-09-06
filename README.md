# Premier League Performance vs Spending Visualisation

This interactive data visualisation uses a scatter plot to visualise the relationship between Premier League teams' financial investment (total transfer spending) and their performance (points gained) over the selected seasons.

## Project Structure

The project is organised into the following components:

### Data Files

- `pl-tables-1993-2024.csv`: Contains Premier League standings data from 1993 to 2024, including points, positions, and goal differences.
- `transfers.csv`: Contains transfer data including player movements, fees, and club information from a vast range of clubs

### JavaScript Files

- `main.js`: Application entry point that initialises components and handles events.
- `data-handler.js`: Functions for loading, parsing, and processing data.
- `visualisation.js`: Core visualisation rendering and update functions.
- `team-details.js`: Functions for displaying detailed team information.
- `utils.js`: Utility functions and shared constants.

### HTML and CSS

- `index.html`: Main application structure.
- `style.css`: Styling for the application.

### Report

- `report.pdf`: Contains my report on parts 1 and 2 and contains an appendix for further supporting information.

## How to Use

1. Please open the `index.html` file to load the visualisation
2. Select a range of seasons using the dropdown menus
3. Click "Update" to refresh the visualisation
4. Explore the scatter plot:
   - Pan and zoom to focus on specific areas
   - Click on team points to view detailed information
5. In the details panel:
   - View team performance statistics
   - Analyse transfer activity
   - See key player transfers

## Implementation Details

The visualisation is built using D3.js and follows a modular architecture. The application loads CSV data asynchronously, processes it to aggregate team performance and financial metrics, and renders an interactive visualisation.

The scatter plot uses:

- X-axis: Total transfer spending in Euros
- Y-axis: Total points gained over the selected seasons
- Points coloured by team
- Zoom/pan interaction for detailed exploration

## References and Inspiration

This project was inspired by and built with the help of the following resources:

- [D3.js Scatter Plot Examples](https://d3-graph-gallery.com/scatter.html)
- [D3.js Doughnut Chart Examples](https://d3-graph-gallery.com/donut.html)
- [Data Visualisation Catalogue - Doughnut Chart](https://datavizcatalogue.com/methods/donut_chart.html)
- [Zoomable Scatterplot](https://observablehq.com/@d3/zoomable-scatterplot?collection=@d3/d3-zoom)
- [D3.js Official Documentation](https://d3js.org/getting-started)
