import plotly.graph_objects as go
import plotly.express as px
import pandas as pd

# Parse the data
regions_data = [
    {
        "region": "North America",
        "priority": 1,
        "color": "dark_green",
        "market_size": "2.1B",
        "growth_rate": 9.5,
        "entry_month": 3,
        "market_readiness": 9.0,
        "cities": [
            {"name": "New York", "potential": 9.2, "lat": 40.7128, "lng": -74.0060},
            {"name": "San Francisco", "potential": 8.9, "lat": 37.7749, "lng": -122.4194},
            {"name": "Los Angeles", "potential": 8.3, "lat": 34.0522, "lng": -118.2437}
        ]
    },
    {
        "region": "Western Europe", 
        "priority": 1,
        "color": "dark_green",
        "market_size": "2.8B",
        "growth_rate": 10.3,
        "entry_month": 6,
        "market_readiness": 9.5,
        "cities": [
            {"name": "London", "potential": 8.8, "lat": 51.5074, "lng": -0.1278},
            {"name": "Paris", "potential": 8.5, "lat": 48.8566, "lng": 2.3522},
            {"name": "Milan", "potential": 8.1, "lat": 45.4642, "lng": 9.1900}
        ]
    },
    {
        "region": "Asia-Pacific",
        "priority": 2,
        "color": "medium_green", 
        "market_size": "1.2B",
        "growth_rate": 12.1,
        "entry_month": 18,
        "market_readiness": 7.5,
        "cities": [
            {"name": "Tokyo", "potential": 8.1, "lat": 35.6762, "lng": 139.6503},
            {"name": "Singapore", "potential": 7.8, "lat": 1.3521, "lng": 103.8198},
            {"name": "Sydney", "potential": 7.5, "lat": -33.8688, "lng": 151.2093}
        ]
    },
    {
        "region": "Middle East",
        "priority": 3,
        "color": "yellow",
        "market_size": "400M", 
        "growth_rate": 8.2,
        "entry_month": 30,
        "market_readiness": 6.5,
        "cities": [
            {"name": "Dubai", "potential": 6.5, "lat": 25.2048, "lng": 55.2708},
            {"name": "Riyadh", "potential": 6.2, "lat": 24.7136, "lng": 46.6753}
        ]
    }
]

# Create lists for plotting
city_names = []
lats = []
lngs = []
potentials = []
regions = []
market_sizes = []
growth_rates = []
entry_months = []

# Color mapping using correct brand colors
color_map = {
    'dark_green': '#2E8B57',    # Sea green for Priority 1
    'medium_green': '#1FB8CD',  # Strong cyan for Priority 2  
    'yellow': '#D2BA4C'         # Moderate yellow for Priority 3
}

# Extract city data
for region_data in regions_data:
    region_name = region_data['region']
    for city in region_data['cities']:
        city_names.append(city['name'])
        lats.append(city['lat'])
        lngs.append(city['lng'])
        potentials.append(city['potential'])
        regions.append(region_name)
        market_sizes.append(region_data['market_size'])
        growth_rates.append(region_data['growth_rate'])
        entry_months.append(region_data['entry_month'])

# Create DataFrame
df = pd.DataFrame({
    'city': city_names,
    'lat': lats,
    'lng': lngs,
    'potential': potentials,
    'region': regions,
    'market_size': market_sizes,
    'growth_rate': growth_rates,
    'entry_month': entry_months
})

# Create the geographic scatter plot
fig = go.Figure()

# Add world map coastlines as background
coastlines_lat = [80, 70, 60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50, -60]
coastlines_lng = list(range(-180, 181, 30))

# Add light grid for geographic reference
for lat in range(-60, 81, 20):
    fig.add_trace(go.Scatter(
        x=[-180, 180], y=[lat, lat], mode='lines',
        line=dict(color='lightgray', width=0.5, dash='dot'),
        showlegend=False, hoverinfo='skip'
    ))

for lng in range(-180, 181, 30):
    fig.add_trace(go.Scatter(
        x=[lng, lng], y=[-60, 80], mode='lines',
        line=dict(color='lightgray', width=0.5, dash='dot'),
        showlegend=False, hoverinfo='skip'
    ))

# Add cities by region
for region_data in regions_data:
    region_cities = df[df['region'] == region_data['region']]
    
    priority_text = f"Priority {region_data['priority']}"
    
    fig.add_trace(go.Scatter(
        x=region_cities['lng'],
        y=region_cities['lat'],
        mode='markers+text',
        marker=dict(
            size=region_cities['potential'] * 6,  # Size based on potential score
            color=color_map[region_data['color']],
            opacity=0.8,
            line=dict(width=2, color='white'),
            sizemode='diameter'
        ),
        text=region_cities['city'],
        textposition='top center',
        textfont=dict(size=9, color='black'),
        hovertemplate=
        '<b>%{text}</b><br>' +
        'Region: ' + region_data['region'] + '<br>' +
        'Potential: %{customdata[0]}<br>' +
        'Market: $%{customdata[1]}<br>' +
        'Growth: %{customdata[2]}% CAGR<br>' +
        'Entry: Month %{customdata[3]}' +
        '<extra></extra>',
        customdata=list(zip(
            region_cities['potential'],
            region_cities['market_size'],
            region_cities['growth_rate'],
            region_cities['entry_month']
        )),
        name=f"{region_data['region']} ({priority_text})",
        showlegend=True
    ))

# Add region annotations with market data
annotation_positions = [
    {"region": "North America", "x": -100, "y": 50},
    {"region": "Western Europe", "x": 10, "y": 55},
    {"region": "Asia-Pacific", "x": 120, "y": 20},
    {"region": "Middle East", "x": 45, "y": 35}
]

for pos in annotation_positions:
    region_info = next(r for r in regions_data if r['region'] == pos['region'])
    
    annotation_text = (
        f"<b>{region_info['region']}</b><br>"
        f"Market: ${region_info['market_size']}<br>"
        f"Growth: {region_info['growth_rate']}%<br>"
        f"Entry: Mo {region_info['entry_month']}"
    )
    
    fig.add_annotation(
        x=pos['x'], y=pos['y'],
        text=annotation_text,
        showarrow=True,
        arrowhead=2,
        arrowsize=1,
        arrowwidth=1,
        arrowcolor=color_map[region_info['color']],
        bordercolor=color_map[region_info['color']],
        borderwidth=1,
        bgcolor='white',
        opacity=0.9,
        font=dict(size=8)
    )

# Update layout for world map appearance  
fig.update_layout(
    title='Global Expansion Market Map',
    xaxis_title='Longitude',
    yaxis_title='Latitude',
    xaxis=dict(
        range=[-180, 180], 
        gridcolor='lightgray',
        tick0=-180,
        dtick=60,
        showgrid=True
    ),
    yaxis=dict(
        range=[-60, 80], 
        gridcolor='lightgray',
        tick0=-60,
        dtick=20,
        showgrid=True
    ),
    plot_bgcolor='aliceblue',
    legend=dict(
        orientation='v',
        yanchor='top',
        y=0.98,
        xanchor='left',
        x=1.02,
        title="Regions & Priority"
    ),
    showlegend=True
)

fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image('global_expansion_map.png')
fig.write_image('global_expansion_map.svg', format='svg')

fig.show()