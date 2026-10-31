import usersData from '@/data/users.json';
import donationsData from '@/data/donations.json';
import requestsData from '@/data/requests.json';
import volunteersData from '@/data/volunteers.json';
import deliveriesData from '@/data/deliveries.json';
import notificationsData from '@/data/notifications.json';
import impactData from '@/data/impact.json';

import {
  User,
  Donation,
  Request,
  Volunteer,
  Delivery,
  Notification,
  ImpactStatistics,
} from '@/types';

// Raw Initial Data accessors
export function getInitialUsers(): User[] {
  return (usersData as { users: User[] }).users;
}

export function getInitialDonations(): Donation[] {
  return (donationsData as { donations: Donation[] }).donations;
}

export function getInitialRequests(): Request[] {
  return (requestsData as { requests: Request[] }).requests;
}

export function getInitialVolunteers(): Volunteer[] {
  return (volunteersData as { volunteers: Volunteer[] }).volunteers;
}

export function getInitialDeliveries(): Delivery[] {
  return (deliveriesData as { deliveries: Delivery[] }).deliveries;
}

export function getInitialNotifications(): Notification[] {
  return (notificationsData as { notifications: Notification[] }).notifications;
}

export function getInitialImpactStatistics(): ImpactStatistics {
  return impactData as ImpactStatistics;
}

// Relational helper functions
export function getDonorForDonation(donation: Donation, users: User[]): User | undefined {
  return users.find((u) => u.id === donation.donorId);
}

export function getRecipientForRequest(request: Request, users: User[]): User | undefined {
  return users.find((u) => u.id === request.recipientId);
}

export function getDonationForRequest(request: Request, donations: Donation[]): Donation | undefined {
  return donations.find((d) => d.id === request.donationId);
}

export function getDeliveryDetails(
  delivery: Delivery,
  donations: Donation[],
  requests: Request[],
  volunteers: Volunteer[],
  users: User[]
) {
  const donation = donations.find((d) => d.id === delivery.donationId);
  const request = requests.find((r) => r.id === delivery.requestId);
  const volunteer = volunteers.find((v) => v.id === delivery.volunteerId);
  const donor = donation ? users.find((u) => u.id === donation.donorId) : undefined;
  const recipient = request ? users.find((u) => u.id === request.recipientId) : undefined;

  return {
    delivery,
    donation,
    request,
    volunteer,
    donor,
    recipient,
  };
}
