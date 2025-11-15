# Performance-Critical Data Visualization Dashboard

A high-performance real-time dashboard built with Next.js 14+ App Router and TypeScript, capable of smoothly rendering and updating 10,000+ data points at 60fps.
<img width="1296" height="792" alt="image" src="https://github.com/user-attachments/assets/ddf672e9-f90e-4d7c-ae51-1725c8060735" />

## 🚀 Features

- **Multiple Chart Types**: Line chart, bar chart, scatter plot, heatmap
- **Real-time Updates**: New data arrives every 100ms
- **Interactive Controls**: Time range selection, pause/resume streaming
- **Performance Monitoring**: Real-time FPS, render time, and data point tracking
- **Virtual Scrolling**: Efficient data table rendering
- **Canvas-Based Rendering**: Custom canvas implementation (no chart libraries)

## 📦 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Rendering**: HTML5 Canvas API
- **State Management**: React Hooks + Context API
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd performance-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
performance-dashboard/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Dashboard page
│   ├── api/data/            # API endpoints
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── charts/             # Chart components
│   ├── controls/           # Control components
│   ├── ui/                 # UI components
│   └── providers/          # Context providers
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## 🎯 Performance Targets

- ✅ **60 FPS** during real-time updates
- ✅ **< 100ms** response time for interactions
- ✅ **10,000+ data points** rendered smoothly
- ✅ **Memory efficient** - no memory leaks

## 🔧 Key Optimizations

### React Performance
- `useMemo` for expensive computations
- `React.memo` for component memoization
- `useCallback` for stable function references
- Efficient re-rendering patterns

### Canvas Optimization
- Hardware-accelerated rendering (`alpha: false`)
- `requestAnimationFrame` for smooth animations
- Batch rendering operations
- Data sampling for scatter plots

### Next.js Features
- Server Components for initial data
- Client Components for interactivity
- App Router optimization
- Tree-shaking and code splitting

## 📊 Chart Types

1. **Line Chart**: Time-series data with gradient fill
2. **Bar Chart**: Aggregated data in 50 buckets
3. **Scatter Plot**: Categorized data points (sampled)
4. **Heatmap**: 30x30 grid visualization

## 🎮 Usage

### Controls
- **Chart Selection**: Click chart type buttons to switch views
- **Time Range**: Filter data by time period (1m, 5m, 1h, all)
- **Pause/Resume**: Control real-time data streaming
- **Data Table**: View recent data with virtual scrolling

### Performance Monitoring
- **FPS Counter**: Real-time frame rate
- **Render Time**: Time taken for each render cycle
- **Data Points**: Current dataset size
- **Status**: Streaming status indicator

## 🌐 Browser Compatibility

- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Next.js Specific Features

- **Server Components**: Initial data generation on server
- **Client Components**: Interactive charts and controls
- **API Routes**: `/api/data` endpoint for data fetching
- **App Router**: Modern routing with layouts
- **Streaming**: Progressive data loading

## 🔍 Performance Testing

To test performance:
1. Open browser DevTools
2. Navigate to Performance tab
3. Record while interacting with dashboard
4. Check FPS counter and render times
5. Monitor memory usage in Memory tab

## 🤝 Contributing

Contributions welcome! Please follow the existing code structure and ensure all performance targets are met.

contact if you want know regarding project:
Name: Rohit Kumar
gmail: krohitb2552@gmail.com
mob: 8651712231

## 📄 License

MIT License - feel free to use in your projects!

---

Built with ❤️ using Next.js 14 and Canvas API
