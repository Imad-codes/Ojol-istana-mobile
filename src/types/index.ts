export type UserRole = 'pengguna' | 'driver' | 'admin';

export interface Vehicle {
  model: string;
  color: string;
  plate: string;
  helmetCount: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  initials: string;
  department: string;
  idKedinasan: string;
  phone: string;
  isVerified: boolean;
  statusLabel: string;
  email?: string;
  rating?: number;
  vehicle?: Vehicle;
  shift?: string;
  isOnline?: boolean;
}

export type OrderStatus =
  | 'menunggu_driver'
  | 'menuju_jemput'
  | 'tiba_di_lokasi'
  | 'dalam_perjalanan'
  | 'selesai'
  | 'dibatalkan';

export interface Order {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: OrderStatus;
  pickupCode: string;
  passengerId: string;
  passengerName: string;
  passengerDept: string;
  passengerPhone: string;
  driverId: string | null;
  driverName: string | null;
  driverPhone: string | null;
  driverRating: number | null;
  vehicleInfo: string | null;
  scheduledType: 'sekarang' | 'jadwalkan';
  scheduledTime: string;
  distanceKm: number;
  durationMinutes: number;
  createdAt: string;
  pickupNote?: string;
}

export interface CompletedTrip {
  id: string;
  time: string;
  route: string;
  passenger: string;
  driver: string;
  status: string;
  date: string;
}

export interface ApprovalRequest {
  id: string;
  name: string;
  role: 'pengguna' | 'driver';
  department: string;
  status: 'menunggu' | 'disetujui' | 'ditolak';
  notes: string;
  date: string;
}

export interface OperationalStats {
  totalTripsToday: number;
  completedTripsToday: number;
  activeTripsToday: number;
  availableDrivers: number;
  totalOnlineDrivers: number;
  totalRegisteredDrivers: number;
  authorizedUsers: number;
  pendingAccessRequests: number;
  avgPickupMinutes: number;
}

export interface TrendItem {
  day: string;
  count: number;
  isCurrent?: boolean;
}

export interface ServiceStatus {
  bookingSystem: string;
  accessVerification: string;
  operatingHours: string;
  lastSync: string;
}

export interface DatabaseState {
  users: User[];
  orders: Order[];
  completedTrips: CompletedTrip[];
  approvals: ApprovalRequest[];
  stats: OperationalStats;
  trends: TrendItem[];
  serviceStatus: ServiceStatus;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}
