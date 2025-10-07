import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np

# Create the competitive analysis data
data = [
    {
        "brand": "Black Ivory Coffee",
        "price_per_kg": 3000,
        "annual_volume": 225,
        "positioning": "Ultra-Luxury",
        "brand_strength": 8.5,
        "distribution_reach": 3.0,
        "target_segment": "Ultra-HNI",
        "market_share": 0.001,
        "key_advantage": "Extreme exclusivity",
        "weakness": "Limited scalability"
    },
    {
        "brand": "Raretail",
        "price_per_kg": 1000,
        "annual_volume": 8500,
        "positioning": "Luxury",
        "brand_strength": 7.5,
        "distribution_reach": 7.0,
        "target_segment": "Affluent Connoisseurs",
        "market_share": 0.142,
        "key_advantage": "Ethical heritage story",
        "weakness": "New brand recognition"
    },
    {
        "brand": "Blue Bottle",
        "price_per_kg": 50,
        "annual_volume": 500000,
        "positioning": "Premium",
        "brand_strength": 9.0,
        "distribution_reach": 8.5,
        "target_segment": "Urban Professionals", 
        "market_share": 0.8,
        "key_advantage": "Third-wave expertise",
        "weakness": "Limited luxury appeal"
    },
    {
        "brand": "Nespresso",
        "price_per_kg": 40,
        "annual_volume": 5000000,
        "positioning": "Mass Premium",
        "brand_strength": 9.5,
        "distribution_reach": 10.0,
        "target_segment": "Mass Affluent",
        "market_share": 8.2,
        "key_advantage": "Global distribution",
        "weakness": "Commoditized perception"
    },
    {
        "brand": "Starbucks Reserve",
        "price_per_kg": 37.5,
        "annual_volume": 2000000,
        "positioning": "Premium",
        "brand_strength": 8.8,
        "distribution_reach": 9.0,
        "target_segment": "Coffee Enthusiasts",
        "market_share": 3.3,
        "key_advantage": "Brand recognition",
        "weakness": "Mass market association"
    },
    {
        "brand": "Lavazza Premium",
        "price_per_kg": 35,
        "annual_volume": 3000000,
        "positioning": "Premium",
        "brand_strength": 8.2,
        "distribution_reach": 8.8,
        "target_segment": "European Market",
        "market_share": 4.9,
        "key_advantage": "Italian heritage",
        "weakness": "Limited luxury positioning"
    },
    {
        "brand": "Illy",
        "price_per_kg": 45,
        "annual_volume": 1500000,
        "positioning": "Premium",
        "brand_strength": 8.0,
        "distribution_reach": 8.2,
        "target_segment": "Coffee Purists",
        "market_share": 2.5,
        "key_advantage": "Quality consistency",
        "weakness": "Premium price without luxury story"
    }
]

df = pd.DataFrame(data)

# Create abbreviated brand names for display
df['brand_short'] = df['brand'].apply(lambda x: x.replace(' Coffee', '').replace(' Premium', '').replace(' Reserve', ' Res'))

# Create volume display with abbreviations
df['volume_display'] = df['annual_volume'].apply(lambda x: f"{x/1000000:.1f}m" if x >= 1000000 else f"{x/1000:.0f}k" if x >= 1000 else f"{x}")

# Format price for display
df['price_display'] = df['price_per_kg'].apply(lambda x: f"${x:,.0f}" if x >= 100 else f"${x:.1f}")

# Create the scatter plot
fig = go.Figure()

# Color mapping for positioning
color_map = {
    'Ultra-Luxury': '#1FB8CD',  # Strong cyan
    'Luxury': '#DB4545',        # Bright red  
    'Premium': '#2E8B57',       # Sea green
    'Mass Premium': '#5D878F'   # Cyan
}

# Add scatter plot points with market share as bubble size
for positioning in df['positioning'].unique():
    subset = df[df['positioning'] == positioning]
    
    # Scale bubble size based on market share (with minimum size for visibility)
    bubble_sizes = subset['market_share'].apply(lambda x: max(15, x * 10 + 10))
    
    fig.add_trace(go.Scatter(
        x=subset['annual_volume'],
        y=subset['price_per_kg'],
        mode='markers+text',
        marker=dict(
            size=bubble_sizes,
            color=color_map[positioning],
            opacity=0.8,
            line=dict(width=2, color='white'),
            sizemode='diameter'
        ),
        text=subset['brand_short'],
        textposition='top center',
        textfont=dict(size=12, color='black'),
        name=positioning,
        customdata=np.column_stack((
            subset['brand'], 
            subset['price_display'],
            subset['volume_display'],
            subset['target_segment'],
            subset['brand_strength'],
            subset['distribution_reach'],
            subset['market_share'],
            subset['key_advantage'],
            subset['weakness']
        )),
        hovertemplate='<b>%{customdata[0]}</b><br>' +
                     'Price: %{customdata[1]}/kg<br>' +
                     'Volume: %{customdata[2]}/year<br>' +
                     'Target: %{customdata[3]}<br>' +
                     'Brand Str: %{customdata[4]}/10<br>' +
                     'Dist Reach: %{customdata[5]}/10<br>' +
                     'Market Share: %{customdata[6]}%<br>' +
                     'Advantage: %{customdata[7]}<br>' +
                     'Weakness: %{customdata[8]}<br>' +
                     '<extra></extra>'
    ))

# Add text annotation explaining bubble size
fig.add_annotation(
    text="Bubble size = Market Share",
    xref="paper", yref="paper",
    x=0.02, y=0.98,
    xanchor="left", yanchor="top",
    showarrow=False,
    font=dict(size=11, color="gray"),
    bgcolor="rgba(255,255,255,0.8)",
    bordercolor="gray",
    borderwidth=1
)

# Update layout
fig.update_layout(
    title='Competitive Analysis Matrix',
    xaxis_title='Annual Volume (kg)',
    yaxis_title='Price per kg ($)',
    xaxis_type='log',
    yaxis_type='log',
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.05,
        xanchor='center',
        x=0.5,
        title_text="Market Positioning"
    ),
    showlegend=True
)

# Update axes with consistent formatting
fig.update_xaxes(
    tickvals=[100, 1000, 10000, 100000, 1000000, 10000000],
    ticktext=['100', '1,000', '10,000', '100,000', '1,000,000', '10,000,000'],
    gridcolor='rgba(128,128,128,0.2)'
)

fig.update_yaxes(
    tickvals=[10, 100, 1000, 10000],
    ticktext=['$10', '$100', '$1,000', '$10,000'],
    gridcolor='rgba(128,128,128,0.2)'
)

fig.update_traces(cliponaxis=False)

# Save the chart as PNG and SVG
fig.write_image("competitive_analysis_matrix.png")
fig.write_image("competitive_analysis_matrix.svg", format="svg")

print("Enhanced competitive analysis chart saved successfully!")