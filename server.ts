import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Initial seed database
const INITIAL_DB = {
  users: [
    {
      id: 'user-raka',
      name: 'Raka Pradana',
      role: 'pengguna',
      initials: 'RP',
      department: 'Unit administrasi',
      idKedinasan: 'PG-DEMO-018',
      phone: '+62 812-9876-5432',
      isVerified: true,
      statusLabel: 'Pengguna terotorisasi',
      email: 'raka.pradana@istana.go.id',
    },
    {
      id: 'driver-bima',
      name: 'Bima Saputra',
      role: 'driver',
      initials: 'BS',
      department: 'Operasional Armada',
      idKedinasan: 'DRV-102',
      phone: '+62 811-2345-6789',
      isVerified: true,
      statusLabel: 'Pengemudi terverifikasi',
      rating: 4.9,
      vehicle: {
        model: 'Honda Vario',
        color: 'Hitam',
        plate: 'DEMO 024',
        helmetCount: 2,
      },
      shift: 'Shift pagi · 07.00–15.00 WIB',
      isOnline: true,
      email: 'bima.saputra@istana.go.id',
    },
    {
      id: 'admin-nadia',
      name: 'Nadia Putri',
      role: 'admin',
      initials: 'NP',
      department: 'Pusat Operasional',
      idKedinasan: 'ADM-001',
      phone: '+62 813-1122-3344',
      isVerified: true,
      statusLabel: 'Administrator',
      email: 'nadia.putri@istana.go.id',
    },
  ],
  orders: [
    {
      id: 'OI-1048',
      pickupLocation: 'Lobi A · Area administrasi',
      dropoffLocation: 'Gedung B · Area pertemuan',
      status: 'menuju_jemput',
      pickupCode: '4826',
      passengerId: 'user-raka',
      passengerName: 'Raka Pradana',
      passengerDept: 'Unit administrasi · PG-DEMO-018',
      passengerPhone: '+62 812-9876-5432',
      driverId: 'driver-bima',
      driverName: 'Bima Saputra',
      driverPhone: '+62 811-2345-6789',
      driverRating: 4.9,
      vehicleInfo: 'Honda Vario · Hitam (DEMO 024)',
      scheduledType: 'sekarang',
      scheduledTime: '09.45 WIB',
      distanceKm: 1.8,
      durationMinutes: 4,
      createdAt: new Date().toISOString(),
      pickupNote: 'Pintu utama lobi A dekat pos pamdal',
    },
    {
      id: 'OI-1047',
      pickupLocation: 'Gedung C · Area administrasi',
      dropoffLocation: 'Lobi A · Area administrasi',
      status: 'dalam_perjalanan',
      pickupCode: '6192',
      passengerId: 'user-ayu',
      passengerName: 'Ayu Lestari',
      passengerDept: 'Biro Protokol',
      passengerPhone: '+62 812-3344-5566',
      driverId: 'driver-dedi',
      driverName: 'Dedi Santoso',
      driverPhone: '+62 811-9988-7766',
      driverRating: 4.8,
      vehicleInfo: 'Yamaha NMAX · Abu-abu',
      scheduledType: 'sekarang',
      scheduledTime: '09.38 WIB',
      distanceKm: 2.2,
      durationMinutes: 7,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'OI-1046',
      pickupLocation: 'Lobi A · Area administrasi',
      dropoffLocation: 'Gedung C · Area administrasi',
      status: 'dalam_perjalanan',
      pickupCode: '7731',
      passengerId: 'user-arif',
      passengerName: 'Arif Wibowo',
      passengerDept: 'Bagian Humas',
      passengerPhone: '+62 812-7788-9900',
      driverId: 'driver-fajar',
      driverName: 'Fajar Hidayat',
      driverPhone: '+62 811-5544-3322',
      driverRating: 4.9,
      vehicleInfo: 'Honda PCX · Putih',
      scheduledType: 'sekarang',
      scheduledTime: '09.35 WIB',
      distanceKm: 1.5,
      durationMinutes: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'OI-1045',
      pickupLocation: 'Gedung B · Area pertemuan',
      dropoffLocation: 'Lobi A · Area administrasi',
      status: 'dalam_perjalanan',
      pickupCode: '2049',
      passengerId: 'user-dina',
      passengerName: 'Dina Permata',
      passengerDept: 'Biro Kerja Sama',
      passengerPhone: '+62 813-4455-6677',
      driverId: 'driver-yusuf',
      driverName: 'Yusuf Ramadhan',
      driverPhone: '+62 811-6677-8899',
      driverRating: 4.7,
      vehicleInfo: 'Honda Vario · Merah',
      scheduledType: 'sekarang',
      scheduledTime: '09.32 WIB',
      distanceKm: 1.9,
      durationMinutes: 6,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'OI-1044',
      pickupLocation: 'Lobi A · Area administrasi',
      dropoffLocation: 'Gedung B · Area pertemuan',
      status: 'menuju_jemput',
      pickupCode: '5812',
      passengerId: 'user-sinta',
      passengerName: 'Sinta Maharani',
      passengerDept: 'Biro Umum',
      passengerPhone: '+62 812-9900-1122',
      driverId: 'driver-andi',
      driverName: 'Andi Wijaya',
      driverPhone: '+62 811-7788-9911',
      driverRating: 4.8,
      vehicleInfo: 'Yamaha Aerox · Hitam',
      scheduledType: 'sekarang',
      scheduledTime: '09.30 WIB',
      distanceKm: 1.8,
      durationMinutes: 5,
      createdAt: new Date().toISOString(),
    },
  ],
  completedTrips: [
    {
      id: 'OI-1040',
      time: '08.55',
      route: 'Gedung C → Lobi A',
      passenger: 'Sinta Maharani',
      driver: 'Bima Saputra',
      status: 'Selesai',
      date: 'Hari ini',
    },
    {
      id: 'OI-1038',
      time: '08.20',
      route: 'Lobi A → Gedung B',
      passenger: 'Ayu Lestari',
      driver: 'Bima Saputra',
      status: 'Selesai',
      date: 'Hari ini',
    },
    {
      id: 'OI-1032',
      time: '16.20',
      route: 'Gedung B → Lobi A',
      passenger: 'Raka Pradana',
      driver: 'Bima Saputra',
      status: 'Selesai',
      date: 'Kemarin',
    },
  ],
  approvals: [
    {
      id: 'appr-1',
      name: 'Maya Kusuma',
      role: 'pengguna',
      department: 'Unit administrasi',
      status: 'menunggu',
      notes: 'Permohonan akses kedinasan baru',
      date: 'Hari ini · 08.40 WIB',
    },
    {
      id: 'appr-2',
      name: 'Rizki Firmansyah',
      role: 'driver',
      department: 'Dokumen diperbarui',
      status: 'menunggu',
      notes: 'Pembaruan SIM & sertifikat pengemudi istana',
      date: 'Hari ini · 08.15 WIB',
    },
    {
      id: 'appr-3',
      name: 'Hendra Gunawan',
      role: 'pengguna',
      department: 'Biro Protokol',
      status: 'menunggu',
      notes: 'Pindah unit kerja kepresidenan',
      date: 'Kemarin · 15.30 WIB',
    },
    {
      id: 'appr-4',
      name: 'Dewi Sartika',
      role: 'driver',
      department: 'Dokumen VIP',
      status: 'menunggu',
      notes: 'Akreditasi pengawalan internal',
      date: 'Kemarin · 14.10 WIB',
    },
    {
      id: 'appr-5',
      name: 'Bagas Pratama',
      role: 'pengguna',
      department: 'Sekretariat Negara',
      status: 'menunggu',
      notes: 'Permohonan penugasan dinas khusus',
      date: 'Kemarin · 11.20 WIB',
    },
  ],
  stats: {
    totalTripsToday: 42,
    completedTripsToday: 34,
    activeTripsToday: 8,
    availableDrivers: 10,
    totalOnlineDrivers: 18,
    totalRegisteredDrivers: 24,
    authorizedUsers: 126,
    pendingAccessRequests: 5,
    avgPickupMinutes: 4,
  },
  trends: [
    { day: 'Jum', count: 24 },
    { day: 'Sab', count: 31 },
    { day: 'Min', count: 27 },
    { day: 'Sen', count: 38 },
    { day: 'Sel', count: 35 },
    { day: 'Rab', count: 29 },
    { day: 'Kam', count: 42, isCurrent: true },
  ],
  serviceStatus: {
    bookingSystem: 'Normal',
    accessVerification: 'Normal',
    operatingHours: '06.00–20.00 WIB',
    lastSync: '09.41 WIB',
  },
};

