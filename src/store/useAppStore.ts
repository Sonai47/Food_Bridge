import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  User,
  UserRole,
  Donation,
  Request,
  Volunteer,
  Delivery,
  Notification,
  ImpactStatistics,
  UrgentNeedAlert,
  DeliveryStatus,
  RequestStatus,
  UrgencyLevel,
} from '@/types';
import {
  getInitialUsers,
  getInitialDonations,
  getInitialRequests,
  getInitialVolunteers,
  getInitialDeliveries,
  getInitialNotifications,
  getInitialImpactStatistics,
} from '@/services/dataService';

interface AppState {
  users: User[];
  donations: Donation[];
  requests: Request[];
  volunteers: Volunteer[];
  deliveries: Delivery[];
  notifications: Notification[];
  impact: ImpactStatistics;
  urgentNeeds: UrgentNeedAlert[];
  currentUser: User | null;
  activeRole: UserRole | null;
  isHydrated: boolean;

  // Actions
  setHydrated: (hydrated: boolean) => void;
  loginAsRole: (role: UserRole) => void;
  loginWithEmail: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  registerUser: (userData: Omit<User, 'id' | 'verified' | 'avatar'>) => User;

  // Donation actions
  addDonation: (
    data: Omit<Donation, 'id' | 'donorId' | 'status' | 'createdAt'>
  ) => Donation;
  updateDonationStatus: (donationId: string, status: Donation['status']) => void;

  // Request actions
  createRequest: (data: {
    donationId: string;
    requestedQuantity: number;
    servingsNeeded: number;
    urgency: UrgencyLevel;
    note?: string;
  }) => Request;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;

  // Volunteer & Delivery actions
  acceptPickupTask: (deliveryId: string) => void;
  updateDeliveryStage: (deliveryId: string, status: DeliveryStatus) => void;

  // Urgent Need actions
  createUrgentNeed: (
    data: Omit<UrgentNeedAlert, 'id' | 'recipientId' | 'recipientName' | 'createdAt' | 'status'>
  ) => UrgentNeedAlert;

  // Notification actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Profile & Settings
  updateProfile: (updatedData: Partial<User>) => void;
  resetDemoData: () => void;
}

