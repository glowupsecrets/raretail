import plotly.graph_objects as go
import plotly.express as px

# Revenue projections data
years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
revenue = [2.5, 6.8, 12.5, 22.8, 38.5]
growth_rates = [None, 172, 84, 82, 69]

# Create the main revenue line chart
fig = go.Figure()

# Add revenue line
fig.add_trace(go.Scatter(
    x=years,
    y=revenue,
    mode='lines+markers',
    name='Revenue',
    line=dict(width=4, color='#1FB8CD'),
    marker=dict(size=10, color='#1FB8CD'),
    hovertemplate='<b>%{x}</b><br>Revenue: $%{y}m<extra></extra>'
))

# Update layout
fig.update_layout(
    title='Raretail 5-Year Revenue Growth',
    xaxis_title='Year',
    yaxis_title='Revenue ($m)',
    showlegend=False
)

# Update axes
fig.update_yaxes(tickformat='.1f', ticksuffix='m')
fig.update_xaxes(tickangle=0)

# Update traces
fig.update_traces(cliponaxis=False)

# Save as both PNG and SVG
fig.write_image('raretail_revenue_growth.png')
fig.write_image('raretail_revenue_growth.svg', format='svg')

print("Chart saved successfully!")