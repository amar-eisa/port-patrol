# Port Patrol - VPS Monitoring Dashboard 🛡️

**Port Patrol** is a powerful, real-time monitoring dashboard designed for VPS (Virtual Private Server) management. It provides a comprehensive view of system resources, open ports, container status, and user activity through a sleek, modern interface.

## 🚀 Key Features

- **Real-time Stats:** Monitor CPU usage, RAM allocation, and system uptime.
- **Container Ownership Tracking:** Automatically identifies and displays the **owner/user** responsible for each active Docker container.
- **Command Audit Logs:** Integrated terminal view showing the **latest commands executed** on the server, categorized by user.
- **Port & Container Tracking:** View all open ports and active containers at a glance.
- **Resource Analytics:** Visualized CPU and RAM history via interactive charts.
- **Storage & Network I/O:** Detailed disk usage breakdowns and network traffic monitoring.
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
```bash
git clone https://github.com/amar-eisa/port-patrol.git
2. Install dependencies:
npm install

3. Configure Environment Variables:
Create a .env file and add:
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

4. Run Development:
npm run dev

📦 Deployment (Docker)

To build the image and run the container:

docker build -t port-patrol .
docker run -d --name port-patrol -p 8003:80 port-patrol


Developed by Amar Eisa to simplify server management and visibility. 🚀
