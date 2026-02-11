# Port Patrol - VPS Monitoring Dashboard

**Port Patrol** is a powerful, real-time monitoring dashboard designed for VPS (Virtual Private Server) management. It provides a comprehensive view of system resources, open ports, container status, and network performance through a sleek, modern interface.

## 🚀 Key Features

- **Real-time Stats:** Monitor CPU usage, RAM allocation, and system uptime.
- **Port & Container Tracking:** View all open ports and active containers at a glance.
- **Resource Analytics:** Visualized CPU and RAM history via interactive charts.
- **Storage & Network I/O:** Detailed disk usage breakdowns and network traffic monitoring.
- **Service Timeline:** Track the history of service events and status changes.
- **Arabic Support:** Native RTL (Right-to-Left) support for Arabic-speaking users.
- **Theme Support:** Switch between Light and Dark modes.
- **Docker Ready:** Built-in support for containerized deployment.

## 🛠️ Technologies Used

- **Frontend Framework:** [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Visualization:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Auth:** [Supabase](https://supabase.com/)

## ⚙️ Installation & Setup

1. **Clone the repository:**
`git clone https://github.com/amar-eisa/port-patrol.git`
2. **Install dependencies:**
`npm install`
3. **Configure Environment Variables:**
Create a `.env` file and add:
`VITE_SUPABASE_URL=your_url`
`VITE_SUPABASE_ANON_KEY=your_key`
4. **Run Development:**
`npm run dev`

## 📦 Deployment (Docker)
```bash
docker build -t port-patrol .
docker run -p 80:80 port-patrol
