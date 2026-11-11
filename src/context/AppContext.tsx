import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  User,
  Order,
  CompletedTrip,
  ApprovalRequest,
  OperationalStats,
  TrendItem,
  ServiceStatus,
  DatabaseState,
  OrderStatus,
  ChatMessage,
} from '../types';

export const INITIAL_USERS: User[] = [
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
];

const INITIAL_ORDERS: Order[] = [
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
    vehicleInfo: 'Honda Vario · Hitam (DEMO 024 · Helm tersedia)',
    scheduledType: 'sekarang',
    scheduledTime: '09.45 WIB',
    distanceKm: 1.8,
    durationMinutes: 4,
    createdAt: new Date().toISOString(),
    pickupNote: 'Pintu lobi utama sebelah timur',
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
];

const INITIAL_COMPLETED_TRIPS: CompletedTrip[] = [
  {
    id: 'OI-1040',
    time: '08.55',
    route: 'Gedung C → Lobi A',
    passenger: 'Sinta Maharani',
    driver: 'Dedi Santoso',
    status: 'Selesai',
    date: 'Hari ini · 08.55',
  },
  {
    id: 'OI-1038',
    time: '08.20',
    route: 'Lobi A → Gedung B',
    passenger: 'Ayu Lestari',
    driver: 'Bima Saputra',
    status: 'Selesai',
    date: 'Hari ini · 08.20',
  },
  {
    id: 'OI-1032',
    time: '16.20',
    route: 'Gedung B → Lobi A',
    passenger: 'Raka Pradana',
    driver: 'Bima Saputra',
    status: 'Selesai',
    date: 'Kemarin · 16.20',
  },
];

const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr-1',
    name: 'Maya Kusuma',
    role: 'pengguna',
    department: 'Unit administrasi',
    status: 'menunggu',
    notes: 'Permohonan akses kedinasan staf baru',
    date: 'Hari ini · 08.40 WIB',
  },
  {
    id: 'appr-2',
    name: 'Rizki Firmansyah',
    role: 'driver',
    department: 'Dokumen diperbarui',
    status: 'menunggu',
    notes: 'Pembaruan SIM & sertifikasi VIP kepresidenan',
    date: 'Hari ini · 08.15 WIB',
  },
  {
    id: 'appr-3',
    name: 'Hendra Gunawan',
    role: 'pengguna',
    department: 'Biro Protokol',
    status: 'menunggu',
    notes: 'Mutasi staf divisi luar istana',
    date: 'Kemarin · 15.30 WIB',
  },
  {
    id: 'appr-4',
    name: 'Dewi Sartika',
    role: 'driver',
    department: 'Dokumen diperbarui',
    status: 'menunggu',
    notes: 'Pemeriksaan kelayakan armada Honda PCX',
    date: 'Kemarin · 14.10 WIB',
  },
  {
    id: 'appr-5',
    name: 'Bagas Pratama',
    role: 'pengguna',
    department: 'Sekretariat Negara',
    status: 'menunggu',
    notes: 'Permohonan akses mobilitas dinas antar gedung',
    date: 'Kemarin · 11.20 WIB',
  },
];

const INITIAL_STATS: OperationalStats = {
  totalTripsToday: 42,
  completedTripsToday: 34,
  activeTripsToday: 8,
  availableDrivers: 10,
  totalOnlineDrivers: 18,
  totalRegisteredDrivers: 24,
  authorizedUsers: 126,
  pendingAccessRequests: 5,
  avgPickupMinutes: 4,
};

const INITIAL_TRENDS: TrendItem[] = [
  { day: 'Jum', count: 24 },
  { day: 'Sab', count: 31 },
  { day: 'Min', count: 27 },
  { day: 'Sen', count: 38 },
  { day: 'Sel', count: 35 },
  { day: 'Rab', count: 29 },
  { day: 'Kam', count: 42, isCurrent: true },
];

const INITIAL_SERVICE_STATUS: ServiceStatus = {
  bookingSystem: 'Normal',
  accessVerification: 'Normal',
  operatingHours: '06.00–20.00 WIB',
  lastSync: '09.41 WIB',
};

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg-1',
    orderId: 'OI-1048',
    senderId: 'driver-bima',
    senderName: 'Bima Saputra',
    senderRole: 'driver',
    text: 'Selamat pagi Pak Raka, saya sedang menuju ke Lobi A. Estimasi tiba 4 menit.',
    timestamp: '09.41',
  },
  {
    id: 'msg-2',
    orderId: 'OI-1048',
    senderId: 'user-raka',
    senderName: 'Raka Pradana',
    senderRole: 'pengguna',
    text: 'Baik Pak Bima, saya sudah menunggu di dekat pos jaga pintu depan Lobi A.',
    timestamp: '09.42',
  },
];

