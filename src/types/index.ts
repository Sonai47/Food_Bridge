export type UserRole = 'donor' | 'recipient' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  phone: string;
  address: string;
  verified: boolean;
  avatar: string;
}

export interface FoodSafety {
  packaged: boolean;
  allergens: string;
  storage: string;
}

export type DonationStatus = 'available' | 'matched' | 'picked_up' | 'delivered' | 'cancelled';

export interface Donation {
  id: string;
  donorId: string;
  foodName: string;
  category: string;
  description: string;
  quantity: number;
  unit: string;
  servings: number;
  preparedAt: string;
  pickupDeadline: string;
  address: string;
  status: DonationStatus;
  image: string;
  foodSafety: FoodSafety;
  createdAt: string;
}

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'picked_up' | 'delivered';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface Request {
  id: string;
  donationId: string;
  recipientId: string;
  requestedQuantity: number;
  servingsNeeded: number;
  urgency: UrgencyLevel;
  status: RequestStatus;
  requestedAt: string;
  note?: string;
}

export interface Volunteer {
  id: string;
  userId?: string;
  name: string;
  phone: string;
  area: string;
  availability: 'available' | 'on_delivery' | 'offline';
  completedDeliveries: number;
  rating: number;
  transport: string;
}

export type DeliveryStatus = 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'confirmed';

export interface DeliveryTimelineItem {
  status: DeliveryStatus;
  label: string;
  time: string | null;
}

export interface Delivery {
  id: string;
  donationId: string;
  requestId: string;
  volunteerId: string;
  donorAddress: string;
  recipientAddress: string;
  distanceKm: number;
  pickupDeadline: string;
  status: DeliveryStatus;
  timeline: DeliveryTimelineItem[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'request_received' | 'pickup_assigned' | 'delivery_update' | 'status_change' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ImpactSummary {
  mealsSaved: number;
  foodRescuedKg: number;
  activeDonors: number;
  ngoPartners: number;
  activeVolunteers: number;
  completedDeliveries: number;
}

export interface MonthlyMeals {
  month: string;
  meals: number;
}

export interface ActivityItem {
  id: string;
  label: string;
  time: string;
  type: 'donation' | 'delivery' | 'volunteer' | 'request';
}

export interface ImpactStatistics {
  summary: ImpactSummary;
  monthlyMealsSaved: MonthlyMeals[];
  recentActivity: ActivityItem[];
}

export interface UrgentNeedAlert {
  id: string;
  recipientId: string;
  recipientName: string;
  foodType: string;
  quantity: number;
  unit: string;
  servingsNeeded: number;
  location: string;
  urgency: UrgencyLevel;
  additionalDetails?: string;
  createdAt: string;
  status: 'active' | 'fulfilled' | 'cancelled';
}