// Ensure data directory and database file exist
function getDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
      return INITIAL_DB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB file, using in-memory fallback:', err);
    return INITIAL_DB;
  }
}

function saveDb(db: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

// Connected SSE clients for live broadcasts
const sseClients: express.Response[] = [];

function broadcastUpdate(type: string, payload: any) {
  const message = `data: ${JSON.stringify({ type, payload, timestamp: Date.now() })}\n\n`;
  sseClients.forEach((client) => {
    try {
      client.write(message);
    } catch {
      // client dropped
    }
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // SSE endpoint for instant real-time synchronization across all tabs and roles
  app.get('/api/realtime', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    sseClients.push(res);
    // Send immediate initial sync
    const db = getDb();
    res.write(`data: ${JSON.stringify({ type: 'INIT_SYNC', payload: db, timestamp: Date.now() })}\n\n`);

    req.on('close', () => {
      const idx = sseClients.indexOf(res);
      if (idx !== -1) {
        sseClients.splice(idx, 1);
      }
    });
  });

  // REST API Endpoints
  // Get all data
  app.get('/api/db', (_req, res) => {
    const db = getDb();
    res.json(db);
  });

  // Get orders
  app.get('/api/orders', (_req, res) => {
    const db = getDb();
    res.json(db.orders);
  });

  // Create order
  app.post('/api/orders', (req, res) => {
    const db = getDb();
    const { pickupLocation, dropoffLocation, scheduledType, scheduledTime, passengerId, notes } = req.body;

    const passenger = db.users.find((u: any) => u.id === passengerId) || db.users[0];
    const newId = `OI-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Default assigned driver (Bima Saputra or available driver)
    const driver = db.users.find((u: any) => u.role === 'driver') || {
      id: 'driver-bima',
      name: 'Bima Saputra',
      phone: '+62 811-2345-6789',
      rating: 4.9,
      vehicle: { model: 'Honda Vario', color: 'Hitam', plate: 'DEMO 024' },
    };

    const newOrder = {
      id: newId,
      pickupLocation: pickupLocation || 'Lobi A · Area administrasi',
      dropoffLocation: dropoffLocation || 'Gedung B · Area pertemuan',
      status: 'menuju_jemput',
      pickupCode: randomCode,
      passengerId: passenger.id,
      passengerName: passenger.name,
      passengerDept: `${passenger.department} · ${passenger.idKedinasan}`,
      passengerPhone: passenger.phone,
      driverId: driver.id,
      driverName: driver.name,
      driverPhone: driver.phone,
      driverRating: driver.rating || 4.9,
      vehicleInfo: `${driver.vehicle?.model || 'Honda Vario'} · ${driver.vehicle?.color || 'Hitam'} (${driver.vehicle?.plate || 'DEMO 024'})`,
      scheduledType: scheduledType || 'sekarang',
      scheduledTime: scheduledTime || '09.45 WIB',
      distanceKm: Number((1.2 + Math.random() * 1.5).toFixed(1)),
      durationMinutes: Math.floor(3 + Math.random() * 4),
      createdAt: new Date().toISOString(),
      pickupNote: notes || 'Pintu utama lobi',
    };

    // Prepend to orders
    db.orders.unshift(newOrder);
    db.stats.totalTripsToday += 1;
    db.stats.activeTripsToday += 1;
    saveDb(db);

    broadcastUpdate('ORDER_CREATED', newOrder);
    res.status(201).json(newOrder);
  });

  // Update order status (e.g. driver arrived, verified PIN, in progress, finished)
  app.patch('/api/orders/:id/status', (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const { status } = req.body;

    const orderIndex = db.orders.findIndex((o: any) => o.id === id);
    if (orderIndex === -1) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const order = db.orders[orderIndex];
    order.status = status;

    if (status === 'selesai') {
      // Move to completed trips
      db.completedTrips.unshift({
        id: order.id,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        route: `${order.pickupLocation.split('·')[0].trim()} → ${order.dropoffLocation.split('·')[0].trim()}`,
        passenger: order.passengerName,
        driver: order.driverName,
        status: 'Selesai',
        date: 'Hari ini',
      });
      // Remove from active orders or mark as finished
      db.orders.splice(orderIndex, 1);
      db.stats.activeTripsToday = Math.max(0, db.stats.activeTripsToday - 1);
      db.stats.completedTripsToday += 1;
    }

    saveDb(db);
    broadcastUpdate('ORDER_UPDATED', { id, status, order });
    res.json({ success: true, order });
  });

  // Verify 4-digit pickup code
  app.post('/api/orders/:id/verify', (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const { code } = req.body;

    const order = db.orders.find((o: any) => o.id === id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (order.pickupCode === code) {
      order.status = 'dalam_perjalanan';
      saveDb(db);
      broadcastUpdate('ORDER_UPDATED', { id, status: 'dalam_perjalanan', order });
      res.json({ success: true, verified: true, order });
    } else {
      res.status(400).json({ success: false, verified: false, message: 'Kode penjemputan tidak cocok' });
    }
  });

  // Approvals (approve or reject)
  app.post('/api/approvals/:id/review', (req, res) => {
    const db = getDb();
    const { id } = req.params;
    const { action } = req.body; // 'approve' | 'reject'

    const approvalIndex = db.approvals.findIndex((a: any) => a.id === id);
    if (approvalIndex === -1) {
      res.status(404).json({ error: 'Approval request not found' });
      return;
    }

    const item = db.approvals[approvalIndex];
    item.status = action === 'approve' ? 'disetujui' : 'ditolak';

    if (action === 'approve') {
      if (item.role === 'pengguna') {
        db.stats.authorizedUsers += 1;
      } else {
        db.stats.totalRegisteredDrivers += 1;
      }
    }
    db.stats.pendingAccessRequests = Math.max(0, db.stats.pendingAccessRequests - 1);

    saveDb(db);
    broadcastUpdate('APPROVAL_REVIEWED', { id, action, item });
    res.json({ success: true, item });
  });

  // Request new access (registration)
  app.post('/api/approvals', (req, res) => {
    const db = getDb();
    const { name, role, department, notes } = req.body;
    const newId = `appr-${Date.now()}`;
    const newApproval = {
      id: newId,
      name,
      role: role || 'pengguna',
      department: department || 'Pegawai Kedinasan',
      status: 'menunggu',
      notes: notes || 'Permohonan akses mandiri dari portal login',
      date: 'Hari ini · Baru saja',
    };
    db.approvals.unshift(newApproval);
    db.stats.pendingAccessRequests += 1;
    saveDb(db);

    broadcastUpdate('NEW_APPROVAL_REQUEST', newApproval);
    res.status(201).json(newApproval);
  });

  // Reset demo database
  app.post('/api/reset-demo', (_req, res) => {
    saveDb(INITIAL_DB);
    broadcastUpdate('INIT_SYNC', INITIAL_DB);
    res.json({ success: true, message: 'Database reset to default demo state' });
  });

  // Mount Vite middleware in development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