interface AppContextType {
  currentUser: User | null;
  users: User[];
  orders: Order[];
  completedTrips: CompletedTrip[];
  approvals: ApprovalRequest[];
  stats: OperationalStats;
  trends: TrendItem[];
  serviceStatus: ServiceStatus;
  chatMessages: ChatMessage[];
  isDriverOnline: boolean;
  setIsDriverOnline: (val: boolean) => void;
  // Auth
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: 'pengguna' | 'driver' | 'admin') => void;
  loginWithCredentials: (idKedinasan: string, pass: string) => boolean;
  logout: () => void;
  // Order actions
  createOrder: (payload: {
    pickupLocation: string;
    dropoffLocation: string;
    scheduledType: 'sekarang' | 'jadwalkan';
    scheduledTime: string;
    notes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<boolean>;
  verifyPickupCode: (orderId: string, code: string) => Promise<{ success: boolean; message?: string }>;
  cancelOrder: (orderId: string) => Promise<boolean>;
  // Approvals
  reviewApproval: (approvalId: string, action: 'approve' | 'reject') => Promise<void>;
  requestNewAccess: (data: { name: string; role: 'pengguna' | 'driver'; department: string; notes: string }) => Promise<void>;
  // Chat
  sendChatMessage: (orderId: string, text: string) => void;
  // Modals & Nav
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  isCallModalOpen: boolean;
  setIsCallModalOpen: (open: boolean) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  resetToDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'ooi_database_v1';
const CHAT_STORAGE_KEY = 'ooi_chats_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current logged in user (default: Pak Raka Pradana as Pengguna, or saved)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ooi_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0];
      }
    }
    return INITIAL_USERS[0];
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [completedTrips, setCompletedTrips] = useState<CompletedTrip[]>(INITIAL_COMPLETED_TRIPS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [stats, setStats] = useState<OperationalStats>(INITIAL_STATS);
  const [trends, setTrends] = useState<TrendItem[]>(INITIAL_TRENDS);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>(INITIAL_SERVICE_STATUS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [isDriverOnline, setIsDriverOnline] = useState<boolean>(true);

  // Active navigation tab
  const [activeNavTab, setActiveNavTab] = useState<string>('beranda');

  // Modals
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ooi_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ooi_current_user');
    }
  }, [currentUser]);

  // Load from local storage or server initially
  useEffect(() => {
    const localDbStr = localStorage.getItem(STORAGE_KEY);
    if (localDbStr) {
      try {
        const parsed = JSON.parse(localDbStr);
        if (parsed.orders) setOrders(parsed.orders);
        if (parsed.completedTrips) setCompletedTrips(parsed.completedTrips);
        if (parsed.approvals) setApprovals(parsed.approvals);
        if (parsed.stats) setStats(parsed.stats);
        if (parsed.users) setUsers(parsed.users);
      } catch (e) {
        console.error('Failed to parse local DB', e);
      }
    }

    const localChats = localStorage.getItem(CHAT_STORAGE_KEY);
    if (localChats) {
      try {
        setChatMessages(JSON.parse(localChats));
      } catch (e) {
        console.error('Failed to parse local chats', e);
      }
    }

    // Try fetching from Express backend
    fetch('/api/db')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data: DatabaseState) => {
        if (data && data.orders) {
          setOrders(data.orders);
          setCompletedTrips(data.completedTrips);
          setApprovals(data.approvals);
          setStats(data.stats);
          setTrends(data.trends);
          setServiceStatus(data.serviceStatus);
          setUsers(data.users);
        }
      })
      .catch((_err) => {
        // Express might not be responding or running standalone Vite; client state is used
      });

    // Real-time EventSource connection if available
    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/realtime');
      es.onmessage = (event) => {
        try {
          const { type, payload } = JSON.parse(event.data);
          if (type === 'INIT_SYNC') {
            setOrders(payload.orders || []);
            setCompletedTrips(payload.completedTrips || []);
            setApprovals(payload.approvals || []);
            setStats(payload.stats || INITIAL_STATS);
          } else if (type === 'ORDER_CREATED') {
            setOrders((prev) => {
              const exists = prev.find((o) => o.id === payload.id);
              return exists ? prev : [payload, ...prev];
            });
            setStats((prev) => ({
              ...prev,
              totalTripsToday: prev.totalTripsToday + 1,
              activeTripsToday: prev.activeTripsToday + 1,
            }));
          } else if (type === 'ORDER_UPDATED') {
            setOrders((prev) => {
              if (payload.status === 'selesai') {
                return prev.filter((o) => o.id !== payload.id);
              }
              return prev.map((o) => (o.id === payload.id ? { ...o, status: payload.status } : o));
            });
            if (payload.status === 'selesai') {
              setCompletedTrips((prev) => [
                {
                  id: payload.id,
                  time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  route: `${payload.order?.pickupLocation?.split('·')[0]?.trim() || 'Lobi A'} → ${payload.order?.dropoffLocation?.split('·')[0]?.trim() || 'Gedung B'}`,
                  passenger: payload.order?.passengerName || 'Pengguna',
                  driver: payload.order?.driverName || 'Bima Saputra',
                  status: 'Selesai',
                  date: 'Hari ini',
                },
                ...prev,
              ]);
              setStats((prev) => ({
                ...prev,
                activeTripsToday: Math.max(0, prev.activeTripsToday - 1),
                completedTripsToday: prev.completedTripsToday + 1,
              }));
            }
          } else if (type === 'APPROVAL_REVIEWED') {
            setApprovals((prev) =>
              prev.map((a) => (a.id === payload.id ? { ...a, status: payload.action === 'approve' ? 'disetujui' : 'ditolak' } : a))
            );
          } else if (type === 'NEW_APPROVAL_REQUEST') {
            setApprovals((prev) => [payload, ...prev]);
            setStats((prev) => ({
              ...prev,
              pendingAccessRequests: prev.pendingAccessRequests + 1,
            }));
          }
        } catch {
          // ignore parsing error
        }
      };
    } catch {
      // EventSource not supported
    }

    // BroadcastChannel for cross-tab realtime sync
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('ooi-realtime');
      bc.onmessage = (ev) => {
        const { type, payload } = ev.data || {};
        if (type === 'DB_SYNC') {
          setOrders(payload.orders);
          setCompletedTrips(payload.completedTrips);
          setApprovals(payload.approvals);
          setStats(payload.stats);
        } else if (type === 'NEW_CHAT') {
          setChatMessages((prev) => [...prev, payload]);
        }
      };
    } catch {
      // BroadcastChannel not supported
    }

    return () => {
      es?.close();
      bc?.close();
    };
  }, []);

  // Save changes to localStorage and broadcast across tabs
  const persistState = useCallback(
    (newOrders: Order[], newCompleted: CompletedTrip[], newApprovals: ApprovalRequest[], newStats: OperationalStats) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            orders: newOrders,
            completedTrips: newCompleted,
            approvals: newApprovals,
            stats: newStats,
            users,
          })
        );
        const bc = new BroadcastChannel('ooi-realtime');
        bc.postMessage({
          type: 'DB_SYNC',
          payload: {
            orders: newOrders,
            completedTrips: newCompleted,
            approvals: newApprovals,
            stats: newStats,
          },
        });
        bc.close();
      } catch {
        // ignore
      }
    },
    [users]
  );

  // Switch Role helper
  const switchRole = useCallback((role: 'pengguna' | 'driver' | 'admin') => {
    const user = INITIAL_USERS.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
      setActiveNavTab('beranda');
    }
  }, []);

  // Login credentials check
  const loginWithCredentials = useCallback(
    (idKedinasan: string, _pass: string) => {
      const trimmed = idKedinasan.trim().toLowerCase();
      const found = INITIAL_USERS.find(
        (u) =>
          u.idKedinasan.toLowerCase() === trimmed ||
          u.email?.toLowerCase() === trimmed ||
          u.name.toLowerCase().includes(trimmed)
      );
      if (found) {
        setCurrentUser(found);
        setIsLoginModalOpen(false);
        setActiveNavTab('beranda');
        return true;
      }
      // If not in default list, create temporary authorized session
      const customUser: User = {
        id: `user-${Date.now()}`,
        name: idKedinasan,
        role: idKedinasan.toLowerCase().includes('driver') ? 'driver' : 'pengguna',
        initials: idKedinasan.substring(0, 2).toUpperCase(),
        department: 'Unit Kedinasan Istana',
        idKedinasan: idKedinasan.toUpperCase(),
        phone: '+62 812-0000-1111',
        isVerified: true,
        statusLabel: 'Pengguna terotorisasi',
      };
      setCurrentUser(customUser);
      setIsLoginModalOpen(false);
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsLoginModalOpen(true);
  }, []);

  // Create new Order
  const createOrder = useCallback(
    async (payload: {
      pickupLocation: string;
      dropoffLocation: string;
      scheduledType: 'sekarang' | 'jadwalkan';
      scheduledTime: string;
      notes?: string;
    }) => {
      const orderId = `OI-${Math.floor(1000 + Math.random() * 9000)}`;
      const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
      const passenger = currentUser || INITIAL_USERS[0];
      const driver = users.find((u) => u.role === 'driver') || INITIAL_USERS[1];

      const newOrder: Order = {
        id: orderId,
        pickupLocation: payload.pickupLocation,
        dropoffLocation: payload.dropoffLocation,
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
        vehicleInfo: `${driver.vehicle?.model || 'Honda Vario'} · ${driver.vehicle?.color || 'Hitam'} (${driver.vehicle?.plate || 'DEMO 024'} · Helm tersedia)`,
        scheduledType: payload.scheduledType,
        scheduledTime: payload.scheduledTime,
        distanceKm: Number((1.2 + Math.random() * 1.6).toFixed(1)),
        durationMinutes: Math.floor(3 + Math.random() * 4),
        createdAt: new Date().toISOString(),
        pickupNote: payload.notes || 'Pintu lobi utama',
      };

      const updatedOrders = [newOrder, ...orders];
      const updatedStats = {
        ...stats,
        totalTripsToday: stats.totalTripsToday + 1,
        activeTripsToday: stats.activeTripsToday + 1,
      };

      setOrders(updatedOrders);
      setStats(updatedStats);
      persistState(updatedOrders, completedTrips, approvals, updatedStats);

      // Post to backend server if alive
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pickupLocation: payload.pickupLocation,
            dropoffLocation: payload.dropoffLocation,
            scheduledType: payload.scheduledType,
            scheduledTime: payload.scheduledTime,
            passengerId: passenger.id,
            notes: payload.notes,
          }),
        });
      } catch {
        // handled locally
      }

      return newOrder;
    },
    [currentUser, users, orders, stats, completedTrips, approvals, persistState]
  );

  // Update order status
  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus): Promise<boolean> => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return false;

      let updatedOrders = [...orders];
      let updatedCompleted = [...completedTrips];
      let updatedStats = { ...stats };

      if (status === 'selesai') {
        updatedOrders = orders.filter((o) => o.id !== orderId);
        const newCompleted: CompletedTrip = {
          id: order.id,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          route: `${order.pickupLocation.split('·')[0].trim()} → ${order.dropoffLocation.split('·')[0].trim()}`,
          passenger: order.passengerName,
          driver: order.driverName || 'Bima Saputra',
          status: 'Selesai',
          date: 'Hari ini',
        };
        updatedCompleted = [newCompleted, ...completedTrips];
        updatedStats = {
          ...stats,
          activeTripsToday: Math.max(0, stats.activeTripsToday - 1),
          completedTripsToday: stats.completedTripsToday + 1,
        };
      } else {
        updatedOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
      }

      setOrders(updatedOrders);
      setCompletedTrips(updatedCompleted);
      setStats(updatedStats);
      persistState(updatedOrders, updatedCompleted, approvals, updatedStats);

      try {
        await fetch(`/api/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
      } catch {
        // handled locally
      }

      return true;
    },
    [orders, completedTrips, stats, approvals, persistState]
  );

  // Verify PIN
  const verifyPickupCode = useCallback(
    async (orderId: string, code: string): Promise<{ success: boolean; message?: string }> => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) {
        return { success: false, message: 'Pesanan tidak ditemukan' };
      }

      if (order.pickupCode === code.trim()) {
        await updateOrderStatus(orderId, 'dalam_perjalanan');
        return { success: true };
      } else {
        return { success: false, message: 'Kode penjemputan salah. Harap tanyakan 4 digit kode pada penumpang.' };
      }
    },
    [orders, updateOrderStatus]
  );

  // Cancel order
  const cancelOrder = useCallback(
    async (orderId: string) => {
      const updatedOrders = orders.filter((o) => o.id !== orderId);
      const updatedStats = {
        ...stats,
        activeTripsToday: Math.max(0, stats.activeTripsToday - 1),
      };
      setOrders(updatedOrders);
      setStats(updatedStats);
      persistState(updatedOrders, completedTrips, approvals, updatedStats);
      return true;
    },
    [orders, stats, completedTrips, approvals, persistState]
  );

  // Review approval
  const reviewApproval = useCallback(
    async (approvalId: string, action: 'approve' | 'reject') => {
      const updatedApprovals = approvals.map((a) =>
        a.id === approvalId ? { ...a, status: (action === 'approve' ? 'disetujui' : 'ditolak') as 'disetujui' | 'ditolak' } : a
      );
      const req = approvals.find((a) => a.id === approvalId);
      const updatedStats = {
        ...stats,
        pendingAccessRequests: Math.max(0, stats.pendingAccessRequests - 1),
        authorizedUsers: action === 'approve' && req?.role === 'pengguna' ? stats.authorizedUsers + 1 : stats.authorizedUsers,
        totalRegisteredDrivers: action === 'approve' && req?.role === 'driver' ? stats.totalRegisteredDrivers + 1 : stats.totalRegisteredDrivers,
      };

      setApprovals(updatedApprovals);
      setStats(updatedStats);
      persistState(orders, completedTrips, updatedApprovals, updatedStats);

      try {
        await fetch(`/api/approvals/${approvalId}/review`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        });
      } catch {
        // handled locally
      }
    },
    [approvals, stats, orders, completedTrips, persistState]
  );

  // Request new access
  const requestNewAccess = useCallback(
    async (data: { name: string; role: 'pengguna' | 'driver'; department: string; notes: string }) => {
      const newApproval: ApprovalRequest = {
        id: `appr-${Date.now()}`,
        name: data.name,
        role: data.role,
        department: data.department,
        status: 'menunggu',
        notes: data.notes,
        date: 'Hari ini · Baru saja',
      };
      const updatedApprovals = [newApproval, ...approvals];
      const updatedStats = {
        ...stats,
        pendingAccessRequests: stats.pendingAccessRequests + 1,
      };

      setApprovals(updatedApprovals);
      setStats(updatedStats);
      persistState(orders, completedTrips, updatedApprovals, updatedStats);

      try {
        await fetch('/api/approvals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch {
        // handled locally
      }
    },
    [approvals, stats, orders, completedTrips, persistState]
  );

  // Chat message sending
  const sendChatMessage = useCallback(
    (orderId: string, text: string) => {
      if (!text.trim() || !currentUser) return;
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        orderId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => {
        const next = [...prev, newMsg];
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
        try {
          const bc = new BroadcastChannel('ooi-realtime');
          bc.postMessage({ type: 'NEW_CHAT', payload: newMsg });
          bc.close();
        } catch {
          // ignore
        }
        return next;
      });
    },
    [currentUser]
  );

  // Reset to default demo data
  const resetToDemo = useCallback(() => {
    setOrders(INITIAL_ORDERS);
    setCompletedTrips(INITIAL_COMPLETED_TRIPS);
    setApprovals(INITIAL_APPROVALS);
    setStats(INITIAL_STATS);
    setTrends(INITIAL_TRENDS);
    setServiceStatus(INITIAL_SERVICE_STATUS);
    setChatMessages(INITIAL_CHAT);
    persistState(INITIAL_ORDERS, INITIAL_COMPLETED_TRIPS, INITIAL_APPROVALS, INITIAL_STATS);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    fetch('/api/reset-demo', { method: 'POST' }).catch(() => {});
  }, [persistState]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        orders,
        completedTrips,
        approvals,
        stats,
        trends,
        serviceStatus,
        chatMessages,
        isDriverOnline,
        setIsDriverOnline,
        setCurrentUser,
        switchRole,
        loginWithCredentials,
        logout,
        createOrder,
        updateOrderStatus,
        verifyPickupCode,
        cancelOrder,
        reviewApproval,
        requestNewAccess,
        sendChatMessage,
        activeNavTab,
        setActiveNavTab,
        isMapModalOpen,
        setIsMapModalOpen,
        isChatModalOpen,
        setIsChatModalOpen,
        isCallModalOpen,
        setIsCallModalOpen,
        isSupportModalOpen,
        setIsSupportModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        resetToDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