const initialUrgentNeeds: UrgentNeedAlert[] = [
  {
    id: 'URG001',
    recipientId: 'USR002',
    recipientName: 'Hope Foundation Shelter',
    foodType: 'Cooked Meals / Rice & Dal',
    quantity: 50,
    unit: 'meals',
    servingsNeeded: 50,
    location: 'Bidhannagar, Kolkata',
    urgency: 'urgent',
    additionalDetails: 'Evening dinner for 50 shelter residents after power outage.',
    createdAt: '2026-10-31T15:00:00+05:30',
    status: 'active',
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: getInitialUsers(),
      donations: getInitialDonations(),
      requests: getInitialRequests(),
      volunteers: getInitialVolunteers(),
      deliveries: getInitialDeliveries(),
      notifications: getInitialNotifications(),
      impact: getInitialImpactStatistics(),
      urgentNeeds: initialUrgentNeeds,
      currentUser: getInitialUsers()[0], // Default demo donor
      activeRole: 'donor',
      isHydrated: false,

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      loginAsRole: (role: UserRole) => {
        const users = get().users;
        let matchedUser = users.find((u) => u.role === role);
        if (!matchedUser) {
          matchedUser = {
            id: `USR_DEMO_${role.toUpperCase()}`,
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            email: `${role}@foodbridge.demo`,
            role: role,
            phone: '+91 98000 00000',
            address: 'Central Kolkata',
            verified: true,
            avatar: `/images/avatars/${role}-1.jpg`,
          };
          set({ users: [...users, matchedUser] });
        }
        set({ currentUser: matchedUser, activeRole: role });
      },

      loginWithEmail: (email: string, role?: UserRole) => {
        const users = get().users;
        const normalized = email.trim().toLowerCase();
        const matched = users.find((u) => u.email.toLowerCase() === normalized);
        if (matched) {
          set({ currentUser: matched, activeRole: matched.role });
          return true;
        }
        // Allow instant demo access with mock user
        const targetRole = role || 'donor';
        const newUser: User = {
          id: `USR${Date.now()}`,
          name: email.split('@')[0],
          email: normalized,
          role: targetRole,
          phone: '+91 90000 00000',
          address: 'Kolkata, WB',
          verified: true,
          avatar: '/images/avatars/donor-1.jpg',
        };
        set({
          users: [...users, newUser],
          currentUser: newUser,
          activeRole: targetRole,
        });
        return true;
      },

      logout: () => {
        set({ currentUser: null, activeRole: null });
      },

      registerUser: (userData) => {
        const id = `USR${Date.now().toString().slice(-4)}`;
        const newUser: User = {
          ...userData,
          id,
          verified: true,
          avatar: `/images/avatars/${userData.role}-1.jpg`,
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          activeRole: newUser.role,
        }));
        return newUser;
      },

      addDonation: (data) => {
        const current = get();
        const id = `DON${(current.donations.length + 1).toString().padStart(3, '0')}`;
        const newDonation: Donation = {
          ...data,
          id,
          donorId: current.currentUser?.id || 'USR001',
          status: 'available',
          createdAt: new Date().toISOString(),
        };

        const updatedDonations = [newDonation, ...current.donations];
        const updatedActivity = [
          {
            id: `ACT${Date.now()}`,
            label: `${newDonation.servings} servings donated by ${current.currentUser?.name || 'A generous donor'}`,
            time: 'Just now',
            type: 'donation' as const,
          },
          ...current.impact.recentActivity,
        ];

        set({
          donations: updatedDonations,
          impact: {
            ...current.impact,
            summary: {
              ...current.impact.summary,
              mealsSaved: current.impact.summary.mealsSaved + newDonation.servings,
              foodRescuedKg: current.impact.summary.foodRescuedKg + newDonation.quantity,
            },
            recentActivity: updatedActivity,
          },
        });

        return newDonation;
      },

      updateDonationStatus: (donationId, status) => {
        set((state) => ({
          donations: state.donations.map((d) =>
            d.id === donationId ? { ...d, status } : d
          ),
        }));
      },

      createRequest: ({ donationId, requestedQuantity, servingsNeeded, urgency, note }) => {
        const current = get();
        const reqId = `REQ${(current.requests.length + 1).toString().padStart(3, '0')}`;
        const targetDonation = current.donations.find((d) => d.id === donationId);

        const newRequest: Request = {
          id: reqId,
          donationId,
          recipientId: current.currentUser?.id || 'USR002',
          requestedQuantity,
          servingsNeeded,
          urgency,
          status: 'pending',
          requestedAt: new Date().toISOString(),
          note,
        };

        // Notify donor
        const newNotification: Notification = {
          id: `NOT${Date.now().toString().slice(-4)}`,
          userId: targetDonation ? targetDonation.donorId : 'USR001',
          type: 'request_received',
          title: 'New Donation Request',
          message: `${current.currentUser?.name || 'A recipient'} requested ${targetDonation?.foodName || 'your donation'}.`,
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          requests: [newRequest, ...current.requests],
          notifications: [newNotification, ...current.notifications],
        });

        return newRequest;
      },

      updateRequestStatus: (requestId, status) => {
        const current = get();
        const req = current.requests.find((r) => r.id === requestId);
        if (!req) return;

        const updatedRequests = current.requests.map((r) =>
          r.id === requestId ? { ...r, status } : r
        );

        let updatedDonations = current.donations;
        let updatedDeliveries = current.deliveries;

        if (status === 'approved') {
          // Mark donation matched
          updatedDonations = current.donations.map((d) =>
            d.id === req.donationId ? { ...d, status: 'matched' as const } : d
          );

          const targetDonation = current.donations.find((d) => d.id === req.donationId);
          const targetRecipient = current.users.find((u) => u.id === req.recipientId);

          // Check if delivery already exists
          const existingDel = current.deliveries.find((del) => del.requestId === requestId);
          if (!existingDel) {
            const newDelivery: Delivery = {
              id: `DEL${(current.deliveries.length + 1).toString().padStart(3, '0')}`,
              donationId: req.donationId,
              requestId: req.id,
              volunteerId: '',
              donorAddress: targetDonation?.address || 'Salt Lake, Kolkata',
              recipientAddress: targetRecipient?.address || 'Kolkata',
              distanceKm: 3.8,
              pickupDeadline: targetDonation?.pickupDeadline || new Date().toISOString(),
              status: 'assigned',
              timeline: [
                {
                  status: 'assigned',
                  label: 'Pickup Assigned',
                  time: new Date().toISOString(),
                },
                { status: 'picked_up', label: 'Food Collected', time: null },
                { status: 'in_transit', label: 'In Transit', time: null },
                { status: 'delivered', label: 'Delivered', time: null },
                { status: 'confirmed', label: 'Recipient Confirmed', time: null },
              ],
            };
            updatedDeliveries = [newDelivery, ...current.deliveries];
          }
        }

        // Notify recipient
        const newNotif: Notification = {
          id: `NOT${Date.now().toString().slice(-4)}`,
          userId: req.recipientId,
          type: 'status_change',
          title: `Request ${status === 'approved' ? 'Approved!' : 'Declined'}`,
          message: `Your request ${req.id} has been ${status} by the donor.`,
          read: false,
          createdAt: new Date().toISOString(),
        };

        set({
          requests: updatedRequests,
          donations: updatedDonations,
          deliveries: updatedDeliveries,
          notifications: [newNotif, ...current.notifications],
        });
      },

      acceptPickupTask: (deliveryId) => {
        const current = get();
        const volunteerId = current.currentUser?.id === 'USR003' ? 'VOL001' : 'VOL001';

        const updatedDeliveries = current.deliveries.map((del) => {
          if (del.id === deliveryId) {
            return {
              ...del,
              volunteerId: volunteerId,
              status: 'assigned' as DeliveryStatus,
            };
          }
          return del;
        });

        set({ deliveries: updatedDeliveries });
      },

      updateDeliveryStage: (deliveryId, status) => {
        const current = get();
        const nowIso = new Date().toISOString();

        const updatedDeliveries = current.deliveries.map((del) => {
          if (del.id === deliveryId) {
            const updatedTimeline = del.timeline.map((item) => {
              if (item.status === status) {
                return { ...item, time: nowIso };
              }
              return item;
            });

            return {
              ...del,
              status,
              timeline: updatedTimeline,
            };
          }
          return del;
        });

        // If delivered or confirmed, update donation status and impact
        let updatedDonations = current.donations;
        const targetDel = current.deliveries.find((d) => d.id === deliveryId);

        if ((status === 'delivered' || status === 'confirmed') && targetDel) {
          updatedDonations = current.donations.map((d) =>
            d.id === targetDel.donationId ? { ...d, status: 'delivered' as const } : d
          );
        }

        set({
          deliveries: updatedDeliveries,
          donations: updatedDonations,
        });
      },

      createUrgentNeed: (data) => {
        const current = get();
        const newId = `URG${(current.urgentNeeds.length + 1).toString().padStart(3, '0')}`;
        const newAlert: UrgentNeedAlert = {
          ...data,
          id: newId,
          recipientId: current.currentUser?.id || 'USR002',
          recipientName: current.currentUser?.name || 'Community Shelter',
          createdAt: new Date().toISOString(),
          status: 'active',
        };

        set({ urgentNeeds: [newAlert, ...current.urgentNeeds] });
        return newAlert;
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsAsRead: () => {
        const current = get();
        const currentUserId = current.currentUser?.id;
        set({
          notifications: current.notifications.map((n) =>
            !currentUserId || n.userId === currentUserId ? { ...n, read: true } : n
          ),
        });
      },

      updateProfile: (updatedData) => {
        const current = get();
        if (!current.currentUser) return;
        const updatedUser = { ...current.currentUser, ...updatedData };
        set({
          currentUser: updatedUser,
          users: current.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        });
      },

      resetDemoData: () => {
        set({
          users: getInitialUsers(),
          donations: getInitialDonations(),
          requests: getInitialRequests(),
          volunteers: getInitialVolunteers(),
          deliveries: getInitialDeliveries(),
          notifications: getInitialNotifications(),
          impact: getInitialImpactStatistics(),
          urgentNeeds: initialUrgentNeeds,
          currentUser: getInitialUsers()[0],
          activeRole: 'donor',
        });
      },
    }),
    {
      name: 'foodbridge_storage_v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
